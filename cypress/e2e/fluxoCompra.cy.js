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

        cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-one.html')

        cy.get('.title')
            .should('have.text', 'Checkout: Your Information')
            .and('be.visible')
     })
     it('Verificar funcionamento do botão "Continue Shopping" no carrinho', () => {
        cy.login(Cypress.env('userStandard'), Cypress.env('password'))
        cy.addProducts()
        cy.get('#shopping_cart_container').click()
        cy.get('#continue-shopping').click()

        cy.url().should('eq','https://www.saucedemo.com/inventory.html')
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

        cy.checkout('', 'Conceição', '06741532')

        cy.get('.error-message-container')
            .should('be.visible')
            .and('contain','Error: First Name is required')
        cy.get('#first-name').should('have.css', 'border-bottom-color', 'rgb(226, 35, 26)')

     })
     it('Verificar mensagem de erro ao não preencher o last name na tela de checkout', () => {
        cy.login(Cypress.env('userStandard'), Cypress.env('password'))
        cy.addProducts()
        cy.get('#shopping_cart_container').click()
        cy.get('#checkout').click()

        cy.checkout('Fabio', '', '06741532')

        cy.get('.error-message-container')
            .should('be.visible')
            .and('contain','Error: Last Name is required')
        cy.get('#last-name').should('have.css', 'border-bottom-color', 'rgb(226, 35, 26)')

     })
     it('Verificar mensagem de erro ao não preencher o post code na tela de checkout', () => {
        cy.login(Cypress.env('userStandard'), Cypress.env('password'))
        cy.addProducts()
        cy.get('#shopping_cart_container').click()
        cy.get('#checkout').click()

        cy.checkout('Fabio', 'Augusto', '')

        cy.get('.error-message-container')
            .should('be.visible')
            .and('contain','Error: Postal Code is required')
        cy.get('#postal-code').should('have.css', 'border-bottom-color', 'rgb(226, 35, 26)')

     })
     it('Verificar funcionamento do botão "Cancel" na tela de checkout', () => {
        cy.login(Cypress.env('userStandard'), Cypress.env('password'))
        cy.addProducts()
        cy.get('#shopping_cart_container').click()
        cy.get('#checkout').click()
        cy.get('#cancel').click()

        cy.contains('Your Cart').should('be.visible')
        cy.url().should('eq','https://www.saucedemo.com/cart.html')

     })
     it('Verificar redirecionamento para tela de pagamento após prenchimentos dos dados de ckeckout', () => {
        cy.login(Cypress.env('userStandard'), Cypress.env('password'))
        cy.addProducts()
        cy.get('#shopping_cart_container').click()
        cy.get('#checkout').click()

        cy.checkout('Adenor', 'Silvano', '06789430')

        cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-two.html');
        //cy.url().should('include', 'parte-da-url');

        cy.get('.title')
            .should('have.text', 'Checkout: Overview')
            .and('be.visible')
     }) 

     it('Verificar funcionamento do botão Cancel na tela de pagamento', () => {
        cy.login(Cypress.env('userStandard'), Cypress.env('password'))
        cy.addProducts()
        cy.get('#shopping_cart_container').click()
        cy.get('#checkout').click()

        cy.checkout('Adenor', 'Silvano', '06789430')
        cy.get('#cancel').click()

        cy.url().should('eq','https://www.saucedemo.com/inventory.html')
     }) 

     it('Verificar compra realizada com sucesso', () => {
        cy.login(Cypress.env('userStandard'), Cypress.env('password'))
        cy.addProducts()
        cy.get('#shopping_cart_container').click()
        cy.get('#checkout').click()

        cy.checkout('Adenor', 'Silvano', '06789430')
        cy.get('#finish').click()

        cy.url().should('eq','https://www.saucedemo.com/checkout-complete.html')
        cy.contains('Checkout: Complete').should('be.visible')

        cy.get('[data-test="complete-header"]')
            .should('have.text', 'Thank you for your order!')

        cy.get('[data-test="complete-text"]')
            .should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')
     })
     it('Verificar funcionamento do botão Back Home', () => {
        cy.login(Cypress.env('userStandard'), Cypress.env('password'))
        cy.addProducts()
        cy.get('#shopping_cart_container').click()
        cy.get('#checkout').click()

        cy.checkout('Adenor', 'Silvano', '06789430')
        cy.get('#finish').click()
        cy.get('#back-to-products').click()

        cy.url().should('eq','https://www.saucedemo.com/inventory.html')
     })
})