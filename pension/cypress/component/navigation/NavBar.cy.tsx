import * as React from "react";
import NavBar from "../../../src/components/navigation/NavBar";

describe("NavBar.cy.tsx", () => {
  it("Should render properly", () => {
    cy.mount(<NavBar username={"test user"} />);

    //Chekcing that all the elements are rendered
    cy.get('[data-test-id="DPlogoButton"]').should("be.visible");
    cy.get('[data-test-id="username"]').should("have.text", "test user");
    cy.get('[data-test-id="userLogo"]').should("be.visible");
  });
});
