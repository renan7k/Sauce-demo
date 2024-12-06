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