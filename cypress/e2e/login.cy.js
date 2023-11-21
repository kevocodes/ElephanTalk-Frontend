/// <reference types="Cypress" />

describe("Login", () => {
  it("Can login with valid user info", () => {
    cy.visit("/login");
    // Login with valid user info
    cy.get('[data-testid="login-form"]').as("form");

    // Show error on empty form submit
    cy.get("@form").find('button[type="submit"]').click();

    cy.get("@form").contains(/Username or Email is required/i);
    cy.get("@form").contains(/Password is required/i);

    // Login with valid user info
    cy.login(Cypress.env("AUTH_USER"), Cypress.env("AUTH_PASSWORD"));

    // Check for successful login
    cy.get("@form").should("not.exist");
  });
});
