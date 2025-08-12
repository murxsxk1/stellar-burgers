describe('Перехват запроса на эндпоинт с ингредиентами', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients' }).as(
      'getIngredients'
    );
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });

  describe('Добавление ингредиента из списка в конструктор', () => {
    it('Добавление одного ингредиента', () => {
      cy.contains('li', 'Биокотлета из марсианской Магнолии')
        .find('button')
        .click();
      cy.contains('span', 'Биокотлета из марсианской Магнолии').should('exist');
    });

    it('Добавление двух ингредиентов', () => {
      cy.contains('li', 'Биокотлета из марсианской Магнолии')
        .find('button')
        .click();
      cy.contains('li', 'Филе Люминесцентного тетраодонтимформа')
        .find('button')
        .click();
      cy.contains('span', 'Биокотлета из марсианской Магнолии').should('exist');
      cy.contains('span', 'Филе Люминесцентного тетраодонтимформа').should(
        'exist'
      );
    });

    it('Добавление двух ингредиентов и булок', () => {
      cy.contains('li', 'Краторная булка N-200i').find('button').click();
      cy.contains('li', 'Биокотлета из марсианской Магнолии')
        .find('button')
        .click();
      cy.contains('li', 'Филе Люминесцентного тетраодонтимформа')
        .find('button')
        .click();
      cy.contains('span', 'Краторная булка N-200i').should('exist');
      cy.contains('span', 'Биокотлета из марсианской Магнолии').should('exist');
      cy.contains('span', 'Филе Люминесцентного тетраодонтимформа').should(
        'exist'
      );
    });
  });

  describe('Работа модальных окон', () => {
    it('Открытие модального окна ингредиента', () => {
      cy.contains('li', 'Краторная булка N-200i').click();
      cy.wait(300);
      cy.get('[data-cy="modal"]').should('be.visible');
    });

    it('Закрытие по клику на крестик', () => {
      cy.contains('li', 'Краторная булка N-200i').click();
      cy.wait(300);
      cy.get('[data-cy="buttonClose"]').click().should('not.exist');
    });

    it('Закрытие по клику на оверлей', () => {
      cy.contains('li', 'Краторная булка N-200i').click();
      cy.wait(300);
      cy.get('[data-cy="modalOverlay"]')
        .click({ force: true })
        .should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.intercept('GET', '**api/auth/user', { fixture: 'user' }).as('getUser');
      cy.intercept('POST', '**api/orders', { fixture: 'orders' }).as(
        'createOrder'
      );
      cy.visit('http://localhost:4000');
      cy.setCookie('accessToken', 'testToken');
      cy.window().then((win) => {
        win.localStorage.setItem('accessToken', 'testToken');
      });
    });

    it('Все этапы создания заказа', () => {
      // Собирается бургер.
      cy.contains('li', 'Краторная булка N-200i').find('button').click();
      cy.contains('span', 'Начинки').click();
      cy.contains('li', 'Биокотлета из марсианской Магнолии')
        .find('button')
        .click();

      // Вызывается клик по кнопке «Оформить заказ».
      cy.contains('button', 'Оформить заказ').click();
      cy.wait('@createOrder');

      // Проверяется, что модальное окно открылось и номер заказа верный.
      cy.wait(300);
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="orderNumber"]').should('exist');

      // Закрывается модальное окно и проверяется успешность закрытия.
      cy.get('[data-cy="buttonClose"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
      cy.get('[data-cy="orderNumber"]').should('not.exist');

      // Проверяется, что конструктор пуст.
      cy.contains('div', 'Выберите булки');
      cy.contains('div', 'Выберите начинку');
    });
  });
});
