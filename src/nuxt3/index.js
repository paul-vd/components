/* eslint-disable no-undef */
import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit';

export default defineNuxtModule( {
    "meta": {
        // usually  npm package name of your module
        "name": `@twicpics/components`,
        // the key in `nuxt.config` that holds your module options
        "configKey": `twicpics`,
        // compatibility constraints
        "compatibility": {
            // semver version of supported nuxt versions
            "nuxt": `^3.0.0`,
        },
    },
    setup( options, nuxt ) {

        const twicPicsOptions = {
            ...( options || {} ),
            ...( nuxt.options.twicpics || {} ),
        };

        console.log( `twicpicsOptions`, options, twicPicsOptions );

        if ( !twicPicsOptions.domain ) {
            // eslint-disable-next-line no-console
            console.warn( `twicpics nuxt3 module : domain has not been configured. Please check nuxt.config.js file` );
        }

        nuxt.options.css.push( `@twicpics/components/style.css` );
        // create resolver to resolve relative paths
        const { resolve } = createResolver( import.meta.url );
        addPlugin( {
            "src": resolve( `./plugin` ),
            twicPicsOptions,
        } );
    },
} );
