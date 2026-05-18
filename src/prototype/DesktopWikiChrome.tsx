import { useEffect, useMemo, useRef, useState } from "react";
import { ActionBar } from "./components/ActionBar";
import { LeftRail } from "./components/LeftRail";
import { OverflowPopover } from "./components/OverflowPopover";
import { SearchControl } from "./components/SearchControl";
import { SearchPopover } from "./components/SearchPopover";
import { SettingsPopover } from "./components/SettingsPopover";
import { TopHeader } from "./components/TopHeader";
import { WikiNavPopover } from "./components/WikiNavPopover";
import {
  AppearanceMode,
  DemoArticleContent,
  DemoWiki,
  chrome,
  demoWikis,
  getOverlay
} from "./constants";

type LifecycleMode = "loggedIn" | "loggedOut";

export function DesktopWikiChrome() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");
  const [isReturningInitial, setIsReturningInitial] = useState(false);
  const [lifecycle, setLifecycle] = useState<LifecycleMode>("loggedIn");
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
        returnTimer.current = window.setTimeout(() => setIsReturningInitial(false), 280);
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
          "--primary-text": isDark ? "#f4f4f4" : "#2A2A29",
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
        <DemoArticle content={wiki.article} />
      </main>

      <DemoControls
        lifecycle={lifecycle}
        demoWiki={demoWiki}
        appearance={appearance}
        onLifecycleChange={setLifecycle}
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

function DemoArticle({ content }: { content: DemoArticleContent }) {
  return (
    <article className="demo-article">
      <div className="article-kicker">{content.kicker}</div>
      <h1>{content.headline}</h1>
      <p>{content.intro}</p>
      <p>{content.body}</p>
      <h2>{content.sectionTitle}</h2>
      <ul>
        {content.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <h2>Notes</h2>
      {Array.from({ length: 9 }).map((_, index) => (
        <p key={index}>
          {content.noteLead} Placeholder paragraph {index + 1} keeps enough height to test the
          initial and scrolled navigation states.
        </p>
      ))}
    </article>
  );
}

type DemoControlsProps = {
  lifecycle: LifecycleMode;
  demoWiki: DemoWiki;
  appearance: AppearanceMode;
  onLifecycleChange: (value: LifecycleMode) => void;
  onWikiChange: (value: DemoWiki) => void;
  onAppearanceChange: (value: AppearanceMode) => void;
};

function DemoControls({
  lifecycle,
  demoWiki,
  appearance,
  onLifecycleChange,
  onWikiChange,
  onAppearanceChange
}: DemoControlsProps) {
  return (
    <aside className="demo-controls" aria-label="Prototype controls">
      <div className="control-tier">
        <span className="control-group-label">Lifecycle</span>
        <div className="control-options">
          {(["loggedIn", "loggedOut"] as LifecycleMode[]).map((lifecycleId) => (
            <button
              className={lifecycle === lifecycleId ? "active" : ""}
              key={lifecycleId}
              onClick={() => onLifecycleChange(lifecycleId)}
            >
              {lifecycleId === "loggedIn" ? "logged in" : "logged out"}
            </button>
          ))}
        </div>
      </div>
      <div className="control-tier">
        <span className="control-group-label">Theme</span>
        <div className="control-options">
          {(["aesthetics", "wookieepedia", "fakePure"] as DemoWiki[]).map((wikiId) => (
            <button
              className={demoWiki === wikiId ? "active" : ""}
              key={wikiId}
              onClick={() => onWikiChange(wikiId)}
            >
              {demoWikis[wikiId].label}
            </button>
          ))}
        </div>
      </div>
      <div className="control-tier">
        <span className="control-group-label">Mode</span>
        <div className="control-options">
          {(["light", "dark"] as AppearanceMode[]).map((modeId) => (
            <button
              className={appearance === modeId ? "active" : ""}
              key={modeId}
              onClick={() => onAppearanceChange(modeId)}
            >
              {modeId}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
