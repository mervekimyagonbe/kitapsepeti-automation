class SearchPage {
  searchInput() { return cy.get('[name="q"]').first(); }
  searchButton() { return cy.get('#live-search-btn').first(); }
  productCards() { return cy.get('.product-item'); }
  productTitles() { return cy.get('.product-title'); }
  productPrices() { return cy.get('.product-price'); }
  noResultMessage() { return cy.get('.product-item'); }
  sortDropdown() { return cy.get('[name="sort"]').first(); }
  filterPanel() { return cy.get('[class*="filter"], [class*="sidebar"]').first(); }

  // Actions
  open() {
    cy.visit("/");
  }

  search(keyword) {
    this.searchInput().clear().type(keyword);
    this.searchButton().click();
  }

  selectSort(optionText) {
    this.sortDropdown().click();
    cy.contains(optionText).click();
  }

  clickFirstProduct() {
    this.productCards().first().click();
  }
}

export default new SearchPage();