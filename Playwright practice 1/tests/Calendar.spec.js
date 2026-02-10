const { test, expect } = require('@playwright/test');


test("Calendar Validations @CAL", async ({ page }) => {
    const month = "12";
    const date = "20";
    const year = "2024";
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".date-field-container").waitFor();
    await page.locator(".date-field-container").click();
    expect(await page.locator(".react-calendar")).toBeVisible();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__decade-view__years").waitFor();
    await page.getByRole("button", { name: year }).click();
    const months = await page.locator(".react-calendar__year-view__months button").nth(Number(month) - 1).click();
    await page.locator(".react-calendar__month-view__days button").filter({ hasText: `${date}` }).first().click();
    //const expected_date = `${year}`+"-"+`${month}`+"-"+`${date}`;
    //console.log("expected = ",expected_date);
    //console.log("content=", await page.locator(".react-date-picker__inputGroup input").first().inputValue());
    //expect(await page.locator(".react-date-picker__inputGroup input").first().inputValue()).toMatch(expected_date);
    expect(await page.locator(`input[name= "month"]`).inputValue()).toEqual(month);
    expect(await page.locator(`input[name= "day"]`).inputValue()).toEqual(date);
    expect(await page.locator(`input[name= "year"]`).inputValue()).toEqual(year);


});