/* eslint-disable no-unused-vars */
import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/responsive.css';
import App from './views/app';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import filterContacts from './utils/filter';
import UrlParser from './routes/url-parser';
import FavoriteRestoIdb from './data/favorite-resto-idb';
import RestoSource from './data/resto-source';

const START = 10;
const NUMBER_OF_IMAGES = 100;

const app = new App({
  button: document.querySelector('#hamburger'),
  drawer: document.querySelector('nav'),
  content: document.querySelector('#mainContent'),
});

function getRoute() {
  const hash = window.location.hash.toLowerCase();
  const route = hash.substring(1);
  return route || 'home';
}

async function handleRouteChange() {
  const route = getRoute();

  switch (route) {
    case 'home':
      // Handle the home route, if needed
      break;
    case 'favorite': {
      const { initFavoritePage } = await import('./views/pages/favorite-resto');
      const restos = await FavoriteRestoIdb.getAllResto();
      const filteredRestos = filterContacts(restos, 'all');
      initFavoritePage(filteredRestos);
      break;
    }
    case 'detail': {
      const { initDetailPage } = await import('./views/pages/detail-resto');
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const resto = await RestoSource.detailResto(url.id);
      const filteredResto = filterContacts([resto], 'all');
      initDetailPage(filteredResto[0]);
      break;
    }
    default:
      // Handle the default case or do nothing if not needed
      break;
  }

  app.renderPage();
}

window.addEventListener('hashchange', () => {
  handleRouteChange();
});

window.addEventListener('load', () => {
  handleRouteChange();
  swRegister();
});
