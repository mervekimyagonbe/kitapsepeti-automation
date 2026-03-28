import SearchPage from "../pages/SearchPage";
import ProductDetailPage from "../pages/ProductDetailPage";

describe("US03 - Ürün Detay Sayfası", () => {
  beforeEach(() => {
    SearchPage.open();
    cy.fixture("testData").then((data) => {
      SearchPage.search(data.searchKeyword);
      SearchPage.productCards().first().click();
    });
  });

  // TC01 - Detay sayfasına erişim (Pozitif)
  it("TC01 - Ürüne tıklanınca detay sayfasına gidilmeli", () => {
    cy.url().should("not.include", "/arama");
    ProductDetailPage.productName().should("be.visible");
  });

  // TC02 - Temel bilgilerin varlığı (Pozitif)
  it("TC02 - Detay sayfasında ürün adı ve fiyat görüntülenmeli", () => {
    ProductDetailPage.productName().should("be.visible");
    ProductDetailPage.productPrice().should("be.visible");
  });

  // TC03 - Sepete ekle butonu (Pozitif)
  it("TC03 - Detay sayfasında Sepete Ekle butonu görüntülenmeli", () => {
    ProductDetailPage.addToCartButton().should("be.visible");
  });

  // TC04 - Sepete ekleme onayı (Pozitif)
  it("TC04 - Sepete Ekle butonuna tıklanınca onay mesajı görünmeli", () => {
    ProductDetailPage.clickAddToCart();
    ProductDetailPage.cartSuccessMessage().should("be.visible");
    
  });

  // TC05 - Sepet sayacı (Pozitif)
  it("TC05 - Ürün sepete eklendikten sonra sepet ikonu sayacı artmalı", () => {
    cy.intercept('GET', '**/popup-cart**').as('addToCart');

ProductDetailPage.cartCount().invoke('text').then((beforeCount) => {

  ProductDetailPage.clickAddToCart();

  cy.wait('@addToCart'); // 🔥 kritik nokta

  ProductDetailPage.cartCount()
    .should(($el) => {
      const after = parseInt($el.text()) || 0;
      const before = parseInt(beforeCount) || 0;
      expect(after).to.be.greaterThan(before);
    });
});
  });

  // TC06 - Sepete Git yönlendirmesi (Pozitif)
  it("TC06 - Sepete Git butonuna tıklanınca sepet sayfasına gidilmeli", () => {
    ProductDetailPage.clickAddToCart();
    ProductDetailPage.goToCartButtonPopup().click();
    cy.url().should("include", "/sepet");
  });

 })