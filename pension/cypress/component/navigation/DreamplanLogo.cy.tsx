import * as React from "react";
import DreamplanLogo from "../../../src/components/navigation/DreamplanLogo";

describe("DreamplanLogo.cy.tsx", () => {
  it("Should render properly", () => {
    cy.mount(<DreamplanLogo />);

    //Checking all the attributes on the logo
    cy.get('[data-test-id="dreamplanLogo"]').should("have.attr", "height", 56);
    cy.get('[data-test-id="dreamplanLogo"]').should("have.attr", "width", 60);
    cy.get('[data-test-id="dreamplanLogo"]').should(
      "have.attr",
      "viewBox",
      "0 0 60 56"
    );
    cy.get('[data-test-id="dreamplanLogo"]').should(
      "have.attr",
      "fill",
      "none"
    );
    cy.get('[data-test-id="dreamplanLogo"]').should(
      "have.attr",
      "xmlns",
      "http://www.w3.org/2000/svg"
    );

    //Checking that the logo has correct amount of children
    cy.get('[data-test-id="dreamplanLogo"]')
      .children()
      .should("have.length", 12);
  });
});
