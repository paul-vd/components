import React from "react";
import ReactDOM from "react-dom";
import Sample from "@twicpics/components-sample/Sample.jsx";

import { installTwicPics } from "@twicpics/components/react";
import "@twicpics/components/style.css";
import "@twicpics/components-sample/Sample.css";

installTwicPics( {
    "domain": `https://demo.twic.pics`,
    "anticipation": 0.5,
    "step": 100,
} );

ReactDOM.render(
    <React.StrictMode>
        <Sample />
    </React.StrictMode>,
    document.body
);
