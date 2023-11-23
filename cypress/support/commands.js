// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('login', (email, password) => { 
  cy.visit('/login')
  // Login with valid user info
  cy.get('[data-testid="login-form"]').as('form')

  // Fill out and submit form
  cy.get('@form').find('input[name="username"]').type(email)
  cy.get('@form').find('input[name="password"]').type(password)

  cy.get('@form').find('button[type="submit"]').click()
})