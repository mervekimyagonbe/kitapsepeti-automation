class CheckoutPage {

  
  // SELECTORS
  

  // Kart alanları
  cardNameInput() { return cy.get('[name="cardHolderName"]'); }
  cardNumberInput() { return cy.get('#ccnumber'); }
  cardExpiryInput() { return cy.get('#ccexp'); }
  cardCVVInput() { return cy.get('#cccvc'); }

  payButton() { return cy.get('#iyz-payment-button'); }

  orderSummary() { return cy.get('#order-summary'); }

  errorMessages() { return cy.contains(/Lütfen tüm alanları doldurunuz/i); }

  cardPay() { return cy.get('#iyz-tab-credit-card'); }
  iyzicoPay() { return cy.get('#iyz-tab-payWithIyzico'); }

  agreementCheckbox() { return cy.get('#input-iyzico-agreements'); }

  cargoOptions() { return cy.get('.cargo-option-item'); }

  proceedButton() { return cy.get('.col-7 > .btn'); }

  PayInformations() { return cy.contains(/Ödeme adımına geç/i); }

  // Adres
  deliveryAddressRadio() { return cy.get('[name="delivery_address"]').first(); }
  invoiceAddressRadio() { return cy.get('[name="invoice_address"]').first(); }

 

  
  // ACTIONS
  

  
  clickProceedToPayment() {
    this.proceedButton()
      .should('be.visible')
      .click();

    cy.url({ timeout: 15000 }).should('include', 'payment');
  
  // iyzico iframe'inin yüklenmesini bekle
    cy.get('#iyz-tab-credit-card', { timeout: 15000 }).should('exist');
  }
  selectCardPayment() {
    this.cardPay().scrollIntoView().should('be.visible').click({ force: true });
  }

  selectDeliveryAddress() {
    this.deliveryAddressRadio().click({ force: true });
  }

  selectInvoiceAddress() {
    this.invoiceAddressRadio().click({ force: true });
  }

  selectCargo() {
    this.cargoOptions().first().click({ force: true });
  }

  fillCardDetails(name, number, expiry, cvv) {
    this.cardNameInput().should('be.visible').clear().type(name);
    this.cardNumberInput().clear().type(number);
    this.cardExpiryInput().clear().type(expiry);
    this.cardCVVInput().clear().type(cvv);
  }

  acceptAgreement() {
    this.agreementCheckbox().check({ force: true });
  }

  clickPay() {
    this.payButton().should('be.enabled').click();
  }

  getTotalPrice() {
    return this.orderSummary()
      .should('be.visible')
      .invoke('text');
  }
}

export default new CheckoutPage();