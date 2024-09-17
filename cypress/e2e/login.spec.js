import { SELECTORS } from "../support/selectors";

describe("Login Test", () => {
  let testData;

  it.only("Σύνδεση Τελικού Χρήστη στο PBS Cloud", function () {
    cy.fixture("testData").then((data) => {
      testData = data;

      // Clean up database before starting the test
      cy.task("deleteWorkDaysInDB");
      cy.task("deleteEmployeesInDB");
      cy.task("deleteWorkAreasInDB");

      // Visit the URL and perform login
      cy.visit(testData.URL);
      cy.intercept("POST", "/api/Auth/login").as("loginRequest");
      cy.get('input[type="email"]').type(testData.USERNAME);
      cy.get('input[type="password"]').type(testData.PASSWORD);
      cy.get(SELECTORS.loginButton).click();
      cy.get(SELECTORS.loginButton).click();
      
      cy.wait("@loginRequest");
    
      cy.url().should("include", "/dashboard");
      // Handle popups if they appear

      //vasilaras
      cy.get(SELECTORS.popupOkButton, { delay:4000, timeout: 15000 })
      .should("be.visible")
     .click();
     cy.get(SELECTORS.popupCancelButton, { delay:4000,timeout: 15000 })
       .should("be.visible")
       .click();
       cy.wait(10000)
      //end vasilaras

      //  cy.get(SELECTORS.popupOkButton, {  timeout: 15000 })
      //  .should("be.visible")
      // .click({ force: true });
      // cy.get(SELECTORS.popupCancelButton, { timeout: 15000 })
      //   .should("be.visible")
      //   .click({ force: true });
    });
  });

  it("Συγχρονισμός Παραρτημάτων", () => {
    cy.get(SELECTORS.syncButton).contains("Εργάνη II").click();
    cy.get(SELECTORS.erganiIIListItems, { timeout: 10000 }).should("be.visible");
    cy.get(SELECTORS.syncButton).contains("Παραρτήματα").click();
    cy.url().should("include", "/payroll/workareas");
    cy.get(SELECTORS.syncWorkAreasErganiBtn).eq(2).click();
    cy.wait(6000);
    cy.get(SELECTORS.refreshWorkAreasErganiBtn).click();
    cy.task("checkWorkAreasInDB").then((result) => {
      expect(result).to.be.true;
    });
  });

  it("Συγχρονισμός Εργαζομένων", () => {
    cy.get(SELECTORS.syncButton).contains("Εργάνη II").click();
    cy.get(SELECTORS.erganiIIListItems, { timeout: 10000 }).should("be.visible");
    cy.get(SELECTORS.syncButton).contains("Εργαζόμενοι").click();
    cy.url().should("include", "/payroll/employees");
    cy.get(SELECTORS.syncEmployeesErganiBtn).eq(2).click();
    cy.wait(6000);
    cy.get(SELECTORS.refreshEmployeesErganiBtn).click();
    cy.task("checkEmployeesInDB").then((result) => {
      expect(result).to.be.true;
    });
  });

  it("Συγχρονισμός Ωραρίων", () => {
    cy.get(SELECTORS.syncButton).contains("Εργάνη II").click();
    cy.get(SELECTORS.erganiIIListItems, { timeout: 10000 }).should("be.visible");

    // Sync Work Areas
    cy.get(SELECTORS.syncButton).contains("Παραρτήματα").click();
    cy.url().should("include", "/payroll/workareas");
    cy.get(SELECTORS.syncWorkAreasErganiBtn).eq(2).click();
    cy.wait(6000);
    cy.get(SELECTORS.refreshWorkAreasErganiBtn).click();
    cy.task("checkWorkAreasInDB").then((result) => {
      expect(result).to.be.true;
    });

    // Sync Employees
    cy.get(SELECTORS.syncButton).contains("Εργαζόμενοι").click();
    cy.url().should("include", "/payroll/employees");
    cy.get(SELECTORS.syncEmployeesErganiBtn).eq(2).click();
    cy.wait(6000);
    cy.get(SELECTORS.refreshEmployeesErganiBtn).click();
    cy.task("checkEmployeesInDB").then((result) => {
      expect(result).to.be.true;
    });

    // Sync Work Days
    cy.get(SELECTORS.syncButton).contains("Οργάνωση Ωραρίου Εργασίας").click();
    cy.url().should("include", "/payroll/workdays");
    cy.get(SELECTORS.syncWorkDaysErganiBtn).eq(1).click();
    cy.wait(6000);
    cy.get(SELECTORS.refreshWorkDaysErganiBtn).click();
    cy.task("checkWorkDaysInDB").then((result) => {
      expect(result).to.be.true;
    });
  });
});
