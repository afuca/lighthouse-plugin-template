// From https://keepinguptodate.com/pages/2021/08/custom-lighthouse-audit/

const { Gatherer } = require('lighthouse');
const pageFunctions = require('lighthouse/lighthouse-core/lib/page-functions');

/* global getNodeDetails */

class MyGatherer extends Gatherer {
  /**
  * @param {LH.Gatherer.PassContext} options
  * @param {LH.Gatherer.LoadData} loadData
  */
  async afterPass(options, loadData) {
    const driver = options.driver;

    const mainFn = () => {
      // Query elements
      const elements = document.querySelectorAll("*");
      const elementsArray = Array.from(elements);

      // Build response objects
      const elementSummaries = elementsArray.map(element => ({
        tagName: element.tagName,
        node: getNodeDetails(element)
      }));

      // Return the response
      return elementSummaries;
    }

    return driver.executionContext.evaluate(mainFn, {
      args: [],
      deps: [
        pageFunctions.getElementsInDocumentString,
        pageFunctions.getNodeDetailsString,
      ]
    });
  }
}

module.exports = MyGatherer;
