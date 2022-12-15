import * as React from "react";
import InputMapper from "../../../src/components/home/InputMapper";

const testData = [
  {
    name: "test user 1",
    type: "text",
    placeholder: "test placeholder 1",
    labelname: "test label 1",
  },
  {
    name: "test user 2",
    type: "number",
    placeholder: "test placeholder 2",
    labelname: "test label 2",
  },
  {
    name: "test user 3",
    type: "currency",
    placeholder: "test placeholder 3",
    labelname: "test label 3",
  },
];
describe("InputMapper.cy.tsx", () => {
  it("Should render properly", () => {
    cy.mount(<InputMapper data={testData} />);

    //checking placeholders
    cy.get("input:first").should(
      "have.attr",
      "placeholder",
      "test placeholder 1"
    );
    cy.get("input")
      .eq(1)
      .should("have.attr", "placeholder", "test placeholder 2");
    cy.get("input:last").should(
      "have.attr",
      "placeholder",
      "test placeholder 3"
    );

    //Checking labels
    cy.get('[data-test-id="test user 1"]').should(
      "contains.text",
      "test label 1"
    );
    cy.get('[data-test-id="test user 2"]').should(
      "contains.text",
      "test label 2"
    );
    cy.get('[data-test-id="test user 3"]').should(
      "contains.text",
      "test label 3"
    );

    //checking types
    cy.get("input").eq(0).should("have.attr", "type", "text");
    cy.get("input").eq(1).should("have.attr", "type", "number");
    cy.get("input").eq(2).should("have.attr", "type", "currency");
  });
});
