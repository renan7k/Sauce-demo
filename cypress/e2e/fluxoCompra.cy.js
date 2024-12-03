/// <reference types="cypress" />

describe ('', () => {
    beforeEach( ()=> {
        //Código para forçar uma limpeza mais agressiva, do cache da própria página.
        //Isto foi necessário pq o cypress estava compartilhando o estado da aplicação, e falhando os testes subsequentes.
        cy.window().then((window) => {
            window.sessionStorage.clear();
            window.localStorage.clear();
            window.caches.keys().then((keys) => {
              keys.forEach((key) => {
                window.caches.delete(key);
              });
            })
        });
        cy.visit('/')
     })
     it.only('Verificar inclusão de ícone com quantidade após adição de produto no carrinho', () => {
        cy.login(Cypress.env('userStandard'), Cypress.env('password'))
        cy.get('.inventory_list > .inventory_item > .inventory_item_description > .pricebar ')
            .first()
            .contains('Add to cart')    
            .click()
        cy.get('.shopping_cart_badge[data-test="shopping-cart-badge"]')
            .should('be.visible')
            .and('have.text', '1')

        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('.shopping_cart_badge[data-test="shopping-cart-badge"]')
            .should('be.visible')
            .and('have.text', '2')
     })
     it('Verificar remoção do ícone com a quantidade após remoção de produto', () => {

     })
})