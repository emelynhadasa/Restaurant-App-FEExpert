/* eslint-disable no-undef */
const assert = require('assert');

Feature('Favorite Restaurant');
Before(({ I }) => {
  I.amOnPage('/#/favorite');
});
const emptyFavorite = "You don't have any favorite resto";
Scenario('test something', ({ I }) => {
  I.seeElement('.empty-favorite-resto');
  I.see(emptyFavorite, '.empty-favorite-resto');
});
Scenario('Liking one resto', async ({ I }) => {
  I.see(emptyFavorite, '.empty-favorite-resto');
  I.amOnPage('/');
  I.seeElement('.card a');
  const firstResto = locate('.card a').first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');

  I.seeElement('.card');
  const likedRestoTitle = await I.grabTextFrom('.card a');
  assert.strictEqual(firstRestoTitle, likedRestoTitle);
});
Scenario('Unliking one resto', async ({ I }) => {
  I.see(emptyFavorite, '.empty-favorite-resto');
  I.amOnPage('/');
  I.seeElement('.card a');
  const firstResto = locate('.card a').first();
  I.click(firstResto);
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.seeElement('.card a');
  const likedResto = locate('.card a').first();
  I.click(likedResto);
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.see(emptyFavorite, '.empty-favorite-resto');
});
