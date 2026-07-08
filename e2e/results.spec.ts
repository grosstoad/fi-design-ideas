import { expect, test } from "@playwright/test";

test("desktop: select, sort, update details, broker success", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "desktop-only journey");
  await page.goto("/results");
  await expect(page.getByRole("option", { name: /1\. Macquarie/ })).toBeVisible();

  await page.getByRole("option", { name: /3\. NAB/ }).click();
  await expect(page.getByRole("heading", { name: "NAB" })).toBeVisible();
  await expect(page.locator(".rp-loan-setup strong").filter({ hasText: "Tailored Home Loan" })).toBeVisible();
  await expect(page.locator(".rp-loan-setup p").filter({ hasText: /Owner occupied · P&I · Variable · 30 years/ })).toBeVisible();

  const beforeHero = await page.locator(".rp-hero-figure").textContent();
  await page.getByRole("button", { name: "Sort" }).click();
  await page.getByRole("radio", { name: "Monthly repayment" }).click();
  await expect(page.getByText(/Macquarie remains the highest max price/)).toBeVisible();
  await expect(page.locator(".rp-hero-figure")).toHaveText(beforeHero ?? "");

  await page.getByRole("button", { name: "Update details" }).first().click();
  await page.getByRole("button", { name: /Loan details/ }).click();
  await page.getByLabel("Repayment type").selectOption("io");
  await expect(page.getByText("Interest-only term")).toBeVisible();
  await page.getByRole("button", { name: "Save and recalculate" }).click();
  await expect(page.locator(".rp-loan-setup p").filter({ hasText: "Interest only" })).toBeVisible();

  await page.getByRole("button", { name: "Update loan details" }).click();
  await expect(page.getByRole("heading", { name: "Update loan assumptions" })).toBeVisible();
  await page.locator(".rp-update-footer").getByRole("button", { name: "Cancel" }).click();

  await page.getByRole("button", { name: "Connect with a broker" }).click();
  await page.getByLabel("First name").fill("Sarah");
  await page.getByLabel("Last name").fill("Ng");
  await page.getByLabel("Mobile").fill("0400 123 456");
  await page.getByLabel("Email").fill("sarah@example.com");
  await page.getByRole("button", { name: "Actively looking" }).click();
  await page.getByLabel(/I agree/).click();
  await page.getByRole("button", { name: "Request a call back" }).click();
  await expect(page.getByText("You're all set, Sarah")).toBeVisible();
});

test("mobile: row opens sheet and close restores dock", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile-only journey");
  await page.goto("/results");
  await expect(page.getByRole("option", { name: /1\. Macquarie/ })).toBeVisible();
  await expect(page.locator(".rp-dock")).toBeVisible();
  await page.getByRole("option", { name: /2\. CBA/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator(".rp-dock")).toHaveCount(0);
  await page.locator(".rp-close-button").click();
  await expect(page.locator(".rp-dock")).toBeVisible();
});
