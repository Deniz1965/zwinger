import { commonSetupBeforeVisitPage } from "../commonSetupBeforeVisitPage";
import { commonSetupBeforeCookies } from "../commonSetupBeforeCookies";
import { commonSetupAfter } from "../commonSetupAfter";

describe('Click on the searched item', () => {
    commonSetupBeforeVisitPage();
    commonSetupBeforeCookies();
    commonSetupAfter();
    const SEARCH_ITEM_WITH_ONE_CATEGORY = 'variation';
    it("Search item which is linked only one category", () => {
        cy.get('.search-form-field').type(SEARCH_ITEM_WITH_ONE_CATEGORY);
        cy.wait(2000);
        cy.get('.search-form-suggestions').should('be.visible').click();
        cy.wait(3000);
        const expectedURL= "https://zwinger.pm.epages.com/p/variation";
        cy.url().then(currentURL => {
        if(currentURL === expectedURL){
            cy.log("Url is correct");
        }
        else{
            cy.log("url is wrong");
        }
        })
        cy.get('.navigation-active').should('have.text', "prerelease");
        cy.xpath(`//h1[text()='variation']`).then(($el) => {
            const text = $el.text();
            if(text === SEARCH_ITEM_WITH_ONE_CATEGORY.toString()){
                cy.log(text);
            }
           
        })
    })
})


