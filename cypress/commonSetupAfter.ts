
export const commonSetupAfter = () => {

    afterEach(() => {
        cy.get('.search-form-field').clear().should('have.value', '');
    });

  };
  