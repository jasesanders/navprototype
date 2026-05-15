import { X } from "lucide-react";

type SearchPopoverProps = {
  open: boolean;
  isDark: boolean;
  onClose: () => void;
};

export function SearchPopover({ open, isDark, onClose }: SearchPopoverProps) {
  return (
    <section className={`popover search-popover ${open ? "open" : ""} ${isDark ? "dark" : "light"}`}>
      <button className="popover-close" onClick={onClose} aria-label="Close search">
        <X size={19} />
      </button>
      <div className="search-placeholder">search<br />suggestions</div>
    </section>
  );
}
