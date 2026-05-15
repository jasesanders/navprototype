import { X } from "lucide-react";

type WikiNavPopoverProps = {
  open: boolean;
  isDark: boolean;
  title: string;
  onClose: () => void;
};

export function WikiNavPopover({ open, isDark, title, onClose }: WikiNavPopoverProps) {
  return (
    <section className={`popover wiki-nav-popover ${open ? "open" : ""} ${isDark ? "dark" : "light"}`}>
      <button className="popover-close" onClick={onClose} aria-label="Close wiki navigation">
        <X size={19} />
      </button>
      <h2>{title}</h2>
      <div className="popover-placeholder">internal wiki nav</div>
    </section>
  );
}
