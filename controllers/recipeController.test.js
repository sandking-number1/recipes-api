import {expect} from 'chai';
import jsdom from 'jsdom';
import sinon from 'sinon';
import recipeController from './recipeController';

describe('Recipe Controller Tests:', () => {
  describe('Post', () => {
    it('should not allow an empty title on post', (done) => {
      const Recipe = function(recipe) {this.save = () => {}};
      const req = {
        body: {
          author: 'Reuben'
        }
      }

      const res = {
        status: sinon.spy(),
        send: sinon.spy()
      }

      const recipeControllerCall = recipeController(Recipe);
      recipeControllerCall.post(req, res);
      expect(res.status.calledWith(400)).to.equal(true, `Bad Status ${res.status.args[0][0]}`);
      expect(res.send.calledWith('Title is required').to.equal(true));
    });
  });
});
