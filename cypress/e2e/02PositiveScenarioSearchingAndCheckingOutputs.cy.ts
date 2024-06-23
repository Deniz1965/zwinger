import { commonSetupBefore } from "../commonSetupBefore";
import { commonSetupAfter } from "../commonSetupAfter";
import { commonSetupBeforeCookies } from "../commonSetupBeforeCookies";

describe("Positive Scenarios: Entering a value into the search field and checking the outputs ", () => {
  commonSetupBefore();
  commonSetupAfter();
  commonSetupBeforeCookies();

  const SEARCH_PREFIX_BA = "ba";

  const SEARCH_TEXT_OO = "oo";

  const SEARCH_TEXT_NAVY_BOOTS = "[Example] Navy Boots 1";

  const SEARCH_INTEGER_11 = 11;

  const SEARCH_CAPITAL_BO = "BO";

  const SEARCH_BADGE_POSITIVE = "badge_positive";

  it("search first 2 chars:", () => {
    cy.get(".search-form-field").click().type(SEARCH_PREFIX_BA);
    cy.wait(1000);
    cy.xpath(`//div[@class='header-search']`).each(($el) => {
      const text = $el.text();
      expect(text).to.include(SEARCH_PREFIX_BA);
      cy.log("Founded product/s:", text);
    });
  });

  it("search two or more adjacent characters:", () => {
    cy.get(".search-form-field").click().type(SEARCH_TEXT_OO);
    cy.wait(1000);
    cy.xpath(`//div[@class='header-search']`).each(($el) => {
      const text = $el.text();
      expect(text).to.include(SEARCH_TEXT_OO);
      cy.log("Founded product/s:", text);
    });
  });

  it("search enter the whole name of product:", () => {
    cy.get(".search-form-field").click().type(SEARCH_TEXT_NAVY_BOOTS);
    cy.wait(1000);
    cy.xpath(`//div[@class='header-search']`).each(($el) => {
      const text = $el.text();
      expect(text).to.eql(SEARCH_TEXT_NAVY_BOOTS);
      cy.log("Founded product/s:", text);
    });
  });

  it("Search a number in the search field:", () => {
    cy.get(".search-form-field").click().type(SEARCH_INTEGER_11.toString());
    cy.wait(1000);
    cy.xpath(`//div[@class='header-search']`).each(($el) => {
      const text = $el.text();
      expect(text).to.include(SEARCH_INTEGER_11);
      cy.log("Founded product/s:", text);
    });
  });

  it("search the existing product name in capital letter:", () => {
    cy.get(".search-form-field").click().type(SEARCH_CAPITAL_BO);
    cy.wait(1000);
    cy.xpath(`//div[@class='header-search']`).each(($el) => {
      const text = $el.text();
      expect(text.toLowerCase()).to.contains(SEARCH_CAPITAL_BO.toLowerCase());
      cy.log("Founded product/s:", text);
    });
  });

  it("Enter a product name which is not exist on the current tab:", () => {
    cy.get(".search-form-field").click().type(SEARCH_BADGE_POSITIVE);
    cy.wait(1000);
    cy.xpath(`//div[@class='header-search']`).each(($el) => {
      const text = $el.text();
      expect(text).to.include(SEARCH_BADGE_POSITIVE);
      cy.log("Founded product/s:", text);
    });
  });
});
