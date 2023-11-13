import { createRestoCardTemplate } from '../template/resto-template';
import FavoriteRestoIdb from '../../data/favorite-resto-idb';
import filterContacts from '../../utils/filter';

const Favorite = {
  async render() {
    return `
      <section class="favorite-resto">
        <h2 class="favorite-heading">Your Favo Restaurants</h2>
        <div class="resto-container" id="resto-container"></div>
      </section>
    `;
  },

  async afterRender() {
    const restoContainer = document.querySelector('#resto-container');
    const restos = await FavoriteRestoIdb.getAllResto();

    if (restos.length === 0) {
      restoContainer.innerHTML = `
        <div class="empty-favorite">
          <h3>You don't have any favorite resto</h3>
          <p>Add your new favorite resto here!</p>
        </div>
      `;
    }

    const filteredRestos = filterContacts(restos, 'all');
    filteredRestos.forEach((resto) => {
      restoContainer.innerHTML += createRestoCardTemplate(resto);
    });
  },
};

export default Favorite;
