/* eslint-disable no-undef */
import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit';

export default defineNuxtModule( {
    setup( options, nuxt ) {

        const twicPicsOptions = {
            ...( options || {} ),
            ...( nuxt.options.twicpics || {} ),
        };

        console.log( "twicpicsOptions", twicPicsOptions );

        if ( !twicPicsOptions.domain ) {
            // eslint-disable-next-line no-console
            console.warn( `twicpics nuxt3 module : domain has not been configured. Please check nuxt.config.js file` );
        }

        nuxt.options.css.push( `@twicpics/components/style.css` );
        // create resolver to resolve relative paths
        const { resolve } = createResolver( import.meta.url );
        addPlugin( resolve( `./plugin` ) );
    },
} );
