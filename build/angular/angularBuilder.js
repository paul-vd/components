/* eslint-disable no-console */
import { copy, remove } from "fs-extra";
import __dirname from "../__dirname.js";
import replaceInFile from "replace-in-file";
import { execSync } from "child_process";
import { getAngularDirectories, getJsonFromFile } from "./angularUtils.js";

/**
 * get list of angular library to build for the given angularDirectory
 * It is possible to have n libraries in an angular project defined by it's angularDirectory
 * @param angularDirectory
 * @returns {Promise<null|*[]>}
 */
const getProjectsByDirectory = async angularDirectory => {

    const projectsByDirectory = [];
    const angularJson = await getJsonFromFile( angularDirectory.angularJsonPath );

    if ( !angularJson ) {
        return null;
    }
    // for each project defined in angular.json
    Object.keys( angularJson.projects ).forEach( projectName => {
        projectsByDirectory.push( {
            projectName,
            "project": angularJson.projects[ projectName ],
        } );
    } );

    // return only library project
    return projectsByDirectory.filter( angularProject => angularProject.project.projectType === `library` );
};

/**
 * build the angular library named projectName
 * 0 - remove old source from previous build
 * 1 - copy source from master to library project to build
 * 2 - change imports in library project to build
 * 3 - copy common directory (_) to library project to build
 * 4 - launch official ng build
 * 5 - replace FRAMEWORK by ANGULAR in build library
 * 6 - clean working directory
 * @param angularDirectory : directory of related project to build
 * @param projectName : name of library
 * @param project : data from angular.json
 * @returns {Promise<void>}
 */
const buildAngularProject = async ( angularDirectory, angularConfig ) => {
    const { sourceRoot } = angularConfig.project;
    const libraryName = ` ${ angularConfig.projectName }/${ angularDirectory.name }`;

    const masterDestinationPath = `${ angularDirectory.path }/${ sourceRoot }/`;
    // 0 - remove old source from previous build
    await remove( masterDestinationPath );

    // 1 - copy source from master to library project to build
    const masterSourcePath = `${ __dirname }/../src/angular/`;
    await copy( masterSourcePath, masterDestinationPath );

    // 2 - change imports in library project to build
    let replaceOptions = {
        "files": `${ masterDestinationPath }/**/*.*`,
        "from": /\.\.\/_\//g,
        "to": `./_/`,
    };
    try {
        await replaceInFile( replaceOptions );
    } catch ( error ) {
        console.error( `Angular replacemeny error occurred:`, error );
    }

    // 3 - copy common directory (_) to library project to build
    const commonSourcePath = `${ __dirname }/../src/_`;
    const commonDestinationPath = `${ masterDestinationPath }_`;
    await copy( commonSourcePath, commonDestinationPath );

    // 4 - launch official ng build
    console.log( `Building ${ libraryName }` );
    execSync( `cd ${ angularDirectory.path } && npx ng build ${ angularConfig.projectName }` );
    console.log( `${ libraryName } built` );

    // 5 - replace FRAMEWORK by ANGULAR in built library
    const distFolder = `${ __dirname }/../dist/${ angularDirectory.name }`;
    replaceOptions = {
        "files": `${ distFolder }/**/*.*`,
        "from": /\bFRAMEWORK([^:])/g,
        "to": `"ANGULAR"`,
    };

    try {
        await replaceInFile( replaceOptions );
    } catch ( error ) {
        console.error( `Angular replacemeny error occurred:`, error );
    }

    // 6 - clean working directory
    // remove tmp source
    await remove( masterDestinationPath );

};

/**
 * angular build processing
 * For each angular library to build, call buildAngularProject
 * @returns {Promise<void>}
 */
export const buildComponents = async () => {

    // retreive angular directories containing a library to build
    const angularDirectories = await getAngularDirectories();
    // loop on angular directories
    for await ( const angularDirectory of angularDirectories ) {
        // retreive angular projects to build within given angularDirectory
        const angularProjects = await getProjectsByDirectory( angularDirectory );
        if ( angularProjects ) {
            // loop on angular projects to build
            for await ( const project of angularProjects ) {
                await buildAngularProject( angularDirectory, project );
            }
        } else {
            console.warn( `No angular configuration for ${ angularDirectory.name }` );
        }
    }
};

/**
 * generate and return exports attributes to be add to generated package.json
 */
export const exportsPackageJson = async () => {

    const exports = new Map();

    // retreive angular directories containing a library to build
    const angularDirectories = await getAngularDirectories();

    // loop on angular directories
    for await ( const angularDirectory of angularDirectories ) {
        const angularName = angularDirectory.name;
        // read package.json generated by ng build
        const packageJsonPath = `${ __dirname }/../dist/${ angularName }/package.json`;
        const packageJson = await getJsonFromFile( packageJsonPath );
        await remove( packageJsonPath );
        // extract exports data from generated package.json
        // looking for attributs module, main, typings, esXXXX, esmXXXX, fesmXXXX
        const regExp = /^(module)|(main)|(typings)|((f?esm?)[0-9]+)$/;
        const extractedExportsData = {};
        Object.keys( packageJson )
            .filter( key => key.match( regExp ) )
            .map( key => [ `${ key }`, `./${ angularName }/${ packageJson[ key ] }` ] )
            .forEach( row => {
                const [ key, value ] = row;
                extractedExportsData[ key ] = value;
            } );

        exports.set( `./${ angularName }`, extractedExportsData );
    }
    return exports;
};
