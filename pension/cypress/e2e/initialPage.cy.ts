import cypress from "cypress";

describe("Initial loading of webpage", () => {
  beforeEach(() => {
    cy.visit("");
  });
  it("should load", () => {
    cy.visit("");
  });

  it("should have the correct title", () => {
    cy.get('[data-test-id="pensionTitle"]').should(
      "have.text",
      "Hvornår kan du gå på pension?"
    );
  });
  it("should have the correct input labels", () => {
    cy.get('[data-test-id="name"]').should("have.text", "Navn");
    cy.get('[data-test-id="age"]').should("have.text", "Alder");
    cy.get('[data-test-id="salary"]').should(
      "have.text",
      "Løn før skat pr. måned"
    );
    cy.get('[data-test-id="pensionSaving"]').should(
      "have.text",
      "Samlet pensionsopsparing"
    );
    cy.get('[data-test-id="pensionPayment"]').should(
      "have.text",
      "Pensionsindbetaling pr. måned"
    );
  });
  it("should load the input fields", () => {
    cy.get('[data-test-id-input="name"]').should("be.visible");
    cy.get('[data-test-id-input="age"]').should("be.visible");
    cy.get('[data-test-id-input="salary"]').should("be.visible");
    cy.get('[data-test-id-input="pensionSaving"]').should("be.visible");
    cy.get('[data-test-id-input="pensionPayment"]').should("be.visible");
  });
  it("button should be disabled by default", () => {
    cy.get('[data-test-id="calculateButton"]').should("be.disabled");
  });
});

describe("Simulating user typing valid inputs and clicking button", () => {
  it("should load", () => {
    cy.visit("");
  });
  it("should type inputs and button should be enabled", () => {
    cy.visit("");

    cy.get('[data-test-id-input="name"]')
      .type("TestUser")
      .should("have.value", "TestUser");
    cy.get('[data-test-id-input="age"]').type("35").should("have.value", "35");
    cy.get('[data-test-id-input="salary"]')
      .type("35000")
      .should("have.value", "35.000");
    cy.get('[data-test-id-input="pensionSaving"]')
      .type("250000")
      .should("have.value", "250.000");
    cy.get('[data-test-id-input="pensionPayment"]')
      .type("4000")
      .should("have.value", "4.000");
    cy.get('[data-test-id="calculateButton"]').should("be.enabled");
    cy.get('[data-test-id="calculateButton"]').click()
    cy.url().should("match",/pension/)
  });
});

describe("Simulating the user typing invalid inputs", () => {
  it("should load", () => {
    cy.visit("");
  });

  it("typing invalid inputs", () => {
    cy.visit("");
    cy.get('[data-test-id-input="name"]')
      .type(
        "TestUserTeTestUserTeTestUserTeTestUserTeTestUserTeTestUserTeTestUserTeTestUserTeTestUserTeTestUserTes"
      )
      .blur()
      .get('[data-test-id-error="name"]')
      .should("have.text", " Maximalt 100 karakterer ");
    cy.get('[data-test-id-input="age"]')
      .type("101")
      .blur()
      .get('[data-test-id-error="age"]')
      .should("have.text", " Værdi skal være mellem 18 og 100 år ");
    cy.get('[data-test-id-input="salary"]')
      .type("10000001")
      .blur()
      .get('[data-test-id-error="salary"]')
      .should("have.text", " Max 1.000.000 kr. ");
    cy.get('[data-test-id-input="pensionSaving"]')
      .type("10000001")
      .blur()
      .get('[data-test-id-error="pensionSaving"]')
      .should("have.text", " Max 10.000.000 kr. ");
    cy.get('[data-test-id-input="pensionPayment"]')
      .type("1000001")
      .blur()
      .get('[data-test-id-error="pensionPayment"]')
      .should("have.text", " Max 1.000.000 kr. ");
    cy.get('[data-test-id="calculateButton"]').should("be.disabled");
  });
});

describe("Simulating the user not typing inputs", () => {
  it("should load", () => {
    cy.visit("");
  });

  it("typing no inputs", () => {
    cy.visit("");
    cy.get('[data-test-id-input="name"]')
      .click()
      .blur()
      .get('[data-test-id-error="name"]')
      .should("have.text", " Påkrævet felt ");
    cy.get('[data-test-id-input="age"]')
      .click()
      .blur()
      .get('[data-test-id-error="age"]')
      .should("have.text", " Påkrævet felt ");
    cy.get('[data-test-id-input="salary"]')
      .click()
      .blur()
      .get('[data-test-id-error="salary"]')
      .should("have.text", " Påkrævet felt ");
    cy.get('[data-test-id-input="pensionSaving"]')
      .click()
      .blur()
      .get('[data-test-id-error="pensionSaving"]')
      .should("have.text", " Påkrævet felt ");
    cy.get('[data-test-id-input="pensionPayment"]')
      .click()
      .blur()
      .get('[data-test-id-error="pensionPayment"]')
      .should("have.text", " Påkrævet felt ");
    cy.get('[data-test-id="calculateButton"]').should("be.disabled");
  });

  describe("User types in a pension payment that is more than 80% of their salary", () => {
    it("typing userinfo", () => {
      cy.visit("");
      cy.get('[data-test-id-input="salary"]').type("20000");
      cy.get('[data-test-id-input="pensionPayment"]').type("18000");
      cy.get('[data-test-id="calculateButtonErrorMessage"]').should(
        "have.text",
        "Det er ikke muligt at indbetale mere end 80% af sin løn til pension. Check venligst dine oplysningerne igen. "
      );
    });
  });
});

export {};
