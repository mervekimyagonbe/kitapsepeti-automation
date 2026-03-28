import LoginPage from "../pages/LoginPage";

describe("US01 - Kullanıcı Girişi", () => {

  beforeEach(() => {
    LoginPage.open();
    LoginPage.clickLoginLink();
    LoginPage.emailInput().should("be.visible");
  });

  // TC01 - Giriş popup'ına erişim
  it("TC01 - Giriş popup'ına erişilebilmeli", () => {
    LoginPage.emailInput().should("be.visible");
  });

  // TC02 - Form alanlarının varlığı
  it("TC02 - Giriş formunda tüm alanlar görüntülenmeli", () => {
    LoginPage.emailInput().should("be.visible");
    LoginPage.passwordInput().should("be.visible");
    LoginPage.loginButton().should("be.visible");
    LoginPage.forgotPasswordLink().should("exist");
    cy.contains(/kayıt ol/i).should("be.visible");
  });

  // TC03 - Başarılı giriş (Pozitif)
  it("TC03 - Geçerli bilgilerle başarılı giriş yapılabilmeli", () => {
    cy.fixture("testData").then((data) => {
      LoginPage.login(data.validUser.email, data.validUser.password);
      // Ana sayfadan çıktı mı kontrol et
      cy.contains("Hesabım").should("be.visible");

    });
  });

  // TC04 - Yanlış şifre (Negatif)
  it("TC04 - Yanlış şifreyle giriş yapılınca hata mesajı görünmeli", () => {

  cy.intercept("POST", "**/authentication/login/?language=tr").as("loginRequest");


  cy.fixture("testData").then((data) => {
    LoginPage.login(data.validUser.email, data.invalidUser.password);
  });
  
  cy.wait("@loginRequest")
    .its("response.statusCode")
    .should("eq", 401)

  LoginPage.errorMessage({ timeout: 0 })
  .should("exist");
    
});

  // TC05 - Geçersiz e-posta formatı (Negatif)
  it("TC05 - Geçersiz e-posta formatıyla giriş yapılınca hata mesajı görünmeli", () => {
    LoginPage.login("gecersiz-email", "Test1234!");
  
   cy.contains(/Giriş bilgileriniz hatalı./i, { timeout: 5000 }).should("exist");
  });

  // TC06 - Boş alanlarla giriş (Negatif)
  it("TC06 - Boş alanlarla giriş yapılınca uyarı mesajı görünmeli", () => {
    LoginPage.submit();
    

    cy.contains(/Giriş bilgileriniz hatalı./i, { timeout: 5000 }).should("exist");
  });

  // TC07 - Şifremi Unuttum
  it("TC07 - Şifremi Unuttum linkine tıklanınca sıfırlama sayfasına gidilmeli", () => {
    LoginPage.forgotPasswordLink().click();
    cy.url().should("include", "uye-sifre-hatirlat");
  });

});