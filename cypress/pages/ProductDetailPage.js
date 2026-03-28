class ProductDetailPage {
  productName() { return cy.get('#product-title').first(); }
  productPrice() { return cy.get('.product-price').first(); }
  addToCartButton() { return cy.get('#addToCartBtn'); }
  cartSuccessMessage() { return cy.get('.product-cart-title > span'); }

  //  Popup Sepete Git butonu
  goToCartButtonPopup() { 
    return cy.get('#cart-popup-go-cart'); 
  }

  //  Header / normal sepet butonu (fallback)
  goToCartButtonHeader() { 
    return cy.get('.badge').first(); 
  }

  cartCount() { return cy.get('.badge').first(); }

  // Actions
  clickAddToCart() {
    this.addToCartButton().click();
  }
clickGoToCart() {
  cy.get('#cart-popup-go-cart', { timeout: 10000 })
    .should('be.visible')
    .click({ force: true });
}

  getProductNameText() {
    return this.productName().invoke('text');
  }

  getPriceText() {
    return this.productPrice().invoke('text');
  }
}

export default new ProductDetailPage();