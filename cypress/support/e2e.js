// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// Import commands.js using ES2015 syntax:
// Import commands.js using ES2015 syntax:
import './commands'


// Sitenin kendi JS hatalarını görmezden gel
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

// Her testten önce çerez popup'ını kapat


beforeEach(() => {
  cy.visit("/")
  // Çerez popup'ı varsa kabul et
  cy.get('body').then(($body) => {
    if ($body.find('.cc-nb-okagree').length > 0) {
      cy.get('.cc-nb-okagree').click()
      cy.wait(500) // Popup kapanması için bekle
    }
  })
})

import 'cypress-mochawesome-reporter/register';