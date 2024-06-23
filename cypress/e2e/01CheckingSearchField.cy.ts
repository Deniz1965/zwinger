import { commonSetupBefore } from '../commonSetupBefore';
import { commonSetupBeforeCookies } from '../commonSetupBeforeCookies';

describe('Accept the cookies - Checking the Search field ', () => {
  commonSetupBefore();
  commonSetupBeforeCookies();
  it("Check the Search button existency", () => {
    cy.wait(2000);
    cy.get('.header-search').should('be.visible');
    cy.log("Search field is found");
  });
})



