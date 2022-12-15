import * as React from "react";
import { ErrorField } from "../../../src/components/home/ErrorField";

describe("ErrorField.cy.tsx", () => {
  it("Should render properly", () => {
    cy.mount(<ErrorField key={"TestError"} value={"This is a test error"} />);
    cy.get("div").should("contains.text", "This is a test error");
  });
});
