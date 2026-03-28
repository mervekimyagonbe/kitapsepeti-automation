// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('closeModalIfExists', () => {
  cy.get('body').then(($body) => {

    // modal varsa
    if ($body.find('.t-modal-content').length > 0) {

      cy.log('Modal bulundu, kapatılıyor...');

      // X butonu varsa
      if ($body.find('.t-modal-close').length > 0) {
        cy.get('.t-modal-close').click({ force: true });
      } 
      
      // X yoksa backdrop'a tıkla
      else {
        cy.get('.t-modal-backdrop').click({ force: true });
      }

      // kapandığını garanti et
      cy.get('.t-modal-content').should('not.exist');
    }
  });
});