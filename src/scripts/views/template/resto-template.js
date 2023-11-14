/* eslint-disable no-unused-vars */
import CONFIG from '../../globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const START = 10;
const NUMBER_OF_IMAGES = 100;

const createRestoCardTemplate = (resto) => `
<article class="card" tabindex="0">
    <p class="location">${resto.city}</p>
    <img
        data-src="${CONFIG.SMALL_IMAGE_URL + resto.pictureId}"
        alt="${resto.name}"
        class="card-image lazyload"
        crossorigin="anonymous" 
    />
    <div class="card-text">
        <p>Rating ${resto.rating}</p>
        <h3 class="card-resto-name">${resto.name}</h3>
        <p class="card-description">
        ${resto.description}
        </p>
        <a href="#/detail/${resto.id}" class="card-button">See Detail</a>
    </div>
</article>
`;

const createRestoDetailTemplate = (resto) => `
 <div class="hero-detail" tabindex="0">
  <div class="resto_image">
    <img
      crossorigin="anonymous" 
      src="${CONFIG.MEDIUM_IMAGE_URL + resto.pictureId}" alt="${resto.name}"
      class="lazyload"
    />
    <p class="rating_resto">Rating ⭐ ${resto.rating}</p>
  </div>
  <div class="detail-text" tabindex="0">
    <h1 class="resto-name">${resto.name}</h1>
    <p class="resto-address">${resto.address} ${resto.city}</p>
    <p class="resto-description">${resto.description}</p>
    <div class="resto-menu">
      <h2 class="title-menu">Resto Menu</h2>
      <div class="resto-foods">
        <p>Resto Foods</p>
        <ul>
         ${resto.menus.foods.map((foods) => `<li>${foods.name}</li>`).join('')}
        </ul>
      </div>
      <div class="resto-drinks">
        <p>Resto Drinks</p>
        <ul>
         ${resto.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
        </ul>
      </div>
    </div>
  </div>
</div>
<div class="resto-reviews" tabindex="0">
    <h2>What They Say About This Resto?</h2>
    <div class="reviews-container no-scrollbar">
      ${resto.customerReviews.map((review) => `
      <div class="card-reviews">
        <figure>
          <img
            crossorigin="anonymous" 
            src="./images/profile.jpg"
            alt="${review.name}"
            class="reviewer-photo lazyload"
          />
          <figcaption class="reviewer-name">${review.name}</figcaption>
        </figure>
        <div class="review-text-detail">
        <p class="review">${review.review}</p>
        <p class="date-review">${review.date}</p>
        </div>
      </div>
      `).join('')}
    </div>
</div>
<div class="add-review" tabindex="0">
    <p class="title-add-review">Let's Review This Resto Here</p>
    <form action="#">
      <div class="name">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" />
      </div>
      <div class="review-input">
        <label for="review">Review</label>
        <textarea name="review" id="review"></textarea>
      </div>
      <button type="submit" class="button-review">Submit</button>
    </form>
</div>
  <div class="add-review-image">
    <img 
      class="lazyload"
      crossorigin="anonymous" 
      src="${CONFIG.MEDIUM_IMAGE_URL + resto.pictureId}" 
      alt="" />
    <div class="title-review-image">
      <p>${resto.name}</p>
    </div>
  </div>

`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this resto" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this resto" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;
export {
  createRestoCardTemplate,
  createRestoDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
