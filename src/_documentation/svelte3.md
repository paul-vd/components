// /(\b)__COVER_NAME__(\b)/gm => "svelte-cover"
// /(\b)__FRAMEWORK_NAME__(\b)/gm => "Svelte3"
// /(\b)__FRAMEWORK_URL__(\b)/gm => "https://svelte.dev/"
// /(\b)__INTERCOM_TERM__(\b)/gm => "svelte"
#include "src/_documentation/common/_title.md"
    
## Overview

#include "src/_documentation/common/_whatIsTwicPics.md"

#include "src/_documentation/common/_whatIsTwicPicsComponents.md"

<a href="https://codesandbox.io/s/twicpics-x-svelte-basic-1yh3i?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Svelte - Basic" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

#include "src/_documentation/common/_installation.md"

<div id='setup'/>

## Setup

<div id='setting-up-your-project'/>

### Setting-up TwicPics Components into your `Svelte3` project

While we recommend going the `ES module` route and use `import` statements, [TwicPics Components](https://www.npmjs.com/package/@twicpics/components) is also backward compatible with `CommonJS` and `require` statements.

Add the import part

```js
// import TwicPics react components
import { installTwicPics } from "@twicpics/components/svelte3";
// import TwicPics components css
import "@twicpics/components/style.css";
```

and the configuration part (see [Setup Options](#setup-options))

```js
installTwicPics( {
  // domain is mandatory
  "domain": "https://<your-domain>.twic.pics"
} );
```

into the app startup of your `Svelte3` project.

#### index.js

```js
// Here is an example of a `Svelte3` app startup configured with TwicPics.
import { installTwicPics } from "@twicpics/components/svelte3";
import "@twicpics/components/style.css";

import App from "./App.svelte";

installTwicPics({
  "domain": `https://<your-domain>.twic.pics`
});

const app = new App({
  target: document.body
});

export default app;
```

#include "src/_documentation/common/_setupOptions.md"

<div id='usage'/>

## Usage

Import TwicPics Components `TwicImg` and `TwicVideo` in your template files and use them in place of `img` or `video` tags.

Add the import part in the `script` section of your `.svelte` page
```html
<script>
  // this component will be used in place of an img element.
  import { TwicImg } from "@twicpics/components/svelte3";

  // this component will be used in place of an video element.
  import { TwicVideo } from "@twicpics/components/svelte3";
</script>
```

then, use `<TwicImg>` or `<TwicVideo>` in place of standard tags `<img>` or `<video>` (see [Components Properties](#components)).

<div id='basic-usage'/>

### Basic usage

`<your-page-or-component>.svelte`

```html
<script>
  import { TwicImg } from "@twicpics/components/svelte3";
</script>

<main>
  <TwicImg src="path/to/your/image"></TwicImg>
</main>
```

<div id='style-driven-approach'/>

### Style-Driven Approach

You can set up components using pure CSS and the power of [CSS variables](#css-variables)

`<your-page-or-component>.svelte`

```html
<script>
  import { TwicImg } from "@twicpics/components/svelte3";
</script>

<style>
  .landscape {
    --twic-ratio: calc(4 / 3);
  }

  .portrait {
    --twic-ratio: calc(3 / 4);
  }

  .square {
    --twic-ratio: calc(1);
  }

  .lg {
    width: 300px;
  }

  .md {
    width: 150px;
  }

  .sm {
    width: 100px;
  }
</style>

<main>
  <div class="landscape">
    <TwicImg src="path/to/your/image"></TwicImg>
  </div>
  <div class="square">
    <TwicImg src="path/to/your/image"></TwicImg>
  </div>
  <div class="portrait">
    <TwicImg src="path/to/your/image"></TwicImg>
  </div>
  <div class="lg">
    <TwicImg src="path/to/your/image"></TwicImg>
  </div>
  <div class="md">
    <TwicImg src="path/to/your/image"></TwicImg>
  </div>
  <div class="sm">
    <TwicImg src="path/to/your/image"></TwicImg>
  </div>
</main>
```

<a href="https://codesandbox.io/s/twicpics-x-svelte-style-driven-obgv44?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Svelte - Style Driven" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>


<div id='responsive-example'/>

### Responsive Example

Setting up components using CSS and [CSS variables](#css-variables) enables hassle-free responsive designs.

`<your-page-or-component>.svelte`

```html
<script>
  import { TwicImg } from "@twicpics/components/svelte3";
</script>

<style>
  .style-driven-responsive {
    --twic-ratio: calc(2 / 3);
    --twic-mode: cover;
    margin: auto;
  }

  @media (min-width: 640px) {
    .style-driven-responsive {
      --twic-ratio: calc(1);
    }
  }

  @media (min-width: 768px) {
    .style-driven-responsive {
      --twic-ratio: calc(4 / 3);
    }
  }

  @media (min-width: 1024px) {
    .style-driven-responsive {
      --twic-ratio: calc(16 / 9);
    }
  }

  @media (min-width: 1280px) {
    .style-driven-responsive {
      --twic-ratio: calc(1.85);
    }
  }

  @media (min-width: 1536px) {
    .style-driven-responsive {
      --twic-ratio: calc(21 / 9);
    }
  }
</style>

<main>
  <div class="style-driven-responsive">
    <TwicImg src="path/to/your/image"></TwicImg>
  </div>
</main>
```

Your template features a single component that will follow your CSS directives and behave responsively.
 
<a href="https://codesandbox.io/s/twicpics-x-svelte-art-direction-lf2801?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit TwicPics x Svelte - Art direction" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>


#include "src/_documentation/common/_componentsProps.md"

#include "src/_documentation/common/_cssVariables.md"

<div id='example'/>

## Examples

You can find usage examples [in our sample project](https://github.com/twicpics/components/tree/main/samples/svelte3).

#include "src/_documentation/common/_gettingHelp.md"

#include "src/_documentation/common/_otherFrameworks.md"

#include "src/_documentation/common/_licence.md"