import { expect, test } from '@playwright/test';

test.describe('InnCash E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://inn.cash/', {
      waitUntil: 'domcontentloaded'
    });
  });

  test('deve carregar a página inicial com a chamada principal', async ({
    page
  }) => {
    await expect(page).toHaveTitle(/Automação Financeira para Empresas/i);
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: /Automação Financeira para quem precisa de controle/i
      })
    ).toBeVisible();
  });

  test('deve exibir as principais soluções financeiras', async ({ page }) => {
    const solutionHeadings = [
      'Pagamentos',
      'Recebimentos',
      'Cobranças',
      'Conciliação Bancária',
      'Fluxo de Caixa'
    ];

    for (const name of solutionHeadings) {
      await expect(
        page.locator('#solucoes').getByRole('heading', { name, exact: true })
      ).toBeVisible();
    }
  });

  test('deve direcionar o CTA para a seção de contato', async ({ page }) => {
    await page.getByRole('link', { name: /Fale com um especialista/i }).click();

    await expect(page).toHaveURL(/#form$/);
    await expect(page.locator('#form')).toBeVisible();
  });
});
