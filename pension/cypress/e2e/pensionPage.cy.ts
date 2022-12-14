import cypress from "cypress";

describe("Simulating user typing valid inputs and clicking button", () => {
  it("should load", () => {
    cy.visit("");
  });
  it("should load all the elements on pension page correctly", () => {
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
    cy.get('[data-test-id="calculateButton"]').click();
    cy.url().should("match", /pension/);
    cy.visit("/pension/");

    //PensionIntroduction
    cy.get('[data-test-id="pensionPageTitle"]').should("have.text", "Pension");
    cy.get('[data-test-id="pensionPageText"]').should(
      "have.text",
      "Her kan du se konsekvenserne af at ændre din pensionsalder:"
    );

    //PensionInputAge
    cy.get('[data-test-id="publicPensionAge"]').should(
      "have.text",
      "Folkepensions-alder"
    );
    cy.get('[data-test-id="wantedPensionAge"]').should(
      "have.text",
      "Ønsket Pensionsalder"
    );
    cy.get('[data-test-id-input="publicPensionAge"]').should("be.visible");
    cy.get('[data-test-id-input="wantedPensionAge"]').should("be.visible");
    cy.get('[data-test-id-input="publicPensionAge"]').should(
      "have.value",
      "72"
    );
    cy.get('[data-test-id-input="wantedPensionAge"]').should("have.value", "0");
    cy.get('[data-test-id="publicPensionYear"]').should(
      "have.length.greaterThan",
      0
    );
    cy.get('[data-test-id="wantedPensionYear"]').should(
      "have.length.greaterThan",
      0
    );

    //PensionOverview
    cy.get('[data-test-id="arrowUp"]').should("be.visible");
    cy.get('[data-test-id="arrowDown"]').should("be.visible");
    cy.get('[data-test-id="pensionPaymentIn"]').should(
      "have.text",
      "Indbetaling"
    );
    cy.get('[data-test-id="pensionPaymentOut"]').should(
      "have.text",
      "Udbetaling"
    );
    cy.get('[data-test-id-input="inputPaymentIn"]').should(
      "have.value",
      "4.000"
    );
    cy.get('[data-test-id="pensionPaymentInText"]').should(
      "have.text",
      "4.000 kr. før skat"
    );
    cy.get('[data-test-id="pensionPaymentOutText"]').should(
      "have.text",
      " kr. før skat"
    );
    cy.get('[data-test-id="lockClosedPaymentIn"]').should("be.visible");
    cy.get('[data-test-id="lockClosedPaymentOut"]').should("be.visible");

    //PensionDiagram
    cy.get('[data-test-id="pensionPaymentPercentIn"]').should("be.visible");
    cy.get('[data-test-id="pensionPaymentPercentOut"]').should("be.visible");

    //PensionBottom
    cy.get('[data-test-id="paymentPercent"]').should(
      "have.text",
      "Procent af din løn"
    );
    cy.get('[data-test-id="paymentPercentOutText"]').should(
      "have.text",
      "Din pensionsudbetaling er svarende til % af din løn på pensionstidspunktet"
    );

    //PensionButton
    cy.get('[data-test-id="calendlyButton"]').should("be.disabled");
    cy.get('[data-test-id="buttonText"]').should(
      "have.text",
      "Eller prøvDreamplan"
    );
  });
});

describe("Simulating the user making inputs that are invalid", () => {
  it("should load", () => {
    cy.visit("");
  });
  it("should load all the elements on pension page correctly", () => {
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
    cy.get('[data-test-id="calculateButton"]').click();
    cy.url().should("match", /pension/);
    cy.visit("/pension/");

    //AgeCheckError
    cy.get('[data-test-id-input="wantedPensionAge"]')
      .clear()
      .type("10")
      .blur()
      .get('[data-test-id="wantedPensionAgeError2"]')
      .should("have.text", "Skal være højere end din alder");
    cy.get('[data-test-id="AgeCheckError"]').should(
      "have.text",
      "Det er ikke muligt at sætte din ønsket pensionalder lavere end din alder. Check venligst dine oplysninger igen."
    );
    //Age too high and low error message
    cy.get('[data-test-id-input="wantedPensionAge"]')
      .clear()
      .type("100")
      .blur()
      .get('[data-test-id="wantedPensionAgeError"]')
      .should("have.text", " Mellem 60 og 87 år ");
    cy.get('[data-test-id-input="wantedPensionAge"]')
      .clear()
      .type("65")
      .blur()
      .get('[data-test-id="wantedPensionAgeError"]')
      .should("have.text", " Min 66 år ");
    cy.get('[data-test-id="calendlyButton"]').should("be.disabled");

    //PensionPaymentIn error
    cy.get('[data-test-id-input="wantedPensionAge"]').clear().type("70").blur();
    cy.get('[data-test-id-input="inputPaymentIn"]').clear().type("0").blur();
    cy.get('[data-test-id="inputPaymentInError"]').should(
      "have.text",
      " Feltet skal have en værdi højere end 0 kr. "
    );
    cy.get('[data-test-id-input="inputPaymentIn"]')
      .clear()
      .type("100000")
      .blur();
    cy.get('[data-test-id="EightyPercentError"]').should(
      "have.text",
      "Det er ikke muligt at indbetale mere end 80% af sin løn til pension. Check venligst dine oplysninger igen."
    );
    
  });
});
export {};
