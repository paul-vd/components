import { installTwicPics, TwicImg } from "@twicpics/components/webcomponents";

installTwicPics( {
    "domain": `https://demo.twic.pics`,
    "anticipation": 0.5,
    "step": 100,
} );

customElements.define( `twic-img`, TwicImg );
