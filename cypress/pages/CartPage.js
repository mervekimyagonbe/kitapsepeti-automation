class CartPage {
  // Selectors
  open() { cy.visit("/sepet"); }
  cartItems() { return cy.get('.cart-item'); }
  increaseButton() { return cy.get('[id^="qty-plus"]').first(); }
  decreaseButton() { return cy.get('[id^="qty-minus"]').first(); }
  deleteButton() { return cy.get('.cart-item-delete').first(); }
  confirmDeleteButton() { return cy.get('.t-popconfirm-buttons > .btn-light'); }
  clearCartButton() { return cy.contains(/sepeti temizle/i); }
  totalPrice() { return cy.get('.price-sell.fw-black.text-black').last(); }
  emptyCartMessage() { return cy.contains(/sepetinizde ürün bulunmamaktadır/i); }
  continueShoppingButton() { return cy.contains(/alışverişe devam et/i); }
  buyButton() { return cy.contains(/satın al/i); }
  cartItemTitle() { return cy.get('.cart-item-title').first(); }
  cartItemPrice() { return cy.get('.cart-item-price-wrapper').first(); }

  // Actions
 clearCartIfExists() {
  cy.get("body").then(($body) => {
    if ($body.find("#clear-cart-btn-129").length > 0) {
      this.clickClearCart();
    }
  });
}
  clickIncrease() {
    this.increaseButton().click({ force: true });
  }

  clickDelete() {
    this.deleteButton().click({ force: true });
  }

  confirmDelete() {
    this.confirmDeleteButton().click({ force: true });
  }

  clickClearCart() {
    this.clearCartButton().click();
  }

  clickBuy() {
    this.buyButton().click();
  }

  getTotalPrice() {
    return this.totalPrice().invoke("text");
  }
 

 

}

export default new CartPage();