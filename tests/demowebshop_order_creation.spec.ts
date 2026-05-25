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
    await page.locator('#Email').fill('testuser@example.com');
    await page.locator('#Password').fill('password123');
    await page.locator('input[value="Log in"]').click();
    await page.waitForLoadState('networkidle');

    // TBox Wait
    await page.waitForTimeout(1000);
    await page.waitForLoadState('networkidle');

    // TBox Set Buffer
    await page.waitForTimeout(500);
    await page.waitForLoadState('networkidle');

    // WebShop | Products Choice Tab - Navigate to Products Choice Tab and click on APPAREL & SHOES
    await page.locator('a[href="/apparel-shoes"]').click();
    await page.waitForLoadState('networkidle');

    // WebShop | Apparel & Shoes Product Selection - Navigate to Blue Jeans and click on Blue Jeans
    await page.locator('a[href="/blue-jeans"]').click();
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

    // WebShop | Payment Methods - Choose Payment Method as Credit Card and click on continue button
    await page.locator('#paymentmethod_1').check();
    await page.locator('input[onclick="PaymentMethod.save()"]').click();
    await page.waitForLoadState('networkidle');

    // WebShop | Payment Information Credit Card - Enter the Credit Card deatails and and click on continue button
    await page.locator('#CreditCardType').selectOption('Visa');
    await page.locator('#CardholderName').fill('Test User');
    await page.locator('#CardNumber').fill('4485564059489345');
    await page.locator('#ExpireMonth').selectOption('12');
    await page.locator('#ExpireYear').selectOption('2025');
    await page.locator('#CardCode').fill('123');
    await page.locator('input[onclick="PaymentInfo.save()"]').click();
    await page.waitForLoadState('networkidle');

    // WebShop | Confirm Order - Verification the Prices in Confirm Order page
    await expect(page.locator('.order-total')).toBeVisible();

    // WebShop | Confirm Order - Click on Confirm button in Confirm Order Page
    await page.locator('input[value="Confirm"]').click();

    // WebShop | Order Successful - Check for the order successful message and order number
    await expect(page.locator('.order-completed')).toBeVisible();

    // WebShop | My Account Navigation - Click on Orders tab in My Account Navigation page
    await page.locator('a[href="/customer/orders"]').click();

    // Webshop | Order Details - Check the Order Details
    await expect(page.locator('.order-details')).toBeVisible();
    await page.waitForLoadState('networkidle');

    // CloseBrowser - Close Web Shop
    await page.close();
  });
});