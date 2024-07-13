import { commonSetupBeforeVisitPage } from '../commonSetupBeforeVisitPage';
import { commonSetupBeforeCookies } from '../commonSetupBeforeCookies';

describe.only ('test suite 1', () => {
  commonSetupBeforeVisitPage();
  commonSetupBeforeCookies();
  it('check the search button', () => {
    cy.wait(1000);
    if (cy.get('.header-search').should('be.visible')){
      cy.log('search button is visible');
    };

  })
})

