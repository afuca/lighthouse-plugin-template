'use strict';

/** @type {LH.Config.Plugin} */
module.exports = {
  audits: [
    {path: 'lighthouse-plugin-template/audits/myAudit.js'}
  ],

  category: {
    title: 'Audit template',
    description: 'Template for lighthouse plugin with empty audit',
    auditRefs: [
      {id: 'myAudit', weight: 1},
    ],
  },
};
