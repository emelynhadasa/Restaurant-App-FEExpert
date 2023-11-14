/* eslint-disable no-undef */
/* eslint-disable no-new */
import FavoriteRestoShowPresenter from '../src/scripts/views/pages/liked-restos/favorite-resto-show-presenter';
import FavoriteRestoView from '../src/scripts/views/pages/liked-restos/favorite-resto-view';

describe('Showing all favorite resto', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestoView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no resto have been liked', () => {
    it('should render the information that no resto have been liked', () => {
      const favoriteResto = {
        getAllResto: jest.fn().mockImplementation(() => []),
      };

      const presenter = new FavoriteRestoShowPresenter({
        view,
        favoriteResto,
      });

      const resto = [];
      presenter._displayResto(resto);

      expect(document.querySelectorAll('.resto-item__not__found').length).toEqual(1);
    });

    it('should ask for the favorite resto', () => {
      const favoriteResto = {
        getAllResto: jest.fn().mockImplementation(() => []),
      };

      new FavoriteRestoShowPresenter({
        view,
        favoriteResto,
      });

      expect(favoriteResto.getAllResto).toHaveBeenCalledTimes(1);
    });
  });

  describe('When favorite resto exist', () => {
    it('should show the resto', (done) => {
      document.getElementById('resto').addEventListener('resto:updated', () => {
        expect(document.querySelectorAll('.resto-item').length).toEqual(0);

        done();
      });

      const favoriteResto = {
        getAllResto: jest.fn().mockImplementation(() => [
          {
            id: 11,
            title: 'A',
            vote_average: 3,
            overview: 'Sebuah resto A',
          },
          {
            id: 22,
            title: 'B',
            vote_average: 4,
            overview: 'Sebuah resto B',
          },
        ]),
      };

      new FavoriteRestoShowPresenter({
        view,
        favoriteResto,
      });
    });
  });
});
