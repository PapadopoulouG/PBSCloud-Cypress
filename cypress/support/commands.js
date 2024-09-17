// cypress/support/commands.js

Cypress.Commands.add('clickRefreshUntilConditionMet', (buttonSelector, conditionSelector, unwantedText, timeout = 30000) => {
    const interval = 1000; // Διάστημα σε milliseconds για να περιμένετε πριν επαναλάβετε
    const startTime = Date.now();

    function checkCondition() {
        cy.get(conditionSelector, { timeout: interval }).then(($el) => {
            const text = $el.text().trim();
            cy.log(`Current text: ${text}`); // Debugging για να δούμε τι κείμενο βλέπει

            if (text === unwantedText) {
                cy.log(`Text is still ${unwantedText}, clicking refresh button...`);

                // Κλικάρει το κουμπί refresh και περιμένει
                cy.get(buttonSelector).should('be.visible').click({ force: true });
                cy.wait(interval);

                // Ελέγξτε αν έχει ξεπεράσει το timeout
                if (Date.now() - startTime < timeout) {
                    checkCondition();
                } else {
                    throw new Error('Timeout while waiting for condition to change');
                }
            } else {
                // Αν το κείμενο δεν είναι το ανεπιθύμητο, το τεστ περνάει
                cy.log(`Condition met, text is now: ${text}`);
                return;
            }
        });
    }

    checkCondition();
});
