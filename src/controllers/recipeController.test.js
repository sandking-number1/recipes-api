import {expect} from 'chai';
import sinon from 'sinon';
import recipeController from './recipeController';

// describe('Test the test setup', () => {
//   it('should pass', () => {
//     expect(true).to.equal(true);
//   });
// });

describe('Recipe Controller Tests:', () => {
  context('Post', () => {
    it('should not allow an empty name on post', (done) => {
      const Recipe = function(recipe) {this.save = () => {};};
      const req = {
        body: {
          name: 'Recipe'
        }
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy()
      };

      const recipeControllerCall = recipeController(Recipe);
      recipeControllerCall.post(req, res);
      console.log(res.status.calledWith(201));

      expect(res.status.calledWith(201)).to.deep.equal(true, `Bad Status ${res.status.args[0][0]}`);
      expect(res.send.calledWith('Name is required')).to.deep.equal(true);
      done();
    });
  });
});
