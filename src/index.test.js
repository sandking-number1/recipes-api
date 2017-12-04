import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

describe('Test the test setup', () => {
  it('should pass', () => {

    expect(true).to.equal(true);
  });
});

describe('index.html', () => {
  it('should say Reusable JavaScript Template', (done) => {
    const index = fs.readFileSync('./src/index.html', 'utf-8');

    jsdom.env(index, function(err, window) {
      const div = window.document.getElementsByTagName('div')[0];
      expect(div.innerHTML).to.equal('Reusable JavaScript Template');
      done();
      window.close();
    });
  });
});
