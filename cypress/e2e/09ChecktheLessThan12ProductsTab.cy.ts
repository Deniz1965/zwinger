import { commonSetupBeforeVisitPage } from "../commonSetupBeforeVisitPage";
import { commonSetupBeforeCookies } from "../commonSetupBeforeCookies";
describe("check the opened tabs", () => {
  commonSetupBeforeVisitPage();
  commonSetupBeforeCookies();
  const maxLength = 12

  it("check the Ctegories with lesss then 12 products", () => {
    cy.visit("https://zwinger.pm.epages.com/c/category_with_less_than_12_products"),
    cy.xpath(`//div[@class='product-item']`).then((listItems) => {
      cy.log(`Found ${listItems.length} items`);
      expect(listItems.length).to.be.lessThan(maxLength);
    });
  });
  
})
