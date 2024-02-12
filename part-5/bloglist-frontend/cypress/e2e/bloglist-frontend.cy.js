describe("Blog app", function () {
  beforeEach(function () {
    // cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: 'Cypress Testing',
      username: 'Cypress',
      password: 'hello123'
    }
    cy.request('POST',  `${Cypress.env("BACKEND")}/users`, user) 
    cy.visit("http://localhost:5173/");

  });

  it("Login form is shown", function () {
    cy.contains("Login").click();
    cy.contains("username");
    cy.contains("password");
  });


describe("Login", function () {
  it("succeeds with correct credentials", function () {
    cy.contains("Login").click();
    cy.get("#username").type("Cypress");
    cy.get("#password").type("hello123");
    cy.contains("login").click();
    cy.contains("Cypress Testing logged in");
  });

  it.only("fails with wrong credentials", function () {
    cy.contains("Login").click();
    cy.get("#username").type("Cypress");
    cy.get("#password").type("wrong-password");
    cy.contains("login").click();
    cy.get(".errormessage").should("contain", "wrong username or password")
    cy.get('.errormessage').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get(".errormessage").should("have.css", "border-style", "solid");
  });
});
})