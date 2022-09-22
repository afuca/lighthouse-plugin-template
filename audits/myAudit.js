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
        'devtoolsLogs',
        'DOMStats',
        'ImageElements',
        'LinkElements',
        'MetaElements',
        'ScriptElements'],
    };
  }

  static async audit(artifacts, context) {
    // Write your audit code here

    return {
      score: 0.5
    };
  }

}

module.exports = MyAudit;
