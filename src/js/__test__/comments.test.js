import { displayComments } from '../modules/popup';

describe('Test comments counter with three elements response', () => {
  let popup;
  const breedId = 1;
  beforeAll(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => [
        {
          username: 'Kiara',
          creation_date: '10/03/2020',
          comment: 'Bark!',
        },
        {
          username: 'Kelly',
          creation_date: '10/03/2020',
          comment: 'Woof!',
        },
        {
          username: 'Keisha',
          creation_date: '10/03/2020',
          comment: 'Grrrrr o.O',
        },
      ],
    }));
  });
  beforeEach(() => {
    popup = document.createElement('article');
    popup.innerHTML = '<span id="comments-counter"></span><ul id="comments-list"></ul>';
  });

  test('displayComments displays the correct comments counter', () => {
    displayComments(breedId, popup).then(() => {
      const displayedCounter = popup.querySelector('#comments-counter').innerHTML;
      expect(displayedCounter).toContain('(3)');
    });
  });
});

describe('Test comments counter with three elements response', () => {
  let popup;
  const breedId = 1;
  beforeAll(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => ({
        error: {
          status: 400,
          message: 'item_id not found',
        },
      }),
    }));
  });
  beforeEach(() => {
    popup = document.createElement('article');
    popup.innerHTML = '<span id="comments-counter"></span><ul id="comments-list"></ul>';
  });

  test('displayComments displays the correct comments counter', () => {
    displayComments(breedId, popup).then(() => {
      const displayedCounter = popup.querySelector('#comments-counter').innerHTML;
      expect(displayedCounter).toContain('(0)');
    });
  });
});
