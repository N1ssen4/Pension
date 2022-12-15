import * as React from "react";
import Input from "../../../src/components/home/Input";

describe("Input.cy.tsx", () => {
  it("Should render properly", () => {
    cy.mount(
      <Input
        type={"text"}
        name={"test user"}
        labelname={"test user"}
        placeholder={"test placeholder"}
      />
    );
    cy.get('[data-test-id="test user"]').should("have.text", "test user");
    cy.get('[data-test-id-input="test user"]').should(
      "contains.attr",
      "placeholder",
      "test placeholder"
    );
  });
});
