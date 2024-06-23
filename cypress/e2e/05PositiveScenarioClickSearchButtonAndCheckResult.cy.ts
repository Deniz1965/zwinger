import { commonSetupBefore } from "../commonSetupBefore";
import { commonSetupBeforeCookies } from "../commonSetupBeforeCookies";

describe("Positive Scenarios: Click the Search button and check the result ", () => {
  commonSetupBefore();
  commonSetupBeforeCookies();

  const SEARCH_PREFIX_BA = "ba";
  const SEARCH_TEXT_OO = "oo";
  const SEARCH_TEXT_NAVY_BOOTS = "[Example] Navy Boots 1";
  const SEARCH_INTEGER_11 = 11;
  const SEARCH_CAPITAL_BO = "BO";

  it("search first 2 chars:", () => {
    cy.get(".search-form-field").click().type(SEARCH_PREFIX_BA);
    cy.wait(1000);
    cy.get(".search-form-icon.search-form-submit").click();
    cy.wait(2000);

    const expectedUrl = "https://zwinger.pm.epages.com/search?q=ba";
    cy.url().then((currentUrl) => {
      const expectedUrl = "https://zwinger.pm.epages.com/search?q=ba";
      if (currentUrl === expectedUrl) {
        cy.log("The opened page is the expected page.");
      } else {
        cy.log("The opened page is not the expected page.");
      }
    });

    cy.get(".product-list").each(($el) => {
      const text = $el.text();
      if (expect(text).to.include(SEARCH_PREFIX_BA)) {
        cy.log("Founded product/s:", text);
        cy.log("Items are matching with the expected ones");
      } else {
        cy.log("they are not matching");
      }
    });
  });
  it("search two or more adjacent characters:", () => {
    cy.get(".search-form-field").click().type(SEARCH_TEXT_OO);
    cy.wait(1000);
    cy.get(".search-form-icon.search-form-submit").click();
    cy.wait(2000);
    cy.get(".product-list").each(($el) => {
      const text = $el.text();
      if (expect(text).to.include(SEARCH_TEXT_OO)) {
        cy.log("Founded product/s:", text);
        cy.log("Items are matching with the expected ones");
      } else {
        cy.log("they are not matching");
      }
    });
  });

  it("search enter the whole name of product:", () => {
    cy.get(".search-form-field").click().type(SEARCH_TEXT_NAVY_BOOTS);
    cy.wait(1000);
    cy.get(".search-form-icon.search-form-submit").click();
    cy.wait(2000);
    cy.get(".product-list").each(($el) => {
      const text = $el.text();
      if (expect(text).to.eql(SEARCH_TEXT_NAVY_BOOTS)) {
        cy.log("Founded product/s:", text);
        cy.log("Items are matching with the expected ones");
      } else {
        cy.log("they are not matching");
      }
    });
  });

  it("Search a number in the search field:", () => {
    cy.get(".search-form-field").click().type(SEARCH_INTEGER_11.toString());
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
      const text = $el.text();
      if (expect(text.toLowerCase).to.eql(SEARCH_CAPITAL_BO.toLowerCase)) {
        cy.log("Founded product/s:", text);
        cy.log("Items are matching with the expected ones");
      } else {
        cy.log("they are not matching");
      }
    });
  });
});
