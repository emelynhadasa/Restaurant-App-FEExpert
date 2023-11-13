import HomePage from '../views/pages/home-page';
import DetailResto from '../views/pages/detail-resto';
import Favorite from '../views/pages/favorite-resto';

const routes = {
  '/': HomePage,
  '/detail/:id': DetailResto,
  '/favorite': Favorite,

};

export default routes;
