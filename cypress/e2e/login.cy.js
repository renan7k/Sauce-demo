/// <reference types="cypress" />
//import { fakerPT_BR as faker } from '@faker-js/faker';

describe('Testes referente a página de Login', () => {
     beforeEach( ()=> {
        cy.clearCookies();
        cy.clearLocalStorage();

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

    it('Verificar tentativa de login com usuário bloqueado', () => {
        cy.login(Cypress.env('userLocked'), Cypress.env('password'))
        
        cy.get('.error-message-container')
            .should('be.visible')
            .and('contain', 'Epic sadface: Sorry, this user has been locked out.')
    })
    it('Verificar tentativa de login com usuário não cadastrado', () => {
        cy.login( 'teste', Cypress.env('password'))
        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('have.text','Epic sadface: Username and password do not match any user in this service')

    })
    it('Verificar tentativa de login com senha inválida', () => {
        cy.login(Cypress.env('userStandard'), 'teste12345')
        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain','Epic sadface: Username and password do not match any user in this service')
    })
    it('Verificar login com sucesso', () => {
        cy.login(Cypress.env('userStandard'), Cypress.env('password'))
        cy.get('.app_logo')
            .should('be.visible')
            .and('contain','Swag Labs')
        cy.title().should('be.equal', 'Swag Labs')
    })
    it('Verificar login simulando lentidão', () => {
        cy.login(Cypress.env('userPerform'), Cypress.env('password'))
        cy.get('.app_logo')
            .should('be.visible')
            .and('contain','Swag Labs')
    })
})