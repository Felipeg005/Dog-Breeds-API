import { loadBreeds, loadCounter } from '../modules/load-counter-home';

jest.mock('../modules/load-counter-home');

describe('test load li elements function', () => {
  describe('counter', () => {
    test('must count 21 elements in homepage', () => {
      // Arrange
      document.body.innerHTML = '<ul class="list-container"></ul>';
      // Act
      loadBreeds();
      // Assert
      expect(document.querySelectorAll('li').length).toBe(21);
    });
  });

  describe('counter function test', () => {
    test('must display amount of li displayed', () => {
      // Arrange
      document.body.innerHTML = '<header class="header">'
      + '<div class="logo"></div>'
      + '</header>'
      + '<h2 id="counter"></h2>'
      + '<ul class="list-container"></ul>';
      // Act
      loadBreeds();
      loadCounter();
      // Assert
      expect(document.getElementById('counter').innerHTML).toBe('Total Breeds (21)');
    });
  });
});

export default loadBreeds;
