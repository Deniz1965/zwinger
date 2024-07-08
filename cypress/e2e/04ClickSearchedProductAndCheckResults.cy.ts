import { commonSetupBefore } from '../commonSetupBefore';
import { commonSetupBeforeCookies } from '../commonSetupBeforeCookies';

describe('Click on the searched product and check the result ', () => {
  commonSetupBefore();
  commonSetupBeforeCookies();

  const SEARCH_ITEM_WITH_ONE_CATEGORY = 'variation';

  it("Search item which has only one category", () => {

    cy.get('.search-form-field').click().type(SEARCH_ITEM_WITH_ONE_CATEGORY);
    cy.wait(2000);
    cy.xpath(`//*[@class=\"search-form-suggestions"]`).should('exist').should('be.visible').click()
    cy.wait(4000);
    cy.get('.navigation-active').should('have.text', "prerelease");
       
    const expectedUrl = 'https://zwinger.pm.epages.com/p/variation';
    cy.url().then(currentUrl => {

      //const expectedUrl = 'https://zwinger.pm.epages.com/p/variation';
      if (currentUrl === expectedUrl) {
        cy.log('The opened page is the expected page.');
      } else {
        cy.log('The opened page is not the expected page.');
      }

      if (cy.get('.product-info-title').should('contain.text', SEARCH_ITEM_WITH_ONE_CATEGORY)) {
        cy.log("correct")
      } else {
        cy.log("wrong");
      }
    });
  });
})
