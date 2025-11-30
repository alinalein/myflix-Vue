// test user TEST_USERNAME with password TEST_PASSWORD , must always exist for this test to run 

describe('Login Flow', () => {
    it('logs in successfully', () => {

        const username = Cypress.env('TEST_USERNAME');
        const password = Cypress.env('TEST_PASSWORD');

        cy.visit('/log-in');// Go to login page

        cy.get('input[placeholder="Username"]').type(username);
        cy.get('input[placeholder="Password"]').type(password);
        cy.get('form').submit();

        // Now check that something from homepage appears
        cy.url().should('include', '/');
        cy.get('.movie-card p').should('exist'); // One movie title appears
        // (optional) check localStorage too:
        cy.window().then((window) => {
            expect(window.localStorage.getItem('user')).to.not.be.null;
            expect(window.localStorage.getItem('token')).to.not.be.null;
        });
    });
});
