/// <reference types="cypress" />

describe ('Testes referente a funcionalidade do fluxo de compra', () => {
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
     it('Verificar inclusão de ícone com quantidade após adição de produto no carrinho', () => {
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
        cy.login(Cypress.env('userStandard'), Cypress.env('password'))
        cy.addProducts()

        cy.get('.inventory_list > .inventory_item > .inventory_item_description > .pricebar ')
            .first()
            .contains('Remove')    
            .click()
        cy.get('.shopping_cart_badge[data-test="shopping-cart-badge"]')
            .should('be.visible')
            .and('have.text', '1')
        
        cy.get('[data-test="remove-sauce-labs-bike-light"]').click()
        cy.get('[data-test="shopping-cart-badge"]')
            .should('not.exist')
     })

     it('Verificar que itens adicionados são exibidos no carrinho', () => {
        cy.login(Cypress.env('userStandard'), Cypress.env('password'))
        cy.addProducts()

        cy.get('#shopping_cart_container').click()

        //Verificando quantidade de itens, no caso deixamos chumbado 2, pois o customComand, adiciona 2
        cy.get('.cart_contents_container .cart_item')
            .should('have.length', 2)

        cy.contains('Sauce Labs Bike Light').should('be.visible')
     })

     it('Verificar funcionamento do botão chekout no carrinho', () => {
        cy.login(Cypress.env('userStandard'), Cypress.env('password'))
        cy.addProducts()
        cy.get('#shopping_cart_container').click()
        cy.get('#checkout').click()

        cy.get('.title')
            .should('have.text', 'Checkout: Your Information')
            .and('be.visible')
     })
     it('Verificar mensagem de erro ao tentar avançar para pagamento sem preenchimento dos campos ', () => {
        cy.login(Cypress.env('userStandard'), Cypress.env('password'))
        cy.addProducts()
        cy.get('#shopping_cart_container').click()
        cy.get('#checkout').click()
        cy.get('#continue').click()

        cy.get('.error-message-container')
            .should('be.visible')
            .and('contain','Error: First Name is required') //Validando primeira mensagem de erro

        //Validando layout, borda vermelha
        cy.get('#first-name').should('have.css', 'border-bottom-color', 'rgb(226, 35, 26)')
        cy.get('#last-name').should('have.css', 'border-bottom-color', 'rgb(226, 35, 26)')
        cy.get('#postal-code').should('have.css', 'border-bottom-color', 'rgb(226, 35, 26)')
     })

     it('Verificar mensagem de erro ao não preencher o first name na tela de checkout', () => {
        cy.login(Cypress.env('userStandard'), Cypress.env('password'))
        cy.addProducts()
        cy.get('#shopping_cart_container').click()
        cy.get('#checkout').click()

        cy.get('#last-name').type('Silva')
        cy.get('#postal-code').type('06789543')
        cy.get('#continue').click()

        cy.get('.error-message-container')
            .should('be.visible')
            .and('contain','Error: First Name is required')
        cy.get('#first-name').should('have.css', 'border-bottom-color', 'rgb(226, 35, 26)')

     })
     it('Verificar mensagem de erro ao não preencher o first name na tela de checkout', () => {
        cy.login(Cypress.env('userStandard'), Cypress.env('password'))
        cy.addProducts()
        cy.get('#shopping_cart_container').click()
        cy.get('#checkout').click()

        cy.get('#first-name').type('Silva')
        cy.get('#postal-code').type('06789543')
        cy.get('#continue').click()

        cy.get('.error-message-container')
            .should('be.visible')
            .and('contain','Error: Last Name is required')
        cy.get('#last-name').should('have.css', 'border-bottom-color', 'rgb(226, 35, 26)')

     })
     it.only('Verificar mensagem de erro ao não preencher o first name na tela de checkout', () => {
        cy.login(Cypress.env('userStandard'), Cypress.env('password'))
        cy.addProducts()
        cy.get('#shopping_cart_container').click()
        cy.get('#checkout').click()

        cy.get('#first-name').type('Adenor')
        cy.get('#last-name').type('Silva')
        cy.get('#continue').click()

        cy.get('.error-message-container')
            .should('be.visible')
            .and('contain','Error: Postal Code is required')
        cy.get('#postal-code').should('have.css', 'border-bottom-color', 'rgb(226, 35, 26)')

     })
})