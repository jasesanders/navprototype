export const chrome = {
  railWidth: 96,
  headerHeight: 64,
  searchWidth: 540,
  searchHeight: 48,
  searchFocusHeight: 56,
  actionHeight: 48,
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

export const demoWikis: Record<
  DemoWiki,
  {
    label: string;
    wikiName: string;
    community: string;
    pageTitle: string;
    light: { label: string; headerBg: string; railBg: string; text: string; contentText: string; pageGradient: string };
    dark: { label: string; headerBg: string; railBg: string; text: string; contentText: string; pageGradient: string };
  }
> = {
  aesthetics: {
    label: "Aesthetics",
    wikiName: "VSCO Girl",
    community: "Aesthetics Wiki",
    pageTitle: "Han Solo or Whatever the Page Is",
    light: {
      label: "Aesthetics light bg nav",
      headerBg: "#ECD5F3",
      railBg: "#fbfbfb",
      text: "#25242b",
      contentText: "#6c6c70",
      pageGradient: "linear-gradient(105deg, #c8d4d8 0%, #d4d2d8 54%, #e0d0d1 100%)"
    },
    dark: {
      label: "Aesthetics dark bg nav",
      headerBg: "#291235",
      railBg: "#151515",
      text: "#f7f2fb",
      contentText: "rgba(255,255,255,0.58)",
      pageGradient: "linear-gradient(105deg, #517586 0%, #6a6875 50%, #965f63 100%)"
    }
  },
  wookieepedia: {
    label: "Wookiepedia",
    wikiName: "Wookieepedia",
    community: "A Fake Wiki",
    pageTitle: "Han Solo or Whatever the Page Is",
    light: {
      label: "Wookieepedia light bg nav",
      headerBg: "#524F37",
      railBg: "#fbfbfb",
      text: "#ffffff",
      contentText: "#6c6258",
      pageGradient: "linear-gradient(105deg, #c9d4d4 0%, #d6d0ce 55%, #e2d2ca 100%)"
    },
    dark: {
      label: "Wookieepedia dark bg nav",
      headerBg: "#2F2E27",
      railBg: "#151515",
      text: "#fff4e2",
      contentText: "rgba(255,244,226,0.62)",
      pageGradient: "linear-gradient(105deg, #527584 0%, #6b6871 50%, #986063 100%)"
    }
  },
  fakePure: {
    label: "FakePure",
    wikiName: "Pure White BG on the Nav",
    community: "A Fake Wiki",
    pageTitle: "Pure White BG on the Nav",
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
      gradient: "linear-gradient(120deg, rgba(0,0,0,0.08), rgba(0,0,0,0.04))"
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
