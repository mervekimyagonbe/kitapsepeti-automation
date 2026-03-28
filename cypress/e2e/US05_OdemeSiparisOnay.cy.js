import LoginPage from "../pages/LoginPage";
import SearchPage from "../pages/SearchPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";

describe("US05 - Ödeme ve Sipariş Onayı", () => {

  beforeEach(() => {
    LoginPage.open();
    LoginPage.clickLoginLink();
    LoginPage.emailInput().should("be.visible");

    cy.fixture("testData").then((data) => {
      LoginPage.login(data.validUser.email, data.validUser.password);
      cy.contains("Hesabım").should("be.visible");
      cy.closeModalIfExists();

      SearchPage.open();
      cy.closeModalIfExists();
     
      SearchPage.search(data.searchKeyword);
      SearchPage.productCards().first().click();
      cy.closeModalIfExists();

      ProductDetailPage.clickAddToCart();
      ProductDetailPage.clickGoToCart();

      CartPage.clickBuy();
    });
  });

  it("TC01 - Satın Al butonuyla Adres Bilgileri sayfasına gidilmeli", () => {
    cy.contains(/adres bilgileri/i).should("be.visible");
  });

  it("TC02 - Ödeme sayfasında iyzico ve Kartla Ödeme seçenekleri görüntülenmeli", () => {
    CheckoutPage.clickProceedToPayment();
    cy.contains(/ödeme/i, { timeout: 10000 }).should("be.visible");
    CheckoutPage.cardPay().scrollIntoView().should("be.visible");
    CheckoutPage.iyzicoPay().should("be.visible");
    
  });

  it("TC03 - Kartla Ödeme seçilince kart formu alanları görüntülenmeli", () => {
    CheckoutPage.clickProceedToPayment();
    cy.contains(/ödeme/i, { timeout: 10000 }).should("be.visible");
    CheckoutPage.selectCardPayment();

    CheckoutPage.cardNameInput().should("be.visible");
    CheckoutPage.cardNumberInput().should("be.visible");
    CheckoutPage.cardExpiryInput().should("be.visible");
    CheckoutPage.cardCVVInput().should("be.visible");
  });

  it("TC04 - Ödeme sayfasında Sipariş Özeti ve toplam tutar görüntülenmeli", () => {
    CheckoutPage.clickProceedToPayment();

    CheckoutPage.orderSummary().should("be.visible");
    CheckoutPage.orderSummary().invoke("text").then((text) => {
      expect(text).to.match(/\d/);
    });
  });

  it("TC05 - Kart bilgileri eksik girilince hata mesajı görüntülenmeli", () => {
    CheckoutPage.clickProceedToPayment();
    cy.contains(/ödeme/i, { timeout: 10000 }).should("be.visible");
    CheckoutPage.selectCardPayment();

    CheckoutPage.payButton().click();
    CheckoutPage.payButton().should("not.be.disabled").click({ force: true });

    cy.contains(/lütfen/i, { timeout: 5000 }).should("be.visible");
    CheckoutPage.errorMessages().should("be.visible");
  });

});