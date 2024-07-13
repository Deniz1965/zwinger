import { commonSetupBeforeVisitPage } from '../commonSetupBeforeVisitPage';
import { commonSetupBeforeCookies } from '../commonSetupBeforeCookies';

describe('Checking the Search Field', () => {
  commonSetupBeforeVisitPage();
  commonSetupBeforeCookies();
  it('check the search button', () => {
    cy.wait(1000);
    if (cy.get('.header-search').should('be.visible')){
      cy.log('search button is visible');
    };
  })
})

