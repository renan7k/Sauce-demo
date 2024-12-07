Cypress.Commands.add('login', (user, password) => {
    cy.get('#user-name').type(user)
    cy.get('#password').type(password)
    cy.get('#login-button').click()
})

Cypress.Commands.add('addProducts', () => {
    cy.get('.inventory_list > .inventory_item > .inventory_item_description > .pricebar ')
            .first()
            .contains('Add to cart')    
            .click()

    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    //diferentes seletores, para identificar botões similares
})

Cypress.Commands.add('checkout', (firstName, lastName, postalCode) => {
    //Acrescentado o condicional, para reutilizar o comando nos testes que algum campo não deve ser preenchido
    if (firstName) {
        cy.get('#first-name').type(firstName)
    }
    if (lastName) {
        cy.get('#last-name').type(lastName)
    }
    if (postalCode) {
        cy.get('#postal-code').type(postalCode)
    }
    cy.get('#continue').click()
})

Cypress.Commands.add('', () => {
    
})