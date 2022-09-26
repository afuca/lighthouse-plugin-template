'use strict';

const Audit = require('lighthouse').Audit;
const NetworkRecords = require('lighthouse').NetworkRecords;

class MyAudit extends Audit {
  static get meta() {
    return {
      id: 'myAudit',
      title: 'myAudit title',
      failureTitle: 'myAudit failed',
      description: 'myAudit description',
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
    // Write your audit code here

    return {
      // Adapt the scoring
      score: 0.5
    };
  }

}

module.exports = MyAudit;
