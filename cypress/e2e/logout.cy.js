/// <reference types="cypress" />
describe('Testes referente ao logout', () => {
    beforeEach(() => {
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
    it('Verificar logout com sucesso', () => {
        cy.login(Cypress.env('userStandard'), Cypress.env('password'))
        cy.get('#react-burger-menu-btn').click()
        cy.get('#logout_sidebar_link').click()

        cy.get('.login_container').should('be.visible')
        cy.contains('Swag Labs').should('be.visible')
    })
})