import { commonSetupBeforeVisitPage } from "../commonSetupBeforeVisitPage";
import { commonSetupBeforeCookies } from "../commonSetupBeforeCookies";
describe("check the opened tabs", () => {
  commonSetupBeforeVisitPage();
  commonSetupBeforeCookies();

  it("check the Ctegories with lesss then 12 products", () => {
    cy.xpath(`//h2[text()='[Example] Sailing Boat Decor 3']`).click();
    cy.wait(1000);
    cy.get('#quantity').should('have.value', 1);
    cy.get('button[aria-label="Increase the product quantity by one"]').click();
    cy.wait(1000);
    cy.get('.product-add-cart-button').click();
    //cy.get('.header-minicart-badge').should('have.text', '2');
    cy.get('.header-minicart-icon').click();
    cy.xpath(`//a[text()='[Example] Sailing Boat Decor 3']`).should('have.text', "[Example] Sailing Boat Decor 3");
    cy.get('#quantity').should('have.value', 2);
    


  });
  
})
