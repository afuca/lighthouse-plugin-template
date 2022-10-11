'use strict';

const Audit = require('lighthouse').Audit;
const NetworkRecords = require('lighthouse').NetworkRecords;
let failTxt = 'Images should have a alt attribute that is valid. It should not be too short or a translation key.';

class MyAudit extends Audit {

  

  static get meta() {
    return {
      id: 'img-alt-check',
      title: 'Images alternatives are valid',
      failureTitle: 'There is an issue with some alternatives',
      description: failTxt,
      scoreDisplayMode: Audit.SCORING_MODES.NUMERIC,
      requiredArtifacts: [
          //'DevtoolsLog',
          'devtoolsLogs',
          'traces',
          'Accessibility',
          'AnchorElements',
          //'CacheContents',
          'ConsoleMessages',
          'CSSUsage',
          'Doctype',
          'DOMStats',
          'EmbeddedContent',
          'FontSize',
          'Inputs',
          'GlobalListeners',
          'IFrameElements',
          'ImageElements',
          'InstallabilityErrors',
          'InspectorIssues',
          'JsUsage',
          'LinkElements',
          'MainDocumentContent',
          'MetaElements',
          'NetworkUserAgent',
          'OptimizedImages',
          'PasswordInputsWithPreventedPaste',
          'ResponseCompression',
          'RobotsTxt',
          'ServiceWorker',
          'ScriptElements',
          //'Scripts',
          'SourceMaps',
          'Stacks',
          'TagsBlockingFirstPaint',
          'TapTargets',
          'TraceElements',
          'ViewportDimensions',
          'WebAppManifest',

          // Our custom gatherer (gatherers/myGatherer.js):
          'MyGatherer'
      ],
    };
  }

  static async audit(artifacts, context) {
    let score = 0;
    let failedImg = [];
    try {
    // Write your audit code here

    const images = artifacts.MyGatherer;
    
    if (!images || images.length === 0) {
      return {
        score: null, notApplicable: true
      }
    }
    
    const translationKeyRegexp = new RegExp('^[-.a-z1-9]+$', 'gi')
    failedImg = images.filter(image => {
      let failed = false;
      const alt = image.alt ? image.alt : image.airiaLabel ? image.airiaLabel : '';
      if (!alt) {
        image.error = 'Missing Alt';
        failed = true;
      } else if (alt.length < 5) {
        image.error = 'Alt too short';
        failed = true;
      } else if(alt.match(translationKeyRegexp)) {
        image.error = 'Alt loks like a translation key';
        failed = true;
      }
      
      return  failed;
    });
    

    score = failedImg.length ? failedImg.length / images.length  : 1;


    
    }
    catch(e) {
      failTxt = e.message
    }

    /** @type {LH.Audit.Details.Table['headings']} */
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
   
  }

}

module.exports = MyAudit;


// NOTE : j'avais pas compris qu'il fallait ajouter ImageElements dans requiredArticats => A préciser dans la doc
// NOTE : Contre l'env local, le score de perf varie de 1 à 30
