import { commonSetupBeforeVisitPage } from "../commonSetupBeforeVisitPage"
import { commonSetupAfter } from "../commonSetupAfter";
import { commonSetupBeforeCookies } from "../commonSetupBeforeCookies";

describe("Positive and Negative Scenarios: Entering a value into the search field and checking the outputs ", () => {
  commonSetupBeforeVisitPage();
  commonSetupAfter();
  commonSetupBeforeCookies();

  const SEARCH_PREFIX_BA = "ba";
  const SEARCH_SPECIAL_CHAR = "---";

  it('enter 2 chars', () => {
    cy.viewport('samsung-s10');
    cy.get('.search-form-field').type(SEARCH_PREFIX_BA);
    cy.get('.search-form-suggestions').should('be.visible').then(() => {
      cy.xpath(`//div[@class='header-search']`).each(($el) => {
        const text = $el.text();
        if (text.includes(SEARCH_PREFIX_BA)) {
        cy.log(text);
        }
        else{
          cy.log('not found');
        }
      })
    })
  });
  it("search special chars(at least 2):", () => {
    cy.viewport('ipad-2');
    cy.get('.search-form-field').type(SEARCH_SPECIAL_CHAR);
    cy.wait(4000);
    cy.get('.search-form-suggestions').should('not.exist');
  });
})
