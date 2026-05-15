import { Bell, Bookmark, CheckCircle2, Compass, History, Home, Settings } from "lucide-react";
import fandomIcon from "../../assets/fandom_icon.svg";

type LeftRailProps = {
  isDark: boolean;
  isScrolled: boolean;
  settingsOpen: boolean;
  onSettingsClick: () => void;
};

const items = [
  { label: "Home", icon: Home },
  { label: "Explore", icon: Compass },
  { label: "Saved", icon: Bookmark },
  { label: "Progress", icon: CheckCircle2 },
  { label: "History", icon: History }
];

export function LeftRail({ isDark, isScrolled, settingsOpen, onSettingsClick }: LeftRailProps) {
  return (
    <nav className={`left-rail ${isDark ? "dark" : "light"}`} aria-label="Global navigation">
      <button className="rail-brand" aria-label="Fandom home">
        <img className="fandom-mark" src={fandomIcon} alt="" aria-hidden={!isScrolled} />
      </button>

      <div className="rail-main">
        {items.map(({ label, icon: Icon }) => (
          <button className="rail-item" key={label}>
            <Icon size={26} strokeWidth={2.4} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="rail-bottom">
        <button className="rail-bell" aria-label="Notifications">
          <Bell size={27} strokeWidth={2.4} />
          <span>16</span>
        </button>
        <button
          className={`rail-profile ${settingsOpen ? "active" : ""}`}
          onClick={onSettingsClick}
          aria-label="Settings and profile"
        >
          <span className="avatar">☠</span>
          <Settings className="settings-mini" size={15} />
        </button>
      </div>
    </nav>
  );
}
