// import {expect} from 'chai';
// import request from 'supertest';
// import app from '../buildScripts/srcServer.js';
// import mongoose from 'mongoose';
// const Recipe = mongoose.model('Recipe');
// const agent = request.agent(app);

// describe('Recipe Crud Test', () => {
//   it('Should allow a recipe to be posted and return an _id', (done) => {
//     const recipePost = {name:'new Recipe', ingredients: ['chicken', 'cauliflower', 'italian seasoning']
//     , instructions: ['1. boil chicken', '2. boil pasta'], tags: ['chicken', 'lunch', 'low-carbs']};

//     agent.post('/api/recipes')
//       .send(recipePost)
//       .expect(200)
//       .end(function(err, results) {
//         expect(results.body.tags).to.deep.include('chicken');
//         expect(results.body).to.have.property('_id');
//         done();
//       });
//   });

//   afterEach(function(done) {
//     Recipe.remove().exec();
//     done();
//   });
// });
