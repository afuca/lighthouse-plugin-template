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


# Contents

* **package.json** - declares the plugin's entry point (plugin.js)
* **plugin.js** - instructs Lighthouse to run the plugin's own audit (audits/myAudit.js); describes the new category and its details for the report
* **audits/myAudit.js** - the new audit to run in addition to Lighthouse's default audits

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

### Lighthouse plugin API
* [More documentation about plugin API](https://github.com/GoogleChrome/lighthouse/blob/master/docs/plugins.md#api)
* [API Artifacts definition](https://github.com/GoogleChrome/lighthouse/blob/master/types/artifacts.d.ts)
* [Default audits of Lighthouse](https://github.com/GoogleChrome/lighthouse/tree/master/core/audits)

# Plugins ideas

* Image lazy-loading
* Big images are not resized
* IFrame lazy-loading
* Limit numbers of CSS
* Do not preload Video object (use clickable cover instead)
* Do not preload Map object (use clickable cover instead)
* a11y: Listing of suspects 'alt' attributs (less than 2 chars, ...).
* SPA: Try to change de weight of default JS plugins to be more compliant with SPA.

### For hard-core coder only

* Try to get CPU, memory, and other usage metrics of the page (with `devtoolsLog`? Take a look at current default plugins as well)

## Development process

* Analyze the case
* Describe how and what to do, limits and constraints
* Define the textual description
* Define the scoring
* Code & test
