import { useEffect, useMemo, useRef, useState } from "react";
import { ActionBar } from "./components/ActionBar";
import { LeftRail } from "./components/LeftRail";
import { OverflowPopover } from "./components/OverflowPopover";
import { SearchControl } from "./components/SearchControl";
import { SearchPopover } from "./components/SearchPopover";
import { SettingsPopover } from "./components/SettingsPopover";
import { TopHeader } from "./components/TopHeader";
import { WikiNavPopover } from "./components/WikiNavPopover";
import { AppearanceMode, DemoWiki, chrome, demoWikis, getOverlay } from "./constants";

export function DesktopWikiChrome() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");
  const [isReturningInitial, setIsReturningInitial] = useState(false);
  const [demoWiki, setDemoWiki] = useState<DemoWiki>("aesthetics");
  const [appearance, setAppearance] = useState<AppearanceMode>("light");
  const [searchOpen, setSearchOpen] = useState(false);
  const [wikiNavOpen, setWikiNavOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [overflowOpen, setOverflowOpen] = useState(false);

  const wiki = demoWikis[demoWiki];
  const mode = wiki[appearance];
  const overlay = useMemo(() => getOverlay(mode.headerBg), [mode.headerBg]);
  const isDark = appearance === "dark";
  const lastScrollY = useRef(0);
  const returnTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0 });
    setIsScrolled(false);
    setScrollDirection("down");
    setIsReturningInitial(false);
    lastScrollY.current = 0;

    const onScroll = () => {
      const nextScrollY = window.scrollY;
      const nextIsScrolled = nextScrollY > 48;
      const nextDirection = nextScrollY >= lastScrollY.current ? "down" : "up";

      window.clearTimeout(returnTimer.current);
      setScrollDirection(nextDirection);
      setIsScrolled(nextIsScrolled);

      if (!nextIsScrolled && nextDirection === "up") {
        setIsReturningInitial(true);
        returnTimer.current = window.setTimeout(() => setIsReturningInitial(false), 125);
      } else {
        setIsReturningInitial(false);
      }

      lastScrollY.current = nextScrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(returnTimer.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setWikiNavOpen(false);
        setSettingsOpen(false);
        setOverflowOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div
      className={`prototype-shell ${isDark ? "is-dark" : "is-light"} is-${demoWiki} ${
        isScrolled ? "is-scrolled" : "is-initial"
      } is-scroll-${scrollDirection} ${isReturningInitial ? "is-returning-initial" : ""}`}
      style={
        {
          "--rail-width": `${chrome.railWidth}px`,
          "--header-height": `${chrome.headerHeight}px`,
          "--nav-bg": mode.headerBg,
          "--rail-bg": mode.railBg,
          "--nav-text": mode.text,
          "--primary-text": isDark ? "#E0E0E0" : "#2A2A29",
          "--secondary-text": isDark ? "#B5B5B4" : "#4D4D4C",
          "--content-label": mode.contentText,
          "--control-overlay": overlay.gradient,
          "--active-control-overlay":
            overlay.kind === "black"
              ? "linear-gradient(120deg, rgba(0,0,0,0.12), rgba(0,0,0,0.08))"
              : "linear-gradient(120deg, rgba(255,255,255,0.12), rgba(255,255,255,0.08))",
          "--active-control-text": isDark ? "#E0E0E0" : "#2A2A29",
          "--active-control-stroke": "rgba(255,255,255,0.25)",
          "--page-gradient": mode.pageGradient,
          "--transition-ms": `${chrome.transitionMs}ms`
        } as React.CSSProperties
      }
    >
      <LeftRail
        isDark={isDark}
        isScrolled={isScrolled}
        onSettingsClick={() => setSettingsOpen((value) => !value)}
        settingsOpen={settingsOpen}
      />

      <TopHeader
        isScrolled={isScrolled}
        isDark={isDark}
        wikiName={wiki.wikiName}
        community={wiki.community}
        pageTitle={wiki.pageTitle}
        wikiNavOpen={wikiNavOpen}
        onWikiClick={() => setWikiNavOpen((value) => !value)}
      >
        <SearchControl open={searchOpen} onClick={() => setSearchOpen((value) => !value)} />
        <ActionBar
          overflowOpen={overflowOpen}
          onOverflowClick={() => setOverflowOpen((value) => !value)}
        />
      </TopHeader>

      <main className="page-canvas" aria-label="Prototype page canvas">
        <DemoArticle title={wiki.pageTitle} wikiName={wiki.wikiName} />
      </main>

      <DemoControls
        demoWiki={demoWiki}
        appearance={appearance}
        onWikiChange={setDemoWiki}
        onAppearanceChange={setAppearance}
      />

      <WikiNavPopover
        open={wikiNavOpen}
        isDark={isDark}
        title={wiki.wikiName}
        onClose={() => setWikiNavOpen(false)}
      />
      <SearchPopover open={searchOpen} isDark={isDark} onClose={() => setSearchOpen(false)} />
      <SettingsPopover open={settingsOpen} isDark={isDark} />
      <OverflowPopover open={overflowOpen} isDark={isDark} />
    </div>
  );
}

function DemoArticle({ title, wikiName }: { title: string; wikiName: string }) {
  return (
    <article className="demo-article">
      <div className="article-kicker">{wikiName}</div>
      <h1>{title}</h1>
      <p>
        This is placeholder page content for the navigation prototype. It is intentionally plain so
        the header, rail, action controls, and popovers remain the focus.
      </p>
      <p>
        The page needs enough body copy to make the scroll transition feel like a normal wiki page.
        These blocks approximate a simple article layout without introducing real page design.
      </p>
      <h2>Overview</h2>
      <p>
        A few paragraphs sit below the fixed chrome so reviewers can scroll naturally and see the
        wiki identity replace the initial Fandom brand in the header.
      </p>
      <p>
        Additional text continues down the page with basic headings, loose paragraphs, and a small
        list. No cards, no editorial styling, and no page-level UI polish are intended here.
      </p>
      <ul>
        <li>Simple content area for scroll behavior.</li>
        <li>Plain wiki-page rhythm with minimal formatting.</li>
        <li>Enough height to exercise initial and scrolled states.</li>
      </ul>
      <h2>Notes</h2>
      {Array.from({ length: 9 }).map((_, index) => (
        <p key={index}>
          Placeholder paragraph {index + 1}. The navigation stays fixed while the article moves
          beneath it, preserving stable search and action positions across the transition.
        </p>
      ))}
    </article>
  );
}

type DemoControlsProps = {
  demoWiki: DemoWiki;
  appearance: AppearanceMode;
  onWikiChange: (value: DemoWiki) => void;
  onAppearanceChange: (value: AppearanceMode) => void;
};

function DemoControls({
  demoWiki,
  appearance,
  onWikiChange,
  onAppearanceChange
}: DemoControlsProps) {
  return (
    <aside className="demo-controls" aria-label="Prototype controls">
      <span>Demo</span>
      <span className="control-group-label">Wiki</span>
      {(["aesthetics", "wookieepedia", "fakePure"] as DemoWiki[]).map((wikiId) => (
        <button
          className={demoWiki === wikiId ? "active" : ""}
          key={wikiId}
          onClick={() => onWikiChange(wikiId)}
        >
          {demoWikis[wikiId].label}
        </button>
      ))}
      <span className="control-group-label">Mode</span>
      {(["light", "dark"] as AppearanceMode[]).map((modeId) => (
        <button
          className={appearance === modeId ? "active" : ""}
          key={modeId}
          onClick={() => onAppearanceChange(modeId)}
        >
          {modeId}
        </button>
      ))}
    </aside>
  );
}
