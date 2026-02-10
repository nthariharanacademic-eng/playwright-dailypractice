class loginPage {

    /**@param {import("@playwright/test").Page} page  */
    constructor(page) {
        this.page = page;
        this.section_login = page.locator(".login-section-wrapper");
        this.mailID = this.page.getByPlaceholder("email@example.com");
        this.pwd = this.page.getByPlaceholder("enter your passsword");
        this.btn_login = this.page.getByRole("button", { name: "Login" });
    }

}

module.exports = {loginPage};