/* eslint-env node, jasmine */
const { expect } = require('chai');
const fs = require('fs');
const sinon = require('sinon');
const logger = require('@elastic.io/component-logger')();
const xmlToJson = require('../lib/actions/xmlToJson');

describe('XML 2 JSON parser', () => {
  let self;

  beforeEach(() => {
    self = {
      logger,
      emit: sinon.spy(),
    };
  });

  it('should convert XML to JSON', async () => {
    const xml = fs.readFileSync('./spec/data/po.xml', 'utf-8');
    // eslint-disable-next-line global-require
    const result = require('./data/po.json');

    const message = {
      data: {
        xmlString: xml,
      },
    };
    const { data } = await xmlToJson.process.bind(self)(message, {});
    expect(data).to.deep.equal(result);
  });

  it('should fail due to an invalid JSON', async () => {
    const xml = fs.readFileSync('./spec/data/invalidXml.xml', 'utf-8');

    const message = {
      data: {
        xmlString: xml,
      },
    };
    const messageText = 'Given XML is not valid or the file can not be read. '
      + 'See XML naming rules https://www.w3schools.com/xml/xml_elements.asp';

    await xmlToJson.process.bind(self)(message, {}).catch((error) => {
      expect(error.message).to.equal(messageText);
    });
  });

  describe('splitResult', async () => {
    it('should emit each item if splitResult=true');

    it('should emit an array if splitResult=false');

    it('should ignore splitResult=true if item is not an array');
  });

  describe('customJsonata', async () => {
    it('should apply custom JSONata expression if customJsonata=true');

    it('should ignore custom JSONata expression if customJsonata=false');
  });

  describe('childArray', async () => {
    it('should turn each child element into an array if childArray=true');

    it('should not turn single elements into array if childArray=false');
  });
});
