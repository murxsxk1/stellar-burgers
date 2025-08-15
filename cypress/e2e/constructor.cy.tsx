import { INGREDIENTS, SELECTORS } from '../support/constants';

describe('Перехват запроса на эндпоинт с ингредиентами', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' }).as(
      'getIngredients'
    );
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  describe('Добавление ингредиента из списка в конструктор', () => {
    it('Добавление одного ингредиента', () => {
      cy.contains('li', INGREDIENTS.MAIN_INGREDIENT).find('button').click();
      cy.contains('span', INGREDIENTS.MAIN_INGREDIENT).should('exist');
    });

    it('Добавление двух ингредиентов', () => {
      cy.contains('li', INGREDIENTS.MAIN_INGREDIENT).find('button').click();
      cy.contains('li', INGREDIENTS.ADDITIONAL_INGREDIENT)
        .find('button')
        .click();
      cy.contains('span', INGREDIENTS.MAIN_INGREDIENT).should('exist');
      cy.contains('span', INGREDIENTS.ADDITIONAL_INGREDIENT).should('exist');
    });

    it('Добавление двух ингредиентов и булок', () => {
      cy.contains('li', INGREDIENTS.MAIN_BUN).find('button').click();
      cy.contains('li', INGREDIENTS.MAIN_INGREDIENT).find('button').click();
      cy.contains('li', INGREDIENTS.ADDITIONAL_INGREDIENT)
        .find('button')
        .click();
      cy.contains('span', INGREDIENTS.MAIN_BUN).should('exist');
      cy.contains('span', INGREDIENTS.MAIN_INGREDIENT).should('exist');
      cy.contains('span', INGREDIENTS.ADDITIONAL_INGREDIENT).should('exist');
    });
  });

  describe('Работа модальных окон', () => {
    it('Открытие модального окна ингредиента', () => {
      cy.contains('li', INGREDIENTS.MAIN_BUN).click();
      cy.wait(300);
      cy.get(SELECTORS.MODAL).should('be.visible');
    });

    it('Закрытие по клику на крестик', () => {
      cy.contains('li', INGREDIENTS.MAIN_BUN).click();
      cy.wait(300);
      cy.get(SELECTORS.MODAL_CLOSE_BUTTON).click().should('not.exist');
    });

    it('Закрытие по клику на оверлей', () => {
      cy.contains('li', INGREDIENTS.MAIN_BUN).click();
      cy.wait(300);
      cy.get(SELECTORS.MODAL_OVERLAY)
        .click({ force: true })
        .should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'testToken');
      window.localStorage.setItem('accessToken', 'testToken');

      cy.intercept('GET', 'api/auth/user', { fixture: 'user' }).as('getUser');
      cy.intercept('POST', 'api/orders', { fixture: 'orders' }).as(
        'createOrder'
      );

      cy.visit('/');
    });

    it('Все этапы создания заказа', () => {
      // Собирается бургер.
      cy.contains('li', INGREDIENTS.MAIN_BUN).find('button').click();
      cy.contains('span', 'Начинки').click();
      cy.contains('li', INGREDIENTS.MAIN_INGREDIENT).find('button').click();

      // Вызывается клик по кнопке «Оформить заказ».
      cy.contains('button', 'Оформить заказ').click();
      cy.wait('@createOrder');

      // Проверяется, что модальное окно открылось и номер заказа верный.
      cy.wait(300);
      cy.get(SELECTORS.MODAL).should('be.visible');
      cy.get(SELECTORS.ORDER_NUMBER).should('exist');

      // Закрывается модальное окно и проверяется успешность закрытия.
      cy.get(SELECTORS.MODAL_CLOSE_BUTTON).click();
      cy.get(SELECTORS.MODAL).should('not.exist');
      cy.get(SELECTORS.ORDER_NUMBER).should('not.exist');

      // Проверяется, что конструктор пуст.
      cy.contains('div', 'Выберите булки');
      cy.contains('div', 'Выберите начинку');
    });

    // Очищаются токены после завершения теста
    afterEach(() => {
      window.localStorage.removeItem('accessToken');
      cy.clearCookie('accessToken');
    });
  });
});
