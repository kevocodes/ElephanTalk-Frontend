declare namespace Cypress {
  interface Chainable {
      login(username: string, password: string): Cypress.Chainable<JQuery>;
  }
}