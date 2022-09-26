module.exports = {
    extends: 'lighthouse:default',

    passes: [{
        passName: 'defaultPass',
        gatherers: [
            'gatherers/myGatherer',
        ],
    }],
  };
