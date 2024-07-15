import { commonSetupBeforeVisitPage } from "../commonSetupBeforeVisitPage"
import { commonSetupAfter } from "../commonSetupAfter";
import { commonSetupBeforeCookies } from "../commonSetupBeforeCookies";

describe("Positive Scenarios: Entering a value into the search field and checking the outputs ", () => {
  commonSetupBeforeVisitPage();
  commonSetupBeforeCookies();
  commonSetupAfter();

  const SEARCH_PREFIX_BA = "ba";

  const SEARCH_TEXT_OO = "oo";

  const SEARCH_TEXT_NAVY_BOOTS = "[Example] Navy Boots 1";

  const SEARCH_INTEGER_11 = 11;

  const SEARCH_CAPITAL_BO = "BO";

  const SEARCH_BADGE_POSITIVE = "badge_positive";

  it('enter 2 chars', () => {
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

  it('search 2 or more adj chars', () => {
    cy.get('.search-form-field').type(SEARCH_TEXT_OO);
    cy.get('.search-form-suggestions').should('be.visible').then(() => {
      cy.get('.search-form-suggestions').each(($el) => {
        const text = $el.text();
        if(text.includes(SEARCH_TEXT_OO)){
          cy.log(text)
        }
        else{
          cy.log('not found');
        }
      })
    })
  });

  it("search enter the whole name of product:", () => {
    cy.get(".search-form-field").type(SEARCH_TEXT_NAVY_BOOTS);
    cy.wait(1000);
    cy.xpath(`//div[@class='header-search']`).each(($el) => {
      const text = $el.text();
      expect(text).to.eql(SEARCH_TEXT_NAVY_BOOTS);
      cy.log("Founded product/s:", text);
    });
  });

  it('Search a number in the search field:', () => {
    cy.get('.search-form-field').type(SEARCH_INTEGER_11.toString());
    cy.get('.search-form-suggestions').should('be.visible').then(() => {
     cy.get('.search-form-suggestions').each(($el) => {
       const text = $el.text();
       if(text.includes(SEARCH_INTEGER_11.toString())){
         cy.log(SEARCH_INTEGER_11.toString());
       }
       else{
         cy.log('not exist')
       }
     })
    })
   });
  
   it("search the existing product name in capital letter:", () => {
    cy.get(".search-form-field").type(SEARCH_CAPITAL_BO);
    cy.wait(1000);
    cy.get('.search-form-suggestions').each(($el) => {
      const text = $el.text();
      if(text.includes(SEARCH_CAPITAL_BO.toLowerCase())){
        cy.log("Founded product/s:", text);
      }

    });
  });

  it("Enter a product name which is not exist on the current tab:", () => {
    cy.get(".search-form-field").type(SEARCH_BADGE_POSITIVE);
    cy.get('.search-form-suggestions', {timeout : 4000}).each(($el) => {
      const text = $el.text();
      expect(text).to.include(SEARCH_BADGE_POSITIVE);
      cy.log("Founded product/s:", text);
    });
  });
});
