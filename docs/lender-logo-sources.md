# Lender logo sources

The carousel logo files below are local copies of current assets served by each lender's official website. They were retrieved on 10 July 2026 and are not loaded remotely at runtime.

| Lender | Local file | Official source |
| --- | --- | --- |
| CommBank | `src/assets/buying-range/lenders/commbank.svg` | [CommBank header logo SVG](https://www.commbank.com.au/content/dam/commbank/commBank-logo.svg) |
| Bankwest | `src/assets/buying-range/lenders/bankwest.svg` | [Bankwest logo SVG](https://www.bankwest.com.au/content/dam/bankwest/system/logos/bankwest-logo.svg) |
| Suncorp Bank | `src/assets/buying-range/lenders/suncorp-bank.png` | [Suncorp Bank 2x header logo](https://www.suncorpbank.com.au/content/dam/suncorp/corporate/images/logos/updated-suncorp-bank-198x40-2x.png) |
| Bendigo Bank | `src/assets/buying-range/lenders/bendigo-bank.png` | [Bendigo Bank brand logo](https://www.bendigobank.com.au/globalassets/globalresources/brand-logos/bendigobank-logo.png) |
| BOQ | `src/assets/buying-range/lenders/boq.svg` | [BOQ logo SVG](https://www.boq.com.au/media_1d1e2b624aed4905ccaf41152ce6e5f94d60e6d86.svg) |
| AMP | `src/assets/buying-range/lenders/amp.svg` | [AMP logo SVG](https://www.amp.com.au/content/dam/amp-2024/graphics/logos/amp-logo.svg) |
| HSBC | `src/assets/buying-range/lenders/hsbc.svg` | [HSBC Australia masterbrand SVG](https://www.hsbc.com.au/content/dam/hsbc/au/images/01_HSBC_MASTERBRAND_LOGO_RGB.svg) |
| ubank | `src/assets/buying-range/lenders/ubank.svg` | [ubank black logo SVG](https://www.ubank.com.au/assets/images/light/ubank-logo-black.svg) |
| NAB | `src/assets/buying-range/lenders/nab-symbol.svg` | [NAB header logo SVG](https://www.nab.com.au/etc.clientlibs/nab/clientlibs/clientlib-generated-components/resources/images/svg/nab-logo.svg) |

## Verification

- Every source is hosted on the lender's own primary Australian domain.
- All nine sourced files were visually inspected after local rendering; they contain complete, current marks or wordmarks with no cropping.
- The seven SVG files contain no scripts, JavaScript URLs, or external asset references.
- The CommBank SVG was rendered locally at 96px and remains sharp, replacing the carousel's reliance on the pre-existing 16×16 `cba.png` favicon.
- BOQ publishes the same SVG URL as its organization logo in the structured data on its homepage.
- The NAB symbol is a viewBox crop of the official header SVG's red star artwork. It removes the previous low-resolution app tile and its visible corner watermark while preserving the official vector paths and gradients.

## Pre-existing asset identity checks

The following PNGs pre-date this sourcing pass. Their original download URLs were not recorded, so the links below are current official identity references rather than claims that the local bytes came from those exact URLs. Visual checks confirm that the local marks match each lender's current official identity.

| Existing local file | Current official identity reference | Verification |
| --- | --- | --- |
| `src/assets/buying-range/lenders/westpac.png` | [Westpac 144px touch icon](https://www.westpac.com.au/etc/designs/wbc/clientlib-all/assets/brand/wbc/png/westpac-144x144.png) | Current red Westpac `W` mark. |
| `src/assets/buying-range/lenders/anz.png` | [ANZ 128px site icon](https://www.anz.com.au/apps/settings/wcm/designs/commons/images/appicons/favicon-128.png) | Current blue ANZ lotus mark. |
| `src/assets/buying-range/lenders/macquarie.png` | [Macquarie header logo SVG](https://www.macquarie.com.au/assets/bfs/global/Macquarie-logo.svg) | Current black Macquarie holey-dollar mark. |
| `src/assets/buying-range/lenders/ing.png` | [ING site logo](https://www.ing.com.au/img/logos/ing.webp) | Current orange ING lion identity. |
| `src/assets/buying-range/lenders/athena.png` | [Athena 128px site icon](https://www.athena.com.au/next-assets/favicons/favicon-128.png) and [Athena mark](https://static.athena.com.au/images/athena_logo_withoutwordmark.png) | Current magenta-to-red Athena `A` mark. |
