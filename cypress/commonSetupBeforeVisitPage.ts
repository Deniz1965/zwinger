
export const commonSetupBeforeVisitPage = () => {

    beforeEach(() => {
        cy.visit('https://zwinger.pm.epages.com/');
    });

  };
  