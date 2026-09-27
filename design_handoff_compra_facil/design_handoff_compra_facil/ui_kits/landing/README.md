# Landing — UI kit
Marketing landing for Comprá Fácil. Mobile-first, reflows to desktop at 760 / 960px.

Sections, in order: `LandingNav` (sticky glass bar; wordmark fades in after the hero) · `LandingHero` (basket mark + neon COMPRÁ FÁCIL, glowing "EXPLORÁ TU CIUDAD", copy, search + "abrir mapa" in one row, 3D scene slot) · `LandingOffers` (OFERTAS DESTACADAS DE TU ZONA + LocationRow + OfferCard carousel) · `LandingCatalog` (CATÁLOGO VIRTUAL, 3 CatalogCards) · `LandingMostRequested` (MÁS SOLICITADOS + LocationRow + services/emprendimientos carousel) · `LandingNearby` (CERCA TUYO, swipeable store carousel) · `LandingJoin` ("Sumá tu comercio") · `LandingFooter`.

All CTAs deep-link into `../map-app/index.html?type=…&id=…`.

**Source note:** no production code or Figma was provided; layout is composed from the written brand brief. The 3D hero scene (Kenney City Kit) is built separately in code and is left as a labelled transparent slot. Sample businesses in `data.js` are fictional.