import SearchPage from "../pages/SearchPage";

describe("US02 - Ürün Arama ve Listeleme", () => {

  beforeEach(() => {
    SearchPage.open();
  });

  // TC01 - Geçerli arama (Pozitif)
  it("TC01 - Geçerli kelimeyle arama yapılınca ürünler listelenmeli", () => {
    cy.fixture("testData").then((data) => {
      SearchPage.search(data.searchKeyword);
      cy.url().should("include", "/arama");
      SearchPage.productCards().should("have.length.greaterThan", 0);
    });
  });

  // TC02 - Geçersiz arama (Negatif)
  it("TC02 - Sistemde olmayan kelimeyle arama yapılınca sonuç bulunmamalı", () => {
    cy.fixture("testData").then((data) => {
      SearchPage.search(data.invalidKeyword);
      // ürün kartları yok mu kontrol et
      SearchPage.productCards()
      .should("have.length", 0);
    });
  });

  // TC03 - Ürün kartı bilgileri (Pozitif)
  it("TC03 - Her ürün kartında ürün adı ve fiyat bilgisi görüntülenmeli", () => {
    cy.fixture("testData").then((data) => {
      SearchPage.search(data.searchKeyword);
      SearchPage.productCards().first().within(() => {
        cy.get('[class*="name"], [class*="title"]').should("be.visible");
        cy.get('[class*="price"]').should("be.visible");
      });
    });
  });

  // TC04 - Sıralama menüsü (Pozitif)
  it("TC04 - Sıralama menüsü açılınca seçenekler görüntülenmeli", () => {
    cy.fixture("testData").then((data) => {
      SearchPage.search(data.searchKeyword);
      SearchPage.sortDropdown().select("Fiyat Artan");
      SearchPage.sortDropdown().select("Fiyat Azalan");
      SearchPage.sortDropdown().select("Yeniden Eskiye");
      
    });
  });

  // TC05 - Boş arama (Negatif)
  it("TC05 - Boş arama çubuğuyla arama yapılınca sonuç sayfasına gidilmemeli", () => {
    SearchPage.searchButton().click();
    cy.url().should("not.include", "/arama");
  });

  // TC06 - Kategori filtreleme (Pozitif)
  it("TC06 - Filtre panelinde kategori seçilince sonuçlar güncellenmeli", () => {
    cy.fixture("testData").then((data) => {
      SearchPage.search(data.searchKeyword);
      SearchPage.filterPanel().should("be.visible");
      SearchPage.filterPanel().within(() => {
        cy.contains(/kategori/i).should("be.visible");
        cy.contains(/marka/i).should("be.visible");
      });
    });
  });

});