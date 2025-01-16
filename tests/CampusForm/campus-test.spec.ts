import { test, expect } from '@playwright/test';
import { readDataFromJson } from './read-campus'; // Assurez-vous que le chemin est correct

// Charger les données depuis le fichier JSON
const filePath = 'tests/CampusForm/campus-data.json';
const testData = readDataFromJson(filePath);

// Test pour le premier cas (Étudiants)
test('Campus France Form - Student', async ({ page }) => {
  const entry = testData[0]; // Première entrée du JSON

  // await page.goto(entry.Url);
  // await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto(entry.Url, { waitUntil: 'domcontentloaded' });
  await page.setViewportSize({ width: 1900, height: 1080 }); // Maximiser la fenêtre

  await page.locator('#tarteaucitronPersonalize2').click();

  // Remplir le formulaire
  // await page.fill('#edit-name', entry.Email);
  await page.fill('input.username', entry.Email);

  
  
  await page.fill('#edit-pass-pass1', entry.Password);
  await page.fill('#edit-pass-pass2', entry.Confirm_password);
  await page.locator(`label[for='edit-field-civilite-${entry.Gender}']`).click();
  await page.fill('#edit-field-prenom-0-value', entry.Firstname);
  await page.fill('#edit-field-nom-0-value', entry.Lastname);
  // await page.locator('#edit-field-pays-concernes-selectized').click();
  // await page.locator(`.selectize-dropdown-content div:text("${entry.Country}")`).click();
  //countryy 
  // Effacer le contenu existant avant d'écrire
  const countryInput = page.locator('#edit-field-pays-concernes-selectized');
  await countryInput.click(); // Activer le champ
  await countryInput.press('Control+A'); // Sélectionner tout le texte (ou 'Meta+A' sur Mac)
  await countryInput.press('Backspace'); // Effacer le contenu
  // Saisir le pays dans le champ
  await countryInput.fill(entry.Country);
  // Attendre que les options s'affichent
  await page.waitForSelector('.selectize-dropdown-content');
  // Cliquer sur l'option exacte correspondant au pays
  //await page.locator(`.selectize-dropdown-content div.option`, { hasText: entry.Country }).click();
  // Cliquer sur l'option exacte correspondant au pays
  await page.locator('.selectize-dropdown-content div.option')
  .filter({ hasText: entry.Country, })
  .first() // Si plusieurs correspondances exactes, prendre la première
  .click();
  await page.fill('#edit-field-code-postal-0-value', entry.Postal_code);
  await page.fill('#edit-field-ville-0-value', entry.City);
  await page.fill('#edit-field-telephone-0-value', entry.Phone);

  // Sélectionner et cliquer sur le bouton radio correspondant au statut
  // const statusId = entry.Status === "Étudiants" 
  // ? "edit-field-publics-cibles-2" 
  // : entry.Status === "Chercheurs" 
  // ? "edit-field-publics-cibles-3" 
  // : entry.Status === "Institutionnel" 
  // ? "edit-field-publics-cibles-4" 
  // : (() => { throw new Error("Statut inconnu : " + entry.Status); })();

  // Cliquer sur le label associé au bouton radio
  await page.locator(`label[for="edit-field-publics-cibles-2"]`).click();


  // Traiter les champs spécifiques pour les étudiants
  
// Domaine d'études
  const domainInput = page.locator('#edit-field-domaine-etudes-selectized');
  await domainInput.click(); // Cliquer pour activer le champ
  await domainInput.press('Control+A'); // Sélectionner tout le texte (ou 'Meta+A' sur Mac)
  await domainInput.press('Backspace'); // Effacer le contenu
  await domainInput.fill(entry.Domain); // Saisir le domaine
  const domainOption = page.locator(`.selectize-dropdown-content div:text("${entry.Domain}")`);
  await domainOption.click(); // Cliquer sur l'option correspondante

  // await page.fill('#edit-field-domaine-etudes-selectized', entry.Domain);
  // await page.locator(`.selectize-dropdown-content div:text("${entry.Domain}")`).click();
  await page.fill('#edit-field-niveaux-etude-selectized', entry.Level);
  await page.locator(`.selectize-dropdown-content div:text("${entry.Level}")`).click();
  

  

  // Accepter les termes et conditions
  if (entry.Accept == true) {
    await page.check('label[for="edit-field-accepte-communications-value"]');
  }

  // Soumettre le formulaire
  //await page.locator('#edit-actions').click();

  ;

  console.log(`Formulaire soumis avec succès pour ${entry.Email}`);
});


// Test pour le deuxième cas (Chercheurs)
test('Campus France Form - PhD Student', async ({ page }) => {
  const entry = testData[1]; // Deuxième entrée du JSON

  await page.goto(entry.Url);

  // Remplir le formulaire
  await page.fill('input.username', entry.Email);
  await page.fill('#edit-pass-pass1', entry.Password);
  await page.fill('#edit-pass-pass2', entry.Confirm_password);
  await page.locator(`label[for='edit-field-civilite-${entry.Gender}']`).click();
  await page.fill('#edit-field-prenom-0-value', entry.Firstname);
  await page.fill('#edit-field-nom-0-value', entry.Lastname);

  await page.locator('#edit-field-pays-concernes-selectized').click();
  //countryy 
  // Effacer le contenu existant avant d'écrire
  const countryInput = page.locator('#edit-field-pays-concernes-selectized');
  await countryInput.click(); // Activer le champ
  await countryInput.press('Control+A'); // Sélectionner tout le texte (ou 'Meta+A' sur Mac)
  await countryInput.press('Backspace'); // Effacer le contenu
  // Saisir le pays dans le champ
  await countryInput.fill(entry.Country);
  // Attendre que les options s'affichent
  await page.waitForSelector('.selectize-dropdown-content');
  // Cliquer sur l'option exacte correspondant au pays
  //await page.locator(`.selectize-dropdown-content div.option`, { hasText: entry.Country }).click();
  // Cliquer sur l'option exacte correspondant au pays
  await page.locator('.selectize-dropdown-content div.option')
  .filter({ hasText: entry.Country, })
  .first() // Si plusieurs correspondances exactes, prendre la première
  .click();



  //await page.locator(`.selectize-dropdown-content div:text("${entry.Country}")`).click();
  await page.fill('#edit-field-code-postal-0-value', entry.Postal_code);
  await page.fill('#edit-field-ville-0-value', entry.City);
  await page.fill('#edit-field-telephone-0-value', entry.Phone);

  // Cliquer sur le label associé au bouton radio statut 
  await page.locator(`label[for="edit-field-publics-cibles-3"]`).click();
  // Traiter les champs spécifiques pour les chercheurs
  // await page.fill('#edit-field-domaine-etudes-selectized', entry.Domain);
  // await page.locator(`.selectize-dropdown-content div:text("${entry.Domain}")`).click();

  // Domaine d'études
  const domainInput = page.locator('#edit-field-domaine-etudes-selectized');
  await domainInput.click(); // Cliquer pour activer le champ
  await domainInput.press('Control+A'); // Sélectionner tout le texte (ou 'Meta+A' sur Mac)
  await domainInput.press('Backspace'); // Effacer le contenu
  await domainInput.fill(entry.Domain); // Saisir le domaine
  const domainOption = page.locator(`.selectize-dropdown-content div:text("${entry.Domain}")`);
  await domainOption.click(); // Cliquer sur l'option correspondante
  await page.fill('#edit-field-niveaux-etude-selectized', entry.Level);
  await page.locator(`.selectize-dropdown-content div:text("${entry.Level}")`).click();

  // Accepter les termes et conditions
  if (entry.Accept) {
    await page.check('label[for="edit-field-accepte-communications-value"]');
  }

  // Soumettre le formulaire
  //await page.locator('#edit-actions').click();

  

  console.log(`Formulaire soumis avec succès pour ${entry.Email}`);
});

// Test pour le troisième cas (Institutionnel)
test('Campus France Form - Institutionnel', async ({ page }) => {
  const entry = testData[2]; // Troisième entrée du JSON

  await page.goto(entry.Url);
  await page.setViewportSize({ width: 1900, height: 1080 });

  // Remplir le formulaire
  await page.fill('input.username', entry.Email);
  await page.fill('#edit-pass-pass1', entry.Password);
  await page.fill('#edit-pass-pass2', entry.Confirm_password);
  await page.locator(`label[for='edit-field-civilite-${entry.Gender}']`).click();
  await page.fill('#edit-field-prenom-0-value', entry.Firstname);
  await page.fill('#edit-field-nom-0-value', entry.Lastname);
  await page.locator('#edit-field-pays-concernes-selectized').click();
  await page.locator(`.selectize-dropdown-content div:text("${entry.Country}")`).click();
  await page.fill('#edit-field-code-postal-0-value', entry.Postal_code);
  await page.fill('#edit-field-ville-0-value', entry.City);
  await page.fill('#edit-field-telephone-0-value', entry.Phone);

  // Cliquer sur le label associé au bouton radio statut 
  await page.locator(`label[for="edit-field-publics-cibles-4"]`).click();
  // Traiter les champs spécifiques pour les institutionnels
  

  await page.fill('#edit-field-fonction-0-value', entry.Fonction);
  //TypeOrganisme 
  // Type d'organisme
  // // Localiser le champ de saisie visible (simulé)
  // const TypeOrganismeInput = page.locator('.selectize-control.form-select.single');
  // await TypeOrganismeInput.click(); // Cliquer sur le champ pour activer le menu déroulant

  // // Attendre que le menu déroulant s'affiche
  // await page.waitForSelector('.selectize-dropdown-content', { state: 'visible' });

  // // Sélectionner l'option correspondant à `entry.TypeOrganisme`
  // const TypeOrganismeOption = page.locator('.selectize-dropdown-content .option', {
  //   hasText: entry.TypeOrganisme,
  // });
  // await TypeOrganismeOption.click(); // Cliquer sur l'option


  await page.fill('#edit-field-type-organisme-selectized', entry.TypeOrganisme);
  await page.locator(`.selectize-dropdown-content div:text("${entry.TypeOrganisme}")`).click();
  await page.fill('#edit-field-nom-organisme-0-value', entry.OrganismeName);

  // Accepter les termes et conditions
  if (entry.Accept == true) {
    await page.check('label[for="edit-field-accepte-communications-value"]');
  }

  // Soumettre le formulaire
  //await page.locator('#edit-actions').click();


  console.log(`Formulaire soumis avec succès pour ${entry.Email}`);
});
