const { test, expect } = require('@playwright/test');

test.describe('Teste End-to-End: Exemplo no The Internet', () => {

  test('Login com credenciais válidas', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/login');

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    
    await page.click('button[type="submit"]');

    const successMessage = page.locator('.flash.success');
    await expect(successMessage).toContainText('You logged into a secure area!');
  });

  test('Login com credenciais inválidas', async ({ page }) => {
    
    await page.goto('https://the-internet.herokuapp.com/login');

    await page.fill('#username', 'usuario_invalido');
    await page.fill('#password', 'senha_incorreta');

    await page.click('button[type="submit"]');

    const errorMessage = page.locator('.flash.error');
    await expect(errorMessage).toContainText('Your username is invalid!');
  });

  test('Logout do usuário', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    await page.click('a[href="/logout"]');

    const logoutMessage = page.locator('.flash.success');
    await expect(logoutMessage).toContainText('You logged out of the secure area!');
  });
});
