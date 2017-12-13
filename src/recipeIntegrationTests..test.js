// import {expect} from 'chai';
// import jsdom from 'jsdom';
// import request from 'supertest';
// import app from '../buildScripts/srcServer.js';
// import mongoose from 'mongoose';
// const Recipe = mongoose.model('Recipe');
// const agent = request.agent(app);

// describe('Book Crud Test', () => {
//   it('Should allow a recipe to be posted and return a read and _id', (done) => {
//     const recipePost = {name:'new Recipe', category: 'chicken'};

//     agent.post('/api/recipes')
//       .send(recipePost)
//       .expect(200)
//       .end(function(err, results) {
//         expect(results.body.category).to.deep.equal('chicken');
//         expect(results.body).to.have.property('_id');
//         done();
//       });
//   });

//   afterEach(function(done) {
//     Recipe.remove().exec();
//     done();
//   });
// });
