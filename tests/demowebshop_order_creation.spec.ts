import { test, expect } from '@playwright/test';

test.describe('DemoWebShop_Order_Creation|Buiseness Parameters|RTB', () => {
  test('Complete order creation flow with discount and payment verification', async ({ page }) => {
    // OpenUrl
    await page.goto('https://demowebshop.tricentis.com/');
    await page.waitForLoadState('networkidle');

    // TBox Wait
    await page.waitForTimeout(1000);
    await page.waitForLoadState('networkidle');

    // WebShop | Top Menu - Click on Login Button
    await expect(page.locator('.ico-login')).toBeVisible();
    await page.locator('.ico-login').click();
    await page.waitForLoadState('networkidle');

    // WebShop | Log In Page - Enter Valid Email and Password and Click on Log in button
    await page.locator('#Email').fill('sr.Tester123@gmail.com');
    await page.locator('#Password').fill('Tester123');
    await page.locator('input[value="Log in"]').click();
    await page.waitForLoadState('networkidle');

    // TBox Wait
    await page.waitForTimeout(1000);
    await page.waitForLoadState('networkidle');

    // TBox Set Buffer
    await page.waitForTimeout(500);
    await page.waitForLoadState('networkidle');

    // WebShop | Products Choice Tab - Navigate to Products Choice Tab and click on APPAREL & SHOES
    await page.locator('a[href="/apparel-shoes"]').first().click();
    await page.waitForLoadState('networkidle');

    // WebShop | Apparel & Shoes Product Selection - Navigate to Blue Jeans and click on Blue Jeans
    await page.getByText('Blue Jeans').click();
    await page.waitForLoadState('networkidle');

    // WebShop | Blue Jeans - Enter the Quantity for Blue jeans and Click on add to cart
    await page.locator('#addtocart_36_EnteredQuantity').fill('2');
    await page.locator('#add-to-cart-button-36').click();

    // WebShop | Shopping Cart - Enter the discount code, click on 'Apply Coupon', check the 'Terms and Conditions' checkbox, and then click on the 'Checkout' button
    await page.locator('.cart-label').click();
    await page.locator('#discountcouponcode').fill('DISCOUNT10');
    await page.locator('input[name="applydiscountcouponcode"]').click();
    await page.locator('#termsofservice').check();
    await page.locator('#checkout').click();
    await page.waitForLoadState('networkidle');

    // WebShop | Billing Address - Click on continue button in Billing Address Page
    await page.locator('input[onclick="Billing.save()"]').click();
    await page.waitForLoadState('networkidle');

    // WebShop | Shipping Address - Click on continue button in Shipping Address Page
    await page.locator('input[onclick="Shipping.save()"]').click();
    await page.waitForLoadState('networkidle');

    // WebShop | Shipping Method - Choose shipping method as a ground and click on continue button
    await page.locator('#shippingoption_0').check();
    await page.locator('input[onclick="ShippingMethod.save()"]').click();
    await page.waitForLoadState('networkidle');
  });
});