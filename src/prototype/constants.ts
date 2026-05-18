export const chrome = {
  railWidth: 76,
  headerHeight: 56,
  searchWidth: 540,
  searchHeight: 40,
  searchFocusHeight: 56,
  actionHeight: 40,
  actionHoverGrow: 4,
  radiusPill: 999,
  radiusControl: 24,
  radiusPanel: 12,
  railShadow: "2px 0 8px rgba(0,0,0,0.08)",
  hoverShadow: "2px 2px 8px rgba(0,0,0,0.08)",
  panelShadow: "0 16px 40px rgba(0,0,0,0.14)",
  transitionMs: 220,
  pageGradient: "linear-gradient(105deg, #c8d4d8 0%, #d9d2d8 55%, #e3cfcf 100%)"
};

export type DemoWiki = "aesthetics" | "wookieepedia" | "fakePure";
export type AppearanceMode = "light" | "dark";
export type DemoArticleContent = {
  kicker: string;
  headline: string;
  intro: string;
  body: string;
  sectionTitle: string;
  bullets: string[];
  noteLead: string;
};

export const demoWikis: Record<
  DemoWiki,
  {
    label: string;
    wikiName: string;
    community: string;
    pageTitle: string;
    article: DemoArticleContent;
    light: { label: string; headerBg: string; railBg: string; text: string; contentText: string; pageGradient: string };
    dark: { label: string; headerBg: string; railBg: string; text: string; contentText: string; pageGradient: string };
  }
> = {
  aesthetics: {
    label: "Aesthetics",
    wikiName: "VSCO Girl",
    community: "Aesthetics Wiki",
    pageTitle: "Cottagecore",
    article: {
      kicker: "Aesthetics Wiki",
      headline: "Cottagecore",
      intro:
        "Cottagecore is an internet aesthetic inspired by pastoral life, handmade routines, soft florals, and a romanticized sense of retreat.",
      body:
        "The visual language often mixes garden imagery, handwritten textures, vintage rooms, and gentle color palettes. It sits close to fairycore, goblincore, and light academia while keeping a softer domestic focus.",
      sectionTitle: "Common visuals",
      bullets: ["Pressed flowers and picnic blankets.", "Lace, linen, gingham, and worn paper.", "Sunlit kitchens, gardens, fields, and forest paths."],
      noteLead: "Aesthetics entries tend to collect reference images, adjacent microstyles, and community labels."
    },
    light: {
      label: "Aesthetics light bg nav",
      headerBg: "#F1C9EB",
      railBg: "#fbfbfb",
      text: "#2d2030",
      contentText: "#7b5b7a",
      pageGradient:
        "radial-gradient(circle at 14% 24%, rgba(255,210,126,0.42) 0 7%, transparent 8%), linear-gradient(90deg, rgba(176,126,184,0.18) 1px, transparent 1px), linear-gradient(0deg, rgba(176,126,184,0.18) 1px, transparent 1px), linear-gradient(105deg, #f7d7f1 0%, #efc7ea 48%, #f6dfef 100%)"
    },
    dark: {
      label: "Aesthetics dark bg nav",
      headerBg: "#32133A",
      railBg: "#151515",
      text: "#fff5ff",
      contentText: "rgba(255,224,251,0.70)",
      pageGradient:
        "radial-gradient(circle at 14% 24%, rgba(255,111,210,0.23) 0 7%, transparent 8%), linear-gradient(90deg, rgba(255,210,251,0.12) 1px, transparent 1px), linear-gradient(0deg, rgba(255,210,251,0.12) 1px, transparent 1px), linear-gradient(105deg, #4b1d55 0%, #733472 50%, #3b173f 100%)"
    }
  },
  wookieepedia: {
    label: "Wookiepedia",
    wikiName: "Wookieepedia",
    community: "A Fake Wiki",
    pageTitle: "In a galaxy far, far away...",
    article: {
      kicker: "Wookieepedia",
      headline: "Jedi mind tricks",
      intro:
        "Jedi mind tricks were Force techniques used to influence weak-minded targets, redirect attention, and move through tense encounters without open conflict.",
      body:
        "Across the Star Wars galaxy, these moments usually read as quiet pressure instead of spectacle: a hand gesture, a calm phrase, and a guard suddenly convinced that nothing unusual is happening.",
      sectionTitle: "Known patterns",
      bullets: ["Most effective against distracted or suggestible targets.", "Often paired with diplomacy, stealth, or quick escapes.", "Less reliable against trained opponents and strong-willed species."],
      noteLead: "Wookieepedia pages tend to lean into continuity, in-universe terminology, and dense cross-references."
    },
    light: {
      label: "Wookieepedia light bg nav",
      headerBg: "#56563C",
      railBg: "#fbfbfb",
      text: "#ffffff",
      contentText: "#575a42",
      pageGradient:
        "radial-gradient(circle at 52% -10%, rgba(202,216,151,0.36) 0 15%, transparent 28%), linear-gradient(105deg, #e8ecd3 0%, #dfe4c8 54%, #f2eedc 100%)"
    },
    dark: {
      label: "Wookieepedia dark bg nav",
      headerBg: "#2A2B22",
      railBg: "#151515",
      text: "#fff4e2",
      contentText: "rgba(225,231,198,0.68)",
      pageGradient:
        "radial-gradient(circle at 52% -10%, rgba(186,203,128,0.30) 0 15%, transparent 28%), linear-gradient(105deg, #24261d 0%, #1f2018 54%, #171810 100%)"
    }
  },
  fakePure: {
    label: "FakePure",
    wikiName: "Pure White BG on the Nav",
    community: "A Fake Wiki",
    pageTitle: "Pure White BG on the Nav",
    article: {
      kicker: "Prototype Wiki",
      headline: "Pure White BG on the Nav",
      intro:
        "This neutral demo keeps the page intentionally plain so the white navigation treatment remains easy to inspect.",
      body:
        "It preserves the original placeholder rhythm and avoids introducing a strong wiki identity.",
      sectionTitle: "Overview",
      bullets: ["Simple content area for scroll behavior.", "Plain wiki-page rhythm with minimal formatting.", "Enough height to exercise initial and scrolled states."],
      noteLead: "The navigation stays fixed while the article moves beneath it."
    },
    light: {
      label: "FakePure #fff bg nav",
      headerBg: "#ffffff",
      railBg: "#ffffff",
      text: "#242428",
      contentText: "#6c6c70",
      pageGradient: "linear-gradient(105deg, #cbd6da 0%, #dad7d9 56%, #e6dcdc 100%)"
    },
    dark: {
      label: "FakePure #000 bg nav",
      headerBg: "#000000",
      railBg: "#151515",
      text: "#f7f7f7",
      contentText: "rgba(255,255,255,0.58)",
      pageGradient: "linear-gradient(105deg, #517586 0%, #696875 50%, #945f63 100%)"
    }
  }
};

const hexToRgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  const value = parseInt(
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized,
    16
  );

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255
  };
};

export const getRelativeLuminance = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  const channel = (value: number) => {
    const next = value / 255;
    return next <= 0.03928 ? next / 12.92 : Math.pow((next + 0.055) / 1.055, 2.4);
  };

  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

export const getOverlay = (background: string) => {
  const luminance = getRelativeLuminance(background);
  const nearPureWhite = luminance > 0.965;
  const isLight = luminance > 0.35;

  // Explicit threshold for the white-nav exception: near-pure white gets black overlay,
  // while colored and dark navs keep the white overlay treatment from the mocks.
  if (nearPureWhite) {
    return {
      kind: "black",
      gradient: "linear-gradient(120deg, rgba(0,0,0,0.02), rgba(0,0,0,0.01))"
    };
  }

  if (isLight) {
    return {
      kind: "white",
      gradient: "linear-gradient(120deg, rgba(255,255,255,0.55), rgba(255,255,255,0.45))"
    };
  }

  return {
    kind: "white",
    gradient: "linear-gradient(120deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))"
  };
};
