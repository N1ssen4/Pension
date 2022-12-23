import * as React from "react";
import PensureData from "../../../src/components/pensure/pensureData";

describe("PensureData.cy.tsx", () => {
  it("Should render properly", () => {
    cy.mount(<PensureData />);
    cy.get('[data-test-id="pensureDataTitle"]').should("exist");
    cy.get('[data-test-id="pensureDataTitle"]').should(
      "have.text",
      "Samlet pensionsindsamling:"
    );
    cy.get('[data-test-id="pensureDataSubtext"]').should("exist");
    cy.get('[data-test-id="pensureDataSubtext"]').should(
      "have.text",
      "Har vi fundet de rigtige oplysninger? Du kan rette dine oplysninger på næste side hvis der er eventuelle fejl."
    );
    cy.get('[data-test-id="pensureDataButtonWrapper"]').should("have.attr", "href","/");
    cy.get('[data-test-id="pensureDataButton"]').should("have.text", "Gå videre");
    cy.get('[data-test-id="pensureDataButton"]').should("be.enabled");
  });
  it("Should not have any pensure data", () => {
    cy.mount(<PensureData />);
    cy.get('[data-test-id="pensureLoading"]').should("exist");
    cy.get('[data-test-id="pensureLoading"]').should(
      "have.text",
      "Loading..."
    );
  });

});
