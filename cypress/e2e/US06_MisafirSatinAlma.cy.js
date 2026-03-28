import SearchPage from "../pages/SearchPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import GuestCheckoutPage from "../pages/GuestCheckoutPage";

describe("US06 - Misafir Olarak Satın Alma", () => {

  beforeEach(() => {
    SearchPage.open();
    cy.fixture("testData").then((data) => {
      SearchPage.search(data.searchKeyword);
      SearchPage.productCards().first().click();
      ProductDetailPage.clickAddToCart();
      cy.contains(/satın al/i).click();
    });
  });

  // TC01
  it("TC01 - Sipariş sayfasında Üye Olmadan Devam Et butonu görüntülenmeli", () => {
    GuestCheckoutPage.guestButton().should("be.visible");
  });

  // TC02
  it("TC02 - Üye Olmadan Devam Et ile adres formu sayfası açılmalı", () => {
    GuestCheckoutPage.clickGuestCheckout();
    cy.contains(/adres bilgileri/i).should("be.visible");
  });

  // TC03
  it("TC03 - Adres formunda tüm zorunlu alanlar görüntülenmeli", () => {
    GuestCheckoutPage.clickGuestCheckout();

    GuestCheckoutPage.nameInput().should("be.visible");
    GuestCheckoutPage.emailInput().should("be.visible");
    GuestCheckoutPage.phoneInput().should("be.visible");
    GuestCheckoutPage.addressInput().should("be.visible");
    GuestCheckoutPage.countrySelect().should("be.visible");
    GuestCheckoutPage.citySelect().should("be.visible");
    GuestCheckoutPage.townSelect().should("exist");
    GuestCheckoutPage.districtSelect().should("exist");
    GuestCheckoutPage.postCodeInput().should("exist");
  });

  // TC04
  it("TC04 - Tüm alanlar doldurulunca sonraki adıma geçilebilmeli", () => {
    GuestCheckoutPage.clickGuestCheckout();

    GuestCheckoutPage.nameInput().type("Test Kullanıcı", { force: true });
    GuestCheckoutPage.emailInput().type("test@example.com");
    GuestCheckoutPage.phoneInput().type("05001234567");
    GuestCheckoutPage.addressInput().type("Test Mahallesi Test Sokak No:1");
    GuestCheckoutPage.postCodeInput().type("34710");

    GuestCheckoutPage.countrySelect().select("Türkiye");
    cy.get('#city_code').select('34');

    cy.get('#town_code').should('not.be.disabled').select('943');
    cy.get('#district_code').should('not.be.disabled').select('ACIBADEM MAH');

    GuestCheckoutPage.clickSaveAddress();

    cy.contains(/ödeme/i, { timeout: 10000 }).should("be.visible");
  });

 it("TC05 - Zorunlu alanlar boş bırakılınca hata mesajları görüntülenmeli", () => {

  GuestCheckoutPage.clickGuestCheckout();
  GuestCheckoutPage.continueButton().click();
  GuestCheckoutPage.saveAddressButton().click();

  //  TÜM error mesajları
  cy.get(".popover-item.fade-in.inline")
    .should("have.length.greaterThan", 3);

  //  spesifik kontroller
  cy.contains(".popover-item", "Lütfen bu alanı doldurunuz")
    .should("be.visible");

  cy.contains(".popover-item", "E-posta adresi uygun formatta değildir")
    .should("be.visible");

  cy.contains(".popover-item", "Geçerli bir telefon numarası giriniz")
    .should("be.visible");

});

  // TC06
  it("TC06 - Geçersiz e-posta formatıyla devam edilince hata mesajı görüntülenmeli", () => {
    GuestCheckoutPage.clickGuestCheckout();

    GuestCheckoutPage.nameInput().type("Test Kullanıcı");
    GuestCheckoutPage.emailInput().type("gecersiz-email");
    GuestCheckoutPage.phoneInput().type("05001234567");
    GuestCheckoutPage.addressInput().type("Test Mahallesi Test Sokak No:1");
    GuestCheckoutPage.postCodeInput().type("34710");

    GuestCheckoutPage.countrySelect().select("Türkiye");
    cy.get('#city_code').select('34');

    cy.get('#town_code').should('not.be.disabled').select('943');
    cy.get('#district_code').should('not.be.disabled').select('ACIBADEM MAH');

    GuestCheckoutPage.saveAddressButton().click();

    GuestCheckoutPage.emailInput().then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
      expect($input[0].validationMessage).to.include("@");
    });
  });

});