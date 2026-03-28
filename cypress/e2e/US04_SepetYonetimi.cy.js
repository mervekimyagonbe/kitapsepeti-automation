import SearchPage from "../pages/SearchPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";

describe("US04 - Sepet Yönetimi ve Kontrolü", () => {

  beforeEach(() => {
    SearchPage.open();

    cy.fixture("testData").then((data) => {
      SearchPage.search(data.searchKeyword);

      SearchPage.productCards()
        .first()
        .find('.product-title')
        .click();

      ProductDetailPage.addToCartButton().should('be.visible').click();

      ProductDetailPage.goToCartButtonPopup().should('be.visible').click();

      
      cy.get('.t-modal-backdrop').should('not.exist');
    });
  });

  // TC01
  it("TC01 - Sepet sayfasında ürün adı ve fiyat görüntülenmeli", () => {
    CartPage.cartItems().first().within(() => {
      cy.get('[class*="name"], [class*="title"]').should("be.visible");
      cy.get('[class*="price"]').should("be.visible");
    });
  });

  // TC02
  it("TC02 - Sepet toplamı ve genel toplam görüntülenmeli", () => {
    CartPage.totalPrice().should("be.visible");
    CartPage.getTotalPrice().then((text) => {
      expect(text).to.match(/\d/);
    });
  });

  it("TC03 - Ürün adedi artırılınca toplam güncellenmeli", () => {

    CartPage.getTotalPrice().then((beforeTotal) => {

      CartPage.clickIncrease();

      CartPage.getTotalPrice().should((afterTotal) => {
        expect(afterTotal).not.to.equal(beforeTotal);
      });

    });

  });

  it("TC04 - Ürün silinince sepetten kaldırılmalı", () => {

    CartPage.clickDelete();
    CartPage.confirmDelete();

    CartPage.emptyCartMessage().should("be.visible")

  });

  // TC05
  it("TC05 - Sepeti Temizle butonuyla tüm ürünler kaldırılmalı", () => {
    CartPage.clickClearCart();
    CartPage.emptyCartMessage().should("be.visible");
  });

  // TC06
  it("TC06 - Sepette ürün varken Satın Al butonu görüntülenmeli", () => {
    CartPage.buyButton().should("be.visible");
  });

  it("TC07 - Boş sepette mesaj ve buton görünmeli", () => {

    CartPage.clickDelete();
    CartPage.confirmDelete();

    CartPage.emptyCartMessage().should("be.visible");
    CartPage.continueShoppingButton().should("be.visible");

  });

});