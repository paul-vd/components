// /(\b)__COVER_NAME__(\b)/gm => "react-cover"
// /(\b)__FRAMEWORK_NAME__(\b)/gm => "React"
// /(\b)__FRAMEWORK_URL__(\b)/gm => "https://reactjs.org/"
// /(\b)__INTERCOM_TERM__(\b)/gm => "react"
#include "src/_documentation/common/_title.md"
    
## Overview

#include "src/_documentation/common/_whatIsTwicPics.md"

#include "src/_documentation/common/_whatIsTwicPicsComponents.md"

<a href="https://codesandbox.io/s/twicpics-x-react-basic-example-lkdrn?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x React - Basic Example" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

[Discover our demonstrations and integration examples on Codesandbox.](https://twicpics-react-demo.netlify.app/?utm_source=sendinblue&utm_campaign=github&utm_medium=github)

#include "src/_documentation/common/_installation.md"

<div id='setup'/>

## Setup

<div id='setting-up-your-project'/>

### Setting-up TwicPics Components into your `React` project

While we recommend going the `ES module` route and use `import` statements, [TwicPics Components](https://www.npmjs.com/package/@twicpics/components) is also backward compatible with `CommonJS` and `require` statements.

Add the import part

```jsx
// import TwicPics react components
import { installTwicPics } from "@twicpics/components/react";
// import TwicPics components css
import "@twicpics/components/style.css";
```

and the configuration part (see [Setup Options](#setup-options))

```jsx
installTwicPics( {
  // domain is mandatory
  "domain": "https://<your-domain>.twic.pics"
} );
```

into the app startup of your `React` project.

#### index.jsx

```jsx
// Here is an example of a `React` app startup configured with TwicPics.
import React from "react";
import ReactDOM from "react-dom";
import Root from "./root.jsx";

// TwicPics Components importation
import { installTwicPics } from "@twicpics/components/react";
import "@twicpics/components/style.css";

// TwicPics Components configuration (see Setup Options)
installTwicPics( {
  // domain is mandatory
  "domain": "https://<your-domain>.twic.pics"
} );

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById( "root" )
);
```

#include "src/_documentation/common/_setupOptions.md"

<div id='usage'/>

## Usage

Import TwicPics Components `TwicImg` and `TwicVideo` in your template files and use them in place of `img` or `video` tags.

Add the import part
```jsx
// this component will be used in place of an img element.
import { TwicImg } from "@twicpics/components/react";

// this component will be used in place of an video element.
import { TwicVideo } from "@twicpics/components/react";
```

then, use `<TwicImg>` or `<TwicVideo>` in place of standard tags `<img>` or `<video>` (see [Components Properties](#components)).

<div id='basic-usage'/>

### Basic usage

`<your-page-or-component>.jsx`

__NB__ : TwicPics Components can also be used in `js`, `jsx`, `ts`, `tsx` files.

```jsx
import React from "react";

import { TwicImg } from "@twicpics/components/react";

const YourTemplate = () => (
  <TwicImg src="path/to/your/image"/>
);

export default YourTemplate;
```

<div id='style-driven-approach'/>

### Style-Driven Approach

You can set up components using pure CSS and the power of [CSS variables](#css-variables)

`styles.css`

```CSS
.landscape {
  --twic-ratio: calc(4/3);
}

.portrait {
  --twic-ratio: calc(3/4);
}

.square {
  --twic-ratio: calc(1);
}

.contain {
  --twic-mode: contain;
}

.cover {
  --twic-mode: cover;
}

.left {
  --twic-position: left;
}

.right {
  --twic-position: right;
}

.lg {
  width:300px;
}

.md {
  width:150px;
}

.sm {
  width: 100px;
}
```

`<your-page-or-component>.jsx`

```html
<div className="landscape">
  <TwicImg src=path/to/your/image></TwicImg>
</div>
<div className="square">
  <TwicImg src=path/to/your/image></TwicImg>
</div>
<div className="portrait">
  <TwicImg src=path/to/your/image></TwicImg>
</div>
<div className="contain left">
  <TwicImg src=path/to/your/image ratio="16/9"></TwicImg>
</div>
<div className="contain right">
  <TwicImg src=path/to/your/image ratio="16/9"></TwicImg>
</div>
<!---
    Attributes take precedence over CSS.
    In the next example, ratio will 16/9 AND NOT 1 as defined in square css class 
--->
<div className="cover square">
  <TwicImg src=path/to/your/image ratio="16/9"></TwicImg>
</div>
```

<a href="https://codesandbox.io/s/twicpics-x-react-style-driven-0cmgv0?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x React - Style driven" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>


<div id='responsive-example'/>

### Responsive Example

Setting up components using CSS and [CSS variables](#css-variables) enables hassle-free responsive designs.

`styles.css`

```css
.style-driven {
  --twic-ratio: 1.9;
}

@media ( min-width: 640px ) {
  .style-driven {
    --twic-mode: contain;
  }
}

@media ( min-width: 768px ) {
  .style-driven {
    --twic-mode: cover;
    --twic-ratio: calc( 4/3 );
  }
}

@media (min-width: 1024px) {
  .style-driven {
    --twic-ratio: calc( 16/9 );
  }
}

@media ( min-width: 1280px ) {
  .style-driven {
    --twic-ratio: calc( 21/9 );
  }
}

@media ( min-width: 1536px ) {
  .style-driven {
    --twic-ratio: calc( 36/9 );
  }
}
```

`<your-page-or-component>.jsx`

Your template features a single component that will follow your CSS directives and behave responsively.
 
```html
<TwicImg
  className="style-driven"
  src="path/to/your/image"
></TwicImg>
```

<a href="https://codesandbox.io/s/twicpics-x-react-art-direction-nce8p3?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x React - Art Direction" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>


#include "src/_documentation/common/_componentsProps.md"

#include "src/_documentation/common/_cssVariables.md"

<div id='example'/>

## Examples

You can find usage examples [in our online demo project](https://twicpics-react-demo.netlify.app/?utm_source=sendinblue&utm_campaign=github&utm_medium=github).

#include "src/_documentation/common/_gettingHelp.md"

#include "src/_documentation/common/_otherFrameworks.md"

#include "src/_documentation/common/_licence.md"