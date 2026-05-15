import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";
import fandomLogo from "../../assets/fandom_logo.svg";
import fandomLogoDark from "../../assets/logo_dark.svg";

type TopHeaderProps = {
  children: ReactNode;
  isScrolled: boolean;
  isDark: boolean;
  wikiName: string;
  community: string;
  pageTitle: string;
  wikiNavOpen: boolean;
  onWikiClick: () => void;
};

export function TopHeader({
  children,
  isScrolled,
  isDark,
  wikiName,
  community,
  pageTitle,
  wikiNavOpen,
  onWikiClick
}: TopHeaderProps) {
  return (
    <header className={`top-header ${isDark ? "dark" : "light"}`}>
      <div className="brand-stage">
        <div className="wordmark-layer" aria-hidden={isScrolled}>
          <img className="fandom-logo" src={isDark ? fandomLogoDark : fandomLogo} alt="Fandom" />
        </div>

        <button
          className={`wiki-identity ${wikiNavOpen ? "active" : ""}`}
          onClick={onWikiClick}
          aria-expanded={wikiNavOpen}
        >
          <span className="page-title">{pageTitle}</span>
          <span className="wiki-title">{wikiName}</span>
          <span className="wiki-subtitle">
            {community} <ChevronDown size={15} strokeWidth={2.4} />
          </span>
        </button>
      </div>

      {children}
    </header>
  );
}
