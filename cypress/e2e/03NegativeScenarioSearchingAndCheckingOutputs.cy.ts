import { commonSetupBeforeVisitPage } from "../commonSetupBeforeVisitPage";
import { commonSetupBeforeCookies } from "../commonSetupBeforeCookies";
import { commonSetupAfter } from "../commonSetupAfter";

describe('Negative Scenarios: Searching And Checking Outputs', () => {
    commonSetupBeforeVisitPage();
    commonSetupBeforeCookies();
    commonSetupAfter();
    const SEARCH_ONE_CHAR = "a";
    const SEARCH_SPACES = "   ";
    const SEARCH_SPACES_BEFORE_CHAR = "     oo";
    const SEARCH_SPACES_AFTER_CHAR = "oo      ";
    const SEARCH_NOTEXIST_ITEM = "bv";
    const SEARCH_SPECIAL_CHAR= "---";
    
    it("search only one char:", () => {
        cy.get('.search-form-field').type(SEARCH_ONE_CHAR);
        cy.get('.search-form-suggestions', {timeout : 4000}).should('not.exist');
    })

    it("search a space:", () => {
        cy.get('.search-form-field').type(SEARCH_SPACES);
        cy.get('.search-form-suggestions', {timeout : 4000}).should('not.exist');
    });
    
    it("search the product name/chars which has spaces at the begining of the word:", () => {
        cy.get('.search-form-field').type(SEARCH_SPACES_BEFORE_CHAR);
        cy.get('.search-form-suggestions').each(($el) => {
            const text= $el.text();
            if(text.includes(SEARCH_SPACES_BEFORE_CHAR)){
                cy.log(text);
            }
        })
    });

    it("search the product name/chars which has spaces at the end of the word:", () => {
        cy.get('.search-form-field').type(SEARCH_SPACES_AFTER_CHAR);
        cy.get('search-form-suggestions').each(($el) => {
            const text= $el.text();
            if(text.includes(SEARCH_SPACES_AFTER_CHAR)){
                cy.log(text);
            }
        })
    });

    it("search not existing characters(at least 2):", () => {
        cy.get('.search-form-field').type(SEARCH_NOTEXIST_ITEM);
        cy.wait(2000);
        cy.get('.search-form-suggestions').should('not.exist');
    });


    it("search special chars(at least 2):", () => {
        cy.get('.search-form-field').type(SEARCH_SPECIAL_CHAR);
        cy.wait(4000);
        cy.get('.search-form-suggestions').should('not.exist');
    });
})