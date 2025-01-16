import { test, expect } from '@playwright/test';
import fs from 'fs';


// Charger les données des clients
const clients = JSON.parse(fs.readFileSync('tests/ClientInscription/client-data.json', 'utf-8'));

test.describe('Form Submission Tests', () => {
  test('SendManForm', async ({ page }) => {
    const client = clients[0];

    // Naviguer sur la page
    await page.goto('https://sendform.nicepage.io/?version=13efcba7-1a49-45a5-9967-c2da8ebdd189&uid=f7bd60f0-34c8-40e3-8e2c-06cc19fcb730');

    // Sélection bouton radio
    const radioButton = page.locator(`input[type='radio'][value='${client.genre}']`);
    if (!(await radioButton.isChecked())) {
      await radioButton.check();
    }

    // Sélection du pays
    await page.selectOption('#select-9648', client.Pays_de_naissance);

    // Remplir les champs texte
    await page.fill('#email-c6a3', client.Email);
    await page.fill('#name-c6a3', client.Name);
    await page.fill('#phone-84d9', client.Phone);
    await page.fill('#address-be2d', client.Address);
    await page.fill('#message-c6a3', client.Message);

    // Sélection du produit
    await page.selectOption('#select-c283', client.Product);

    // Cocher les cases de loisirs
    const checkboxLabel = await page.locator(`//label[contains(text(), '${client.loisir}')]`);
    const checkboxId = await checkboxLabel.getAttribute('for');
    if (checkboxId) {
      const checkbox = page.locator(`#${checkboxId}`);
      if (!(await checkbox.isChecked())) {
        await checkbox.check();
      }
    }

    // Soumettre le formulaire
    await page.locator('//*[@id="carousel_1853"]/div/div/div/div/form/div[12]/a').click();

    // Vérification du message de succès
    const successMessage = await page.locator('//div[contains(@class, "u-form-send-message") and contains(@class, "u-form-send-success")]').innerText();
    expect(successMessage).toContain('Thank you! Your message has been sent.');
  });

  test('SendWomanForm', async ({ page }) => {
    const client = clients[1];

    // Naviguer sur la page
    await page.goto('https://sendform.nicepage.io/?version=13efcba7-1a49-45a5-9967-c2da8ebdd189&uid=f7bd60f0-34c8-40e3-8e2c-06cc19fcb730');

    // Sélection bouton radio
    const radioButton = page.locator(`input[type='radio'][value='${client.genre}']`);
    if (!(await radioButton.isChecked())) {
      await radioButton.check();
    }

    // Sélection du pays
    await page.selectOption('#select-9648', client.Pays_de_naissance);

    // Remplir les champs texte
    await page.fill('#email-c6a3', client.Email);
    await page.fill('#name-c6a3', client.Name);
    await page.fill('#phone-84d9', client.Phone);
    await page.fill('#address-be2d', client.Address);
    await page.fill('#message-c6a3', client.Message);

    // Sélection du produit
    await page.selectOption('#select-c283', client.Product);

    // Cocher les cases de loisirs
    const checkboxLabel = await page.locator(`//label[contains(text(), '${client.loisir}')]`);
    const checkboxId = await checkboxLabel.getAttribute('for');
    if (checkboxId) {
      const checkbox = page.locator(`#${checkboxId}`);
      if (!(await checkbox.isChecked())) {
        await checkbox.check();
      }
    }

    // Soumettre le formulaire
    await page.locator('//*[@id="carousel_1853"]/div/div/div/div/form/div[12]/a').click();

    // Vérification du message de succès
    const successMessage = await page.locator('//div[contains(@class, "u-form-send-message") and contains(@class, "u-form-send-success")]').innerText();
    expect(successMessage).toContain('Thank you! Your message has been sent.');
  });
});
