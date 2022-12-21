import * as React from "react";
import Introduction from "../../../src/components/home/Introduction";

describe("Introduction.cy.tsx", () => {
  it("Should render properly", () => {
    cy.mount(<Introduction />);
    cy.get('[data-test-id="pensionTitle"]').should(
      "have.text",
      "Hvornår vil du gå på pension?"
    );
  });
});
