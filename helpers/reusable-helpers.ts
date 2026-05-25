import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { addMonths, format } from 'date-fns';

export async function logInScenario(
  page: Page,
  params: { URL: string; Email: string; Password: string }
): Promise<void> {
  await page.goto(params.URL);
  await page.waitForLoadState('networkidle');
  
  await page.waitForLoadState('domcontentloaded');
  
  await expect(page.locator('.ico-login')).toBeVisible();
  
  await page.locator('.ico-login').click();
  await page.waitForLoadState('networkidle');
  
  await page.locator('#Email').fill(params.Email);
  
  await page.locator('#Password').fill(params.Password);
  
  await page.locator('input[value="Log in"]').click();
  await page.waitForLoadState('networkidle');
}

export async function orderProduct(
  page: Page,
  params: { ProductLinkName: string; Quantity: string }
): Promise<void> {
  await page.locator('#small-searchterms').fill(params.ProductLinkName);
  
  await page.locator('input[type="submit"][value="Search"]').click();
  
  await page.waitForLoadState('networkidle');
  
  await page.locator('#addtocart_5_EnteredQuantity').fill(params.Quantity);
  
  await page.locator('#add-to-cart-button-5').click();
  await page.waitForLoadState('networkidle');
}

export async function checkoutProcess(
  page: Page,
  params: { ShippingMethod: string; PaymentMethod: string }
): Promise<void> {
  await page.locator('#termsofservice').click();
  await page.waitForLoadState('networkidle');
  
  await page.locator('#checkout').click();
  await page.waitForLoadState('networkidle');
  
  await page.locator('input[onclick="Shipping.save()"]').click();
  await page.waitForLoadState('networkidle');
  
  await page.locator('input[onclick="PaymentMethod.save()"]').click();
  await page.waitForLoadState('networkidle');
  
  await page.locator('#CreditCardType').selectOption('Visa');
  
  await page.locator('#CardholderName').fill(faker.string.alpha(10));
  
  await page.locator('#CardNumber').fill('4485564059489345');
  
  await page.locator('#ExpireMonth').fill(format(addMonths(new Date(), 4), 'MM'));
  
  await page.locator('#ExpireYear').fill(format(addMonths(new Date(), 0), 'yyyy'));
  
  await page.locator('#CardCode').fill(faker.number.int({ min: 100, max: 999 }).toString());
  
  await page.locator('input[onclick="PaymentInfo.save()"]').click();
  await page.waitForLoadState('networkidle');
}

export async function confirmation(page: Page): Promise<void> {
  await page.locator('input[value="Confirm"]').click();
  await page.waitForLoadState('networkidle');
}