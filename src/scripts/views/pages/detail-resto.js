import RestoSource from '../../data/resto-source';
import { createRestoDetailTemplate } from '../template/resto-template';
import UrlParser from '../../routes/url-parser';
import addReview from '../../utils/add-review';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import FavoriteRestoIdb from '../../data/favorite-resto-idb';
import filterContacts from '../../utils/filter';

const DetailResto = {
  async render() {
    return `
      <section class="detail-section">
      </section>  
      <div id="likeButtonContainer" tabindex="0"></div>      
      `;
  },

  async afterRender() {
    const detailRestoContainer = document.querySelector('.detail-section');
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const resto = await RestoSource.detailResto(url.id);
    detailRestoContainer.innerHTML = createRestoDetailTemplate(resto);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteResto: FavoriteRestoIdb,
      resto: {
        id: resto.id,
        name: resto.name,
        description: resto.description,
        pictureId: resto.pictureId,
        rating: resto.rating,
        city: resto.city,
      },
    });

    const restos = filterContacts([resto], 'all');
    detailRestoContainer.innerHTML = createRestoDetailTemplate(restos[0]);

    const buttonReview = document.querySelector('.button-review');
    const name = document.querySelector('#name');
    const review = document.querySelector('#review');
    buttonReview.addEventListener('click', async (e) => {
      e.preventDefault();
      await addReview(url, name.value, review.value);
      name.value = '';
      review.value = '';
    });
  },
};

export default DetailResto;
