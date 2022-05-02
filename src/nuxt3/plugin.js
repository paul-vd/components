import TwicPics from "@twicpics/components/vue3";

export default nuxtApp => {
    console.log( "Inside plugin.", nuxtApp );
    nuxtApp.use( TwicPics, {
        "domain": `https://demo.twic.pics`,
        "anticipation": 0.5,
        "step": 50,
    } );
};
