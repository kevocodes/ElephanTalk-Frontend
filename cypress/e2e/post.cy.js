/// <reference types="Cypress" />
/// <reference types="../support" />

describe("Post creation", () => {
  it("Logged users can create a post", () => {
    // Login with valid user info
    cy.login(Cypress.env("AUTH_USER"), Cypress.env("AUTH_PASSWORD"));

    // Go to the new post page
    cy.get('[data-testid="create"]')
      .filter(":visible")
      .click();

    // Should be on a new url which includes '/create'
    cy.url().should("include", "/create");

    cy.get('[data-testid="create-form"]').as("form");

    // Fill out the form with empty info
    cy.get("@form").find('button[type="submit"]').click();
    cy.get("@form").contains(/Image URL is required/i);
    cy.get("@form").contains(/Description is required/i);

    // Fill out the form with invalid info
    cy.get("@form").find('input[name="image"]').type("invalid url");
    cy.get("@form").find('textarea[name="description"]').type("short");
    cy.get("@form").find('button[type="submit"]').click();

    // Validate the errors are displayed
    cy.get("@form").contains(/Please enter a valid image URL/i);
    cy.get("@form").contains(/Description must be at least 8 characters/i);

    const validDescription = `Testing description at ${Date.now().toString()}`;

    // Fill out the form with valid info
    cy.get("@form")
      .find('input[name="image"]')
      .clear()
      .type("https://picsum.photos/200/300");

    cy.get("@form")
      .find('textarea[name="description"]')
      .clear()
      .type(validDescription);
    
    // Validate the errors are not displayed
    cy.get("@form").should("not.contain", /Please enter a valid image URL/i);

    cy.get("@form").should(
      "not.contain",
      /Description must be at least 8 characters/i
    );

    cy.get("@form").find('button[type="submit"]').click();

    // Get the recently created post from the user
    cy.get('[data-testid="post"]')
      .filter(`:contains(${validDescription})`)
      .as("post");

    // Delete the post
    cy.get("@post")
      .find('[data-testid="options-button"]')
      .should("be.visible")
      .click();

    cy.get('[data-testid="options-menu"]')
      .should("be.visible")
      .find('[data-testid="delete-button"]')
      .should("be.visible")
      .click();

    cy.get('[data-testid="confirmation-modal"]')
      .should("be.visible")
      .find('[data-testid="action-button"]')
      .should("include", /delete/i)
      .click()

    // Verify if the post was deleted
    cy.get('@post')
      .should('not.exist');
  });
});
