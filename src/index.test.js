import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

describe('Test the test setup', () => {
  it('should pass', () => {

    expect(true).to.equal(true);
  });
});

describe('index.html', () => {
  it('should have div that says Users', (done) => {
    const index = fs.readFileSync('./src/index.html', 'utf-8');

    jsdom.env(index, function(err, window) {
      const div = window.document.getElementsByTagName('div')[0];
      expect(div.innerHTML).to.equal('Users');
      done();
      window.close();
    });
  });
});
