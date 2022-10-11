'use strict';

/** @type {LH.Config.Plugin} */
module.exports = {
  audits: [
    {path: 'lighthouse-plugin-template/audits/myAudit.js'}
  ],

  category: {
    title: 'Images alternatives validiy check',
    description: 'Images alt attibute should be understandable and give info.',
    auditRefs: [
      {id: 'img-alt-check', weight: 1},
    ],
  },
};
