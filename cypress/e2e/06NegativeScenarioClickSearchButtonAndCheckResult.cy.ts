import { commonSetupBeforeVisitPage } from "../commonSetupBeforeVisitPage";
import { commonSetupBeforeCookies } from "../commonSetupBeforeCookies";

describe("Negative Scenarios: Click the Search button and check the result", () => {
  commonSetupBeforeVisitPage();
  commonSetupBeforeCookies();

  const SEARCH_ONE_CHAR = "a";
  const SEARCH_SPACES = "   ";
  const SEARCH_SPACES_BEFORE_CHAR = "     oo";
  const SEARCH_SPACES_AFTER_CHAR = "oo      ";
  const SEARCH_NOTEXIST_ITEM = "bv";
  const SEARCH_SPECIAL_CHAR= "---";

  it("search only one char:", () => {
    cy.get(".search-form-field").type(SEARCH_ONE_CHAR);
    cy.get(".search-form-icon.search-form-submit").click();
    cy.wait(2000);
    const checkAndClickShowMoreButton = () => {
      cy.scrollTo("bottom");

      // Check if the "show-more-button" exists
      cy.get("body").then((body) => {
        if (body.find(".show-more-button").length > 0) {
          cy.get(".show-more-button").should("be.visible").click();
          cy.log('Clicked the "Show more" button.');
          cy.wait(1000);
          // Recursively call the function to check for the button again
          checkAndClickShowMoreButton();
        } 
      });
    };

    checkAndClickShowMoreButton();

    cy.get(".product-list").each(($el) => {
      const text = $el.text();
      if (expect(text).to.include(SEARCH_ONE_CHAR)) {
        cy.log("Founded product/s:", text);
        cy.log("Items are matching with the expected ones");
      } 
    });
  });

  it("search a space:", () => {

    cy.get(".search-form-field").type(SEARCH_SPACES);
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.wait(1000);
    cy.get(".search-form-icon.search-form-submit").click();
    cy.get(".search-no-result-form-headline")
      .should("be.visible")
      .and("contain.text", "Your search did not produce any results.");
  });

  it("search the product name/chars which has spaces at the end of the word", () => {
   
    cy.get(".search-form-field").type(SEARCH_SPACES_AFTER_CHAR);
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.wait(1000);
    cy.get(".search-form-icon.search-form-submit").click();
    cy.get(".search-no-result-form-headline")
      .should("be.visible")
      .and("contain.text", "Your search did not produce any results.");
  });

  it("search the product name/chars which has spaces at the begining of the word", () => {

    cy.get(".search-form-field").type(SEARCH_SPACES_BEFORE_CHAR);
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.wait(1000);
    cy.get(".search-form-icon.search-form-submit").click();
    cy.get(".search-no-result-form-headline")
      .should("be.visible")
      .and("contain.text", "Your search did not produce any results.");
  });

  it("search not existing characters(at least 2):", () => {
    cy.get(".search-form-field").type(SEARCH_NOTEXIST_ITEM);
    cy.wait(1000);
    cy.get(".search-form-icon.search-form-submit").click();
    cy.get(".search-no-result-form-headline")
      .should("be.visible")
      .and("contain.text", "Your search did not produce any results.");
  });

  it("search special characters(at least 2):", () => {
    cy.get(".search-form-field").type(SEARCH_SPECIAL_CHAR);
    cy.wait(1000);
    cy.get(".search-form-icon.search-form-submit").click();
    cy.get(".search-no-result-form-headline")
    .should('be.visible')
    .and('have.text', "Your search did not produce any results.")
  })
});
