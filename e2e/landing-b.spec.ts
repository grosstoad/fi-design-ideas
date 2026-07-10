import { expect, test } from "@playwright/test";

const PAGE = "/landing-b";

test("landing B keeps the complete hero and two lender rows above the fold", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Explicit desktop viewport acceptance test");

  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 1280, height: 800 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto(PAGE);
    await page.waitForTimeout(450);

    await expect(page.getByRole("navigation", { name: "Main" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1, name: "Find the home you can really afford." })).toBeVisible();
    await expect(page.getByText("Compare what you could borrow across 14+ lenders, based on real lender rules, rates and purchase costs.")).toBeVisible();
    await expect(page.locator(".lpb-hero-actions").getByRole("link", { name: "Run your scenario" })).toBeVisible();
    await expect(page.getByRole("link", { name: "See how it works" })).toBeVisible();
    await expect(page.getByText("Free. No impact on your credit score.")).toBeVisible();
    await expect(page.locator(".lpb-module-head")).toBeVisible();

    const secondRowBottom = await page.locator(".lpb-comparison-row").nth(1).evaluate(
      (row) => row.getBoundingClientRect().bottom
    );
    expect(secondRowBottom).toBeLessThanOrEqual(viewport.height);
  }
});

test("landing B range rows stay inert and the slider updates every numeric output monotonically", async ({ page }) => {
  await page.goto(PAGE);
  const comparison = page.getByLabel("Illustrative lender comparison");
  const rows = comparison.locator(".lpb-comparison-row");

  await expect(rows).toHaveCount(14);
  await expect(comparison.locator("button")).toHaveCount(0);
  await expect(rows.first()).toHaveCSS("pointer-events", "none");
  await expect(page.locator(".lpb-comparison-head").getByText("Monthly repayment")).toHaveCount(1);
  await expect(page.getByText("The maximum property price you could afford.")).toBeVisible();

  const snapshot = async () => Object.fromEntries(await rows.evaluateAll((nodes) => nodes.map((node) => {
    const name = node.querySelector(".lpb-lender-cell")?.textContent?.trim() ?? "";
    const ratio = Number.parseFloat((node.querySelector(".lpb-row-fill") as HTMLElement)?.style.getPropertyValue("--lpb-bar-ratio") ?? "0");
    const metrics = [...node.querySelectorAll(".lpb-num")].map((metric) => metric.textContent?.trim() ?? "");
    return [name, { ratio, metrics }];
  })));

  const before = await snapshot();
  const slider = page.locator("#lpb-income");
  await expect(slider).toHaveAttribute("max", "1000000");
  await slider.dispatchEvent("pointerdown");
  await slider.fill("1000000");
  await expect(rows.locator(".lpb-lender-cell").first()).toHaveText("Macquarie");
  await slider.dispatchEvent("pointerup");
  await slider.fill("300000");
  await page.waitForTimeout(450);
  const after = await snapshot();

  await expect(slider).toHaveAttribute("aria-valuetext", "$300,000 household income a year");
  await expect(page.locator(".lpb-module-range")).toContainText("$1.79M");
  for (const [name, result] of Object.entries(after)) {
    expect(result.ratio, `${name} bar should not shrink`).toBeGreaterThanOrEqual(before[name].ratio);
    expect(result.metrics.at(-1), `${name} repayment format`).toMatch(/^\$[\d,]+\/mth$/);
  }

  const lenderColours = await rows.evaluateAll((nodes) => nodes.map((node) =>
    getComputedStyle(node.querySelector(".lpb-row-fill")!).backgroundColor
  ));
  expect(new Set(lenderColours).size).toBeGreaterThan(8);
  await expect(page.locator(".lpb-module-range > span")).toHaveCSS("color", "rgb(17, 17, 17)");

  await expect(page.getByText("Example comparison", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("button", { name: /view all 14 lenders/i })).toHaveCount(0);

  await comparison.evaluate((node) => { node.scrollTop = node.scrollHeight; });
  const box = await comparison.boundingBox();
  if (!box) throw new Error("Comparison list has no bounding box");
  await page.mouse.move(box.x + box.width / 2, box.y + box.height - 4);
  const pageBefore = await page.evaluate(() => window.scrollY);
  await page.mouse.wheel(0, 700);
  await page.waitForTimeout(100);
  const pageAfter = await page.evaluate(() => window.scrollY);
  expect(pageAfter).toBeGreaterThan(pageBefore);

  const assumptionsTrigger = page.getByRole("button", { name: "How we worked this out" });
  await assumptionsTrigger.click();
  await expect(page.getByRole("dialog", { name: "How this example was worked out" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(assumptionsTrigger).toBeFocused();
});

test("landing B lender proof is contained, seamless and never pauses on hover", async ({ page }) => {
  await page.goto(PAGE);
  const proof = page.locator(".lpb-lender-proof");
  await proof.scrollIntoViewIfNeeded();
  const marquee = proof.locator(".lpb-lender-marquee");
  const track = proof.locator(".lpb-lender-track");
  const primaryRail = proof.locator(".lpb-lender-rail:not([aria-hidden])");

  await expect(primaryRail.locator(".lpb-lender-mark")).toHaveCount(14);
  await expect(page.getByRole("button", { name: /pause logos/i })).toHaveCount(0);
  await expect(track).toHaveCSS("animation-play-state", "running");
  await marquee.hover();
  await expect(track).toHaveCSS("animation-play-state", "running");

  const railWidths = await proof.locator(".lpb-lender-rail").evaluateAll((rails) => rails.map(
    (rail) => Math.round(rail.getBoundingClientRect().width)
  ));
  expect(railWidths[0]).toBe(railWidths[1]);

  const contained = await proof.evaluate((section) => {
    const wrap = section.querySelector(".lpb-wrap")!.getBoundingClientRect();
    const strip = section.querySelector(".lpb-lender-marquee")!.getBoundingClientRect();
    return strip.left >= wrap.left && strip.right <= wrap.right;
  });
  expect(contained).toBe(true);

  await expect.poll(async () => primaryRail.locator("img").evaluateAll(
    (images) => images.filter((image) => !(image instanceof HTMLImageElement) || image.naturalWidth === 0).length
  )).toBe(0);
});

test("landing B walkthrough shares live scenario controls across three equal product states", async ({ page }) => {
  await page.goto(PAGE);
  const how = page.locator("#how-it-works");
  await how.scrollIntoViewIfNeeded();

  await expect(how.locator(".lpb-step-column")).toHaveCount(3);
  await expect(how.locator("button")).toHaveCount(0);
  await expect(how.getByRole("heading", { name: "Add your details" })).toBeVisible();
  await expect(how.getByRole("heading", { name: "Compare lender results" })).toBeVisible();
  await expect(how.getByRole("heading", { name: "Understand your costs" })).toBeVisible();

  await expect(how).toHaveClass(/lpb-how--phase-8/, { timeout: 7000 });
  await expect(how.locator(".lpb-connected-steps > li.is-complete")).toHaveCount(3);
  await page.waitForTimeout(500);
  await expect(how).toHaveClass(/lpb-how--phase-8/);

  await expect(how.getByText("Funding breakdown")).toBeVisible();
  await expect(how.getByText("Loan from CommBank (83% LVR)")).toBeVisible();
  await expect(how.getByText("Deposit")).toBeVisible();
  await expect(how.getByText("Savings left over")).toBeVisible();

  const sharedIncome = how.getByLabel("Household income");
  await expect(sharedIncome).toHaveValue("145,000");
  await page.locator("#lpb-income").fill("300000");
  await expect(sharedIncome).toHaveValue("300,000");
  await expect(how.locator(".lpb-mini-head")).toContainText("$1.06M–$1.79M");

  await how.getByLabel("Buying purpose").selectOption("investor");
  await how.getByLabel("Property location").selectOption("VIC");
  await how.getByLabel("Savings").fill("250000");
  await expect(how.getByText(/investment property$/)).toBeVisible();

  const previewHeights = await how.locator(".lpb-step-visual > *").evaluateAll((elements) =>
    elements.map((element) => Math.round(element.getBoundingClientRect().height))
  );
  expect(Math.max(...previewHeights) - Math.min(...previewHeights)).toBeLessThanOrEqual(1);

  if ((await page.viewportSize())!.width <= 820) {
    await expect(how.locator(".lpb-connected-steps")).toHaveCSS("grid-template-columns", /\d+px/);
  }
});

test("landing B renders final reduced-motion states without losing slider function", async ({ browser }, testInfo) => {
  const viewport = testInfo.project.name === "mobile"
    ? { width: 393, height: 852 }
    : { width: 1340, height: 900 };
  const context = await browser.newContext({
    baseURL: "http://127.0.0.1:5173",
    viewport,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(PAGE);

  await expect(page.locator(".lpb-h1")).toHaveCSS("animation-name", "none");
  await expect(page.locator("#how-it-works")).toHaveClass(/lpb-how--phase-8/);
  await expect(page.locator(".lpb-connected-steps > li.is-complete")).toHaveCount(3);
  await expect(page.locator(".lpb-lender-track")).toHaveCSS("animation-name", "none");
  await expect(page.locator(".lpb-lender-rail:not([aria-hidden])")).toHaveCSS("flex-wrap", "wrap");
  await expect(page.locator(".lpb-lender-rail[aria-hidden='true']")).toBeHidden();

  const before = await page.locator(".lpb-module-range").textContent();
  await page.locator("#lpb-income").fill("300000");
  const after = await page.locator(".lpb-module-range").textContent();
  expect(after).not.toBe(before);
  await context.close();
});

test("landing B final content, assets and responsive layout have no overflow", async ({ page }) => {
  await page.goto(PAGE);

  await expect(page.locator("#ceiling")).toHaveCount(0);
  await expect(page.locator("main > .lpb-costs")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "A borrowing number you can trust." })).toBeVisible();
  await expect(page.getByText("Your personalised borrowing range is only a few minutes away.")).toBeVisible();
  await expect(page.getByText("© 2026 Ask Fundora")).toBeVisible();
  await expect(page.getByText("Not financial advice")).toBeVisible();

  await page.locator(".lpb-propositions").scrollIntoViewIfNeeded();
  await expect.poll(async () => page.locator(".lpb-proposition-art img").evaluateAll(
    (images) => images.filter((image) => !(image instanceof HTMLImageElement) || image.naturalWidth === 0).length
  )).toBe(0);

  const metrics = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    background: getComputedStyle(document.querySelector(".lpb-page")!).backgroundColor,
    clickableRows: [...document.querySelectorAll(".lpb-comparison-row")].filter(
      (row) => getComputedStyle(row).cursor === "pointer"
    ).length,
  }));
  expect(metrics.overflow).toBeLessThanOrEqual(0);
  expect(metrics.background).toBe("rgb(255, 255, 255)");
  expect(metrics.clickableRows).toBe(0);
});
