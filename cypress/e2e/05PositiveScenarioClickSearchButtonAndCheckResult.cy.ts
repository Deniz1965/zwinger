import { commonSetupBeforeVisitPage } from "../commonSetupBeforeVisitPage";
import { commonSetupBeforeCookies } from "../commonSetupBeforeCookies";
describe("Positive Scenarios: Click the Search button and check the result ", () => {
  commonSetupBeforeVisitPage();
  commonSetupBeforeCookies();

  const SEARCH_PREFIX_BA = "ba";
  const SEARCH_TEXT_OO = "oo";
  const SEARCH_TEXT_NAVY_BOOTS = "[Example] Navy Boots 1";
  const SEARCH_INTEGER_11 = 11;
  const SEARCH_CAPITAL_BO = "BO";
  
  it("search first 2 chars:", () => {
    cy.get('.search-form-field').type(SEARCH_PREFIX_BA);
    cy.xpath(`//button[@type='submit']`).click();
    cy.wait(4000);
    const expectedURL= "https://zwinger.pm.epages.com/search?q="+SEARCH_PREFIX_BA;
    cy.url().then((currentURL) => {
      if(currentURL === expectedURL){
        cy.log("opened page is correct");
      }
    })
      cy.get('.product-list.grid-col-m').each(($el) => {
        const text= $el.text();
        if(text.includes(SEARCH_PREFIX_BA)){
          cy.log("found");
        }
      })
    })

    it("search 2 or more adj characers", () => {
    cy.get('.search-form-field').type(SEARCH_TEXT_OO);
    cy.xpath(`//button[@type='submit']`).click();
    cy.wait(4000);
    cy.get('.product-list').each(($el) => {
      const text= $el.text();
      if(text.includes(SEARCH_TEXT_OO)){
        cy.log("found");
      }
      else{
        cy.log("not found");
      }
     })
  })
  it("search enter the whole name of product:", () => {
    cy.get('.search-form-field').type(SEARCH_TEXT_NAVY_BOOTS);
    cy.xpath(`//button[@type='submit']`).click();
    cy.wait(4000);
    cy.get(".product-list").each(($el) => {
      const text = $el.text();
      if (expect(text).to.eql(SEARCH_TEXT_NAVY_BOOTS)) {
        cy.log("Founded product/s:", text);
        cy.log("Items are matching with the expected ones");
      } else {
        cy.log("they are not matching");
      }
    });
  })
  it("Search a number in the search field:", () => {
    cy.get(".search-form-field").type(SEARCH_INTEGER_11.toString());
    cy.wait(1000);
    cy.get(".search-form-icon.search-form-submit").click();
    cy.wait(2000);
    cy.get(".product-list").each(($el) => {
      const text = $el.text();
      if (expect(text).to.include(SEARCH_INTEGER_11)) {
        cy.log("Founded product/s:", text);
        cy.log("Items are matching with the expected ones");
      } else {
        cy.log("they are not matching");
      }
    });
  });

  it("search the existing product name in capital letter:", () => {
    cy.get(".search-form-field").click().type(SEARCH_CAPITAL_BO);
    cy.wait(1000);
    cy.get(".search-form-icon.search-form-submit").click();
    cy.wait(2000);
    cy.get(".product-list").each(($el) => {
      const text = $el.text().toLowerCase();
      if(text.includes(SEARCH_CAPITAL_BO.toLowerCase())) {
        cy.log("Founded product/s:", text);
        cy.log("Items are matching with the expected ones");
      } else {
        cy.log("they are not matching");
      }
    });
  });
})



