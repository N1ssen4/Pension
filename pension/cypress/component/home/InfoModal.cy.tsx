import * as React from "react";
import { InfoModal } from "../../../src/components/home/InfoModal";

describe("InfoModal.cy.tsx", () => {
  it("Should render properly", () => {
    cy.mount(
      <InfoModal
        isOpen={true}
        onclose={function (): void {
          throw new Error("Function not implemented.");
        }}
        children={"Test modal"}
      />
    );
    cy.get('[data-test-id="modalText"]').should("contains.text", "Test modal");
  });
  it("should not be visible when isOpen is false", () => {
    cy.mount(
      <InfoModal
        isOpen={false}
        onclose={function (): void {
          throw new Error("Function not implemented.");
        }}
        children={""}
      />
    );
    cy.get('[data-test-id="modalText"]').should("not.exist");
  });
});
