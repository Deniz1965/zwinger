
export const commonSetupBeforeCookies = () => {

    beforeEach(() => {
        cy.get('.cc-dialog-button-accept').should('be.visible').click();
    });

  };
  