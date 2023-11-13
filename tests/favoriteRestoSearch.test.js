/* eslint-disable no-undef */
import FavoriteRestoSearchPresenter from '../src/scripts/views/pages/liked-restos/favorite-resto-search-presenter';
import FavoriteRestoView from '../src/scripts/views/pages/liked-restos/favorite-resto-view';

describe('Searching resto', () => {
  let presenter;
  let favoriteResto;
  let view;

  const searchResto = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;

    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestoSearchContainer = () => {
    view = new FavoriteRestoView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteResto = {
      getAllResto: jest.fn(),
      searchResto: jest.fn(),
    };

    presenter = new FavoriteRestoSearchPresenter({
      favoriteResto,
      view,
    });
  };

  beforeEach(() => {
    setRestoSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      favoriteResto.searchResto.mockImplementation(() => []);

      searchResto('resto a');

      expect(presenter.latestQuery).toEqual('resto a');
    });

    it('should ask the model to search for liked resto', () => {
      favoriteResto.searchResto.mockImplementation(() => []);

      searchResto('resto a');

      expect(favoriteResto.searchResto).toHaveBeenCalledWith('resto a');
    });

    it('should show the resto found by Favorite Resto', (done) => {
      document.getElementById('resto').addEventListener('resto:updated', () => {
        expect(document.querySelectorAll('.resto-item').length).toEqual(3);

        done();
      });

      favoriteResto.searchResto.mockImplementation((query) => {
        if (query === 'resto a') {
          return [
            { id: 111, title: 'resto abc' },
            { id: 222, title: 'ada juga resto abcde' },
            { id: 333, title: 'ini juga boleh resto a' },
          ];
        }

        return [];
      });

      searchResto('resto a');
    });

    it('should show the name of the resto found by Favorite Resto', (done) => {
      document.getElementById('resto').addEventListener('resto:updated', () => {
        const restoTitles = document.querySelectorAll('.resto__title');

        expect(restoTitles.item(0).textContent).toEqual('resto abc');
        expect(restoTitles.item(1).textContent).toEqual('ada juga resto abcde');
        expect(restoTitles.item(2).textContent).toEqual('ini juga boleh resto a');

        done();
      });

      favoriteResto.searchResto.mockImplementation((query) => {
        if (query === 'resto a') {
          return [
            { id: 111, title: 'resto abc' },
            { id: 222, title: 'ada juga resto abcde' },
            { id: 333, title: 'ini juga boleh resto a' },
          ];
        }

        return [];
      });

      searchResto('resto a');
    });

    it('should show - when the resto returned does not contain a title', (done) => {
      document.getElementById('resto').addEventListener('resto:updated', () => {
        const restoTitles = document.querySelectorAll('.resto__title');
        expect(restoTitles.item(0).textContent).toEqual('-');

        done();
      });

      favoriteResto.searchResto.mockImplementation((query) => {
        if (query === 'resto a') {
          return [{ id: 444 }];
        }

        return [];
      });

      searchResto('resto a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteResto.getAllResto.mockImplementation(() => []);

      searchResto(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchResto('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchResto('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchResto('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite resto', () => {
      favoriteResto.getAllResto.mockImplementation(() => []);

      searchResto('    ');

      expect(favoriteResto.getAllResto).toHaveBeenCalled();
    });
  });

  describe('When no favorite resto could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('resto').addEventListener('resto:updated', () => {
        expect(document.querySelectorAll('.resto-item__not__found').length).toEqual(1);

        done();
      });

      // eslint-disable-next-line no-unused-vars
      favoriteResto.searchResto.mockImplementation((query) => []);

      searchResto('resto a');
    });

    it('should not show any resto', (done) => {
      document.getElementById('resto').addEventListener('resto:updated', () => {
        expect(document.querySelectorAll('.resto-item').length).toEqual(0);

        done();
      });

      // eslint-disable-next-line no-unused-vars
      favoriteResto.searchResto.mockImplementation((query) => []);

      searchResto('resto a');
    });
  });
});
