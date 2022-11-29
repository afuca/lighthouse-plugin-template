# Lighthouse plugin template

Lighthouse plugin template with an empty audit.

# Installation

Requirements:
* Google Chrome or Chromium
* node
* npm

```
npm install
```

# Usage
To run audit of a page

```
npm run audit <page url>
```

For example:
```
npm run audit https://cirb.brussels/
```

## Debug plugin (VSCode)

1. Add breakpoints or logs to your code

2. Run the debugger (F5)

3. In the terminal, run lighthouse in debug mode: `npm run debug <page url>`

That's all


# Contents

* **package.json** - declares the plugin's entry point (plugin.js)
* **plugin.js** - instructs Lighthouse to run the plugin's own audit (audits/myAudit.js); describes the new category and its details for the report
* **audits/myAudit.js** - the new audit to run in addition to Lighthouse's default audits
* **gatherers/myGatherer.js** - the gatherer collecting data from the page

## Audit structure

A plugin audit is a class that implements at least two properties: **meta** and **audit()**.

### meta

The meta property is a static getter for the metadata of an audit. It should return an object with properties.

### Audit

The audit() property is a function the computes the audit results for the report. It accepts two arguments: **artifacts** and **context**.

* **artifacts** is an object whose keys will be the values you passed to **requiredArtifacts** in the **meta** object.

* **context** is an internal object whose primary use in plugins is to derive network request information.

### Score

The primary objective of the audit function is to return a **score from 0 to 1** based on the data observed in artifacts.

## Gatherer

Gatherers can read information from the page to generate artifacts which are later used by audits.

The `gatherers/MyGatherer` example can be modified for your use.

The current code is an example that query all dom elements and return _tagName_ and _nodeDetail_ in a list.


# Plugin doc

### Example 1 : DOM stats API
```javascript
const stats = artifacts.DOMStats;
```

### Example 2 : Elements API
* ImageElements
* LinkElements
* MetaElements
* ScriptElements

```javascript
const images = artifacts.ImageElements;
```

### Example 3 : Requests API
```javascript
// Lighthouse loads the page multiple times: while offline, without javascript, etc.
// Use the devtools log from the default pass of the page.
const devtoolsLog = artifacts.devtoolsLogs[Audit.DEFAULT_PASS];

// Request the network records from the devtools log.
// The `context` argument is passed in to allow Lighthouse to cache the result and not re-compute the network requests for every audit that needs them.
const requests = await NetworkRecords.request(devtoolsLog, context);
```

### Example 4 : My custom gatherer
```javascript
const myGatherer = artifacts.MyGatherer
```

### Example 5 : Display some elements
You can display a table of elements with the report (for example, elements that failed).

Do do so, you have to fist define table header and then return it with the liste of elements into the "details".

```javascript
 /** @type {LH.Audit.Details.Table['headings']} */
    failedImg = [
        {src: 'http://mysite.com/img/img.jpg', alt: 'test', error: 'This alternative is too short'}
    ];
    const headings = [
      {key: 'src', itemType: 'thumbnail', text: ''},
      {key: 'src', itemType: 'url', text: 'url'},
      {key: 'alt', itemType: 'text', text: 'Alternative text'},
      {key: 'error', itemType: 'text', text: 'Error'},
    ];

    return {
      score: score,
      details: Audit.makeTableDetails(headings, failedImg)
    };
```

The elements is a list of objects with properties.

Headings is a list of object that define the columns titles :

* **key** : the key of the object that should be used to get the value to display ;
* **itemType**: the type of data. It can be text, url, thumbnail, ... Lightouse will display it according to the type : url will display clickable links, thumbnail will display an image ;
* **text**: the title of the colum.

### Lighthouse plugin API
* [More documentation about plugin API](https://github.com/GoogleChrome/lighthouse/blob/master/docs/plugins.md#api)
* [API Artifacts definition](https://github.com/GoogleChrome/lighthouse/blob/master/types/artifacts.d.ts)
* [Default audits of Lighthouse](https://github.com/GoogleChrome/lighthouse/tree/master/core/audits)
* [Default gatherers of Lighthouse](https://github.com/GoogleChrome/lighthouse/tree/master/core/gather/gatherers)

# Plugins ideas

* Image lazy-loading
* Big images are not resized
* IFrame lazy-loading
* Limit numbers of CSS
* Do not preload Video object (use clickable cover instead)
* Do not preload Map object (use clickable cover instead)
* a11y: Listing suspects 'alt' attributes (less than 2 chars, ...).
* SPA: Try to change de weight of default JS plugins to be more compliant with SPA.

### For hard-core coder only

* Try to get CPU, memory, and other usage metrics of the page.

## Development process

* Analyze the case
* Describe how and what to do, limits and constraints
* Define the textual description
* Define the scoring
* Code & test
