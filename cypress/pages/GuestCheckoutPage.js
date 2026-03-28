class GuestCheckoutPage {
  // Selectors
  guestButton() { return cy.contains(/üye olmadan devam et/i); }
  nameInput() { return cy.get('#fullname'); }
  emailInput() { return cy.get('input[name="email"]'); }
  phoneInput() { return cy.get('#mobile_phone'); }
  countrySelect() { return cy.get('[name="country_code"]'); }
  citySelect() { return cy.get('#city_code'); }            
  townSelect() { return cy.get('#town_code'); }           
  districtSelect() { return cy.get('#district_code'); }   
  addressInput() { return cy.get('textarea[name="address"]'); }
  postCodeInput() { return cy.get('#post_code'); }
  saveAddressButton() { 
  return cy.get('#order-address-form button[type="submit"]'); 
}
  continueButton() { return cy.contains(/devam et/i); }
  errorMessages() { return  cy.contains(/lütfen/i); }

  // Actions
  clickGuestCheckout() {
    this.guestButton().click();
  }

  fillAddress(name, email, phone, address, country, city, town, district, postCode) {
    this.nameInput().clear().type(name);
    this.emailInput().clear().type(email);
    this.phoneInput().clear().type(phone);
    this.addressInput().clear().type(address);

    if (country) {
      this.countrySelect().select(country);
    }
    if (city) {
      this.citySelect().select(city);
    }
    if (town) {
      // town select aktif olana kadar bekle
      this.townSelect().should('not.be.disabled').select(town);
    }
    if (district) {
      // district select aktif olana kadar bekle
      this.districtSelect().should('not.be.disabled').select(district);
    }
    if (postCode) {
      this.postCodeInput().clear().type(postCode);
    }
  }

  clickSaveAddress() {
    this.saveAddressButton().click();
  }
}

export default new GuestCheckoutPage();