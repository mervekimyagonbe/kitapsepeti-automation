class LoginPage {

  // Selectors
  loginLink() { return cy.get('.member-login-btn').first(); }
  emailInput() { return cy.get('#header-email'); }
  passwordInput() { return cy.get('#header-password'); }
  loginButton() { return cy.get('#login-btn-322'); }
  errorMessage() { return cy.get('#header-login span.popover-item', { timeout: 6000 }); }
  forgotPasswordLink() { return cy.get('[href="/uye-sifre-hatirlat"]'); }

  // Actions
  open() {
    cy.visit("/");
  }

  clickLoginLink() {
    this.loginLink().click({ force: true });
  }

  fillEmail(email) {
    this.emailInput().clear().type(email);
  }

  fillPassword(password) {
    this.passwordInput().clear().type(password);
  }

  submit() {
    this.loginButton().click();
  }

  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
    cy.url().should("not.include", "giris");
    cy.contains("Hesabım", { timeout: 10000 }).should("be.visible");
  }

}

export default new LoginPage();