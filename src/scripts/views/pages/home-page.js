import RestoSource from '../../data/resto-source';
import { createRestoCardTemplate } from '../template/resto-template';
import Loading from '../template/loading';

const HomePage = {
  async render() {
    return `
        <section id="hero-section" tabindex="0">
        <div class="hero-image">
          <picture>
            <source media="(max-width: 200px)" srcset="src/public/images/heros/hero-image_2_op-small.jpg">
            <img src="./images/heros/hero-image_2_op.jpg" alt="Find Resto" />
          </picture>
        </div>
        <div class="hero-text">
          <h2>Find Your <span class="second-color">Resto</span></h2>
          <a href="#resto" class="find-resto">Start</a>
        </div>
      </section>
      <section id="resto" tabindex="0">
        <h2 class="resto-title">
          Explore <span class="second-color">Restaurant</span>
        </h2>
        <div class="card-list no-scrollbar">
        </div>
      </section>
    `;
  },

  async afterRender() {
    const restaurantsContainer = document.querySelector('.card-list');
    restaurantsContainer.innerHTML = Loading();
    try {
      const restaurantsdata = await RestoSource.homePage();
      const restaurants = restaurantsdata.slice(0, 18);
      const filterRestaurant = restaurants.filter((restaurant) => restaurant.city === 'Medan');
      console.log(filterRestaurant);
      restaurantsContainer.innerHTML = '';
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += createRestoCardTemplate(restaurant);
      });
    } catch (message) {
      restaurantsContainer.innerHTML = `<h2 class="error-message">${message}</h2>`;
    }
  },
};

export default HomePage;
