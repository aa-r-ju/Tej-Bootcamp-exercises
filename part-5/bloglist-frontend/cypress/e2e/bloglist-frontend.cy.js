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
    cy.get("#login-btn").click();
    cy.contains("Cypress Testing logged in");
  });

  it("fails with wrong credentials", function () {
    cy.contains("Login").click();
    cy.get("#username").type("Cypress");
    cy.get("#password").type("wrong-password");
    cy.get("#login-btn").click();
    cy.get(".errormessage").should("contain", "wrong username or password")
    cy.get('.errormessage').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get(".errormessage").should("have.css", "border-style", "solid");
  });
});


describe("When logged in", function () {
  beforeEach(function () {
    cy.contains("Login").click();
    cy.get("#username").type("Cypress");
    cy.get("#password").type("hello123");
    cy.contains("login").click();
  });

  it("A blog can be created", function () {
    cy.contains("new note").click();
    cy.get("#title").type("Title added by cypress test");
    cy.get("#author").type("Cypress In-built Tester");
    cy.get("#url").type("https://testingurl.com.np");
    cy.get("#form").click();
    cy.contains("Title added by cypress test");
    cy.contains("Cypress In-built Tester");
    cy.get(".notification").should("have.css", "color", "rgb(0, 128, 0)");
    cy.get(".notification").should("have.css", "border-style", "solid");
  });
});
})