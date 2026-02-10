class paymentMethod {

    /**@param {import("@playwright/test").Page} page  */
    constructor(page) {
        this.page = page;
        this.section_container = page.locator(".container div").last();
        this.cc_cvv = page.locator("input.input").nth(1);
        this.cc_name = page.locator("input.input").nth(2)
        this.shipping_name = page.locator(".user__name label").innerText();
        this.shipping_mail = page.locator(".user__name input").first().inputValue();
        this.shipping_country = page.locator(".user__name input").last();
        this.country_results = page.locator(".ta-results");
        this.select_country= this.country_results.last();
        this.placeOrder = page.getByText(/Place Order/);

    }
}

module.exports = { paymentMethod };