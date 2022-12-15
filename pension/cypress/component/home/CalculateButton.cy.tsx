import * as React from "react";
import CalculateButton from "../../../src/components/home/CalculateButton";

describe("CalculateButton.cy.tsx", () => {
  it("Should render properly", () => {
    cy.mount(<CalculateButton />);
    cy.get("button").should("contains.text", "Beregn");
  });
});
