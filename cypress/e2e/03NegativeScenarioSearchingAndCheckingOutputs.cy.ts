import { commonSetupBefore } from "../commonSetupBefore";
import { commonSetupAfter } from "../commonSetupAfter";
import { commonSetupBeforeCookies } from "../commonSetupBeforeCookies";

describe("Negative Scenarios: Entering a value into the search field and checking the outputs ", () => {
  commonSetupBefore();
  commonSetupAfter();
  commonSetupBeforeCookies();

  const SEARCH_ONE_CHAR = "a";
  const SEARCH_SPACES = "   ";
  const SEARCH_SPACES_BEFORE_CHAR = "     oo";
  const SEARCH_SPACES_AFTER_CHAR = "oo      ";
  const SEARCH_NOTEXIST_ITEM = "bv";
  const SEARCH_SPECIAL_CHAR = "-------";

  it("search only one char:", () => {
    cy.get(".search-form-field").click().type(SEARCH_ONE_CHAR);
    cy.xpath(`//div[@class='search-form-suggestions']`).should("not.exist");
  });

  it("search a space:", () => {
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.get(".search-form-field").click().type(SEARCH_SPACES);
    cy.wait(1000);
    cy.xpath(`//div[@class='search-form-suggestions']`).should("not.exist");
  });

  it("search the product name/chars which has spaces at the begining of the word:", () => {
    cy.get(".search-form-field").click().type(SEARCH_SPACES_BEFORE_CHAR);
    cy.wait(1000);
    cy.xpath(`//div[@class='header-search']`).each(($el) => {
      const text = $el.text();
      expect(text).to.include(SEARCH_SPACES_BEFORE_CHAR);
    });
  });

  it("search the product name/chars which has spaces at the end of the word", () => {
    cy.get(".search-form-field").click().type(SEARCH_SPACES_AFTER_CHAR);
    cy.wait(1000);
    cy.xpath(`//div[@class='header-search']`).each(($el) => {
      const text = $el.text();
      expect(text).to.include(SEARCH_SPACES_AFTER_CHAR);
    });
  });

  it("search not existing characters(at least 2):", () => {
    cy.get(".search-form-field").click().type(SEARCH_NOTEXIST_ITEM);
    cy.wait(1000);
    cy.xpath(`//div[@class='search-form-suggestions']`).should("not.exist");
  });

  it("search special character", () => {
    cy.get(".search-form-field").click().type(SEARCH_SPECIAL_CHAR);
    cy.wait(1000);
    cy.get('.search-form-suggestions').each(($el) => {
      const text = $el.text();
      expect(text).to.include(SEARCH_SPECIAL_CHAR);
    });
  });
})
