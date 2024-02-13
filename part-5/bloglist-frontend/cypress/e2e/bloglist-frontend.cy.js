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
    cy.supportLogin({ username: "Cypress", password: "hello123" });
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
    cy.supportLogin({ username: "Cypress", password: "hello123" });
  });

  const supportcreateBlog = (blogData) => {
    cy.contains("new note").click();
    cy.get("#title").type(blogData.title);
    cy.get("#author").type(blogData.author);
    cy.get("#url").type(blogData.url);
    cy.get("#create").click();
    cy.get(".notification").should("have.css", "color", "rgb(0, 128, 0)");
    cy.get(".notification").should("have.css", "border-style", "solid");
    cy.contains("cancel").click();
  };

  it("A blog can be created", function () {
    const newBlog = {
      title: "Title added by cypress test",
      author: "Cypress In- built Tester",
      url: "https://testingurl.com.np",
    };
    supportcreateBlog(newBlog);
  });


  it("User can Like a blog", function () {
const newBlog = {
        title: "test for sorting acc to likes",
        author: "Sharmila",
        url: "http://sort.com",
      };
      supportcreateBlog(newBlog);
    cy.contains("view").click();
    cy.contains("0");
    cy.get("#likes").click();
    cy.contains("1");
});


it("User can delete a blog", function () {
  const newBlog = {
    title: "most likes must be at top",
    author: "Cypress Testing",
    url: "http://likes.com",
  };
  supportcreateBlog(newBlog);
  cy.contains("view").click();
  cy.wait(3000);
  cy.get("#remove").click();
  cy.contains(".notification", "Blog deleted successfully!", {
    matchCase: false,
  });
  cy.get(".notification").should("have.css", "color", "rgb(0, 128, 0)");
  cy.get(".notification").should("have.css", "border-style", "solid");
});

it("Remove button is visible only to the creator", function () {
  const newBlog = {
    title: "Title added by cypress test",
    author: "Cypress In- built Tester",
    url: "https://testingurl.com.np",
  };
  supportcreateBlog(newBlog);
  cy.contains("logout").click();
  const user2 = {
    name: "Another User",
    username: "anotheruser",
    password: "2468",
  };
  cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2);
  cy.contains("Login").click();
  cy.get("#username").type("anotheruser");
  cy.get("#password").type("2468");
  cy.contains("login").click();

  cy.contains("view").click();
  cy.get("#remove").should("not.exist");
});

describe(" blogs are ordered according to likes with the blog", function () {
  beforeEach(function () {
    const blog1 = {
      title: "test for sorting acc to likes",
      author: "Aarju3",
      url: "http://sort.com",
      likes: 1,
    };
    const blog2 = {
      title: "most likes must be at top",
      author: "Aarju",
      url: "http://likes.com",
    };
    const blog3 = {
      title: "last test of exercise",
      author: "Aarju1",
      url: "http://logs.com",
    };
    supportcreateBlog(blog1);
    supportcreateBlog(blog2);
    supportcreateBlog(blog3);
  });

  it("highest like blog at top", function () {
    cy.get(".view").eq(1).click();
    cy.get(".likes").click();
    cy.wait(400);
    cy.get(".likes").click();
    cy.wait(400);
    cy.get(".likes").click();
    cy.wait(400);
    cy.contains("hide").click();

    cy.get(".blog-div")
      .eq(0)
      .should("contain", "most likes must be at top Aarju");
  });
});
})
})