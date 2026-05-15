type SettingsPopoverProps = {
  open: boolean;
  isDark: boolean;
};

export function SettingsPopover({ open, isDark }: SettingsPopoverProps) {
  return (
    <section className={`popover settings-popover ${open ? "open" : ""} ${isDark ? "dark" : "light"}`}>
      <div>
        <strong>settings</strong>
        <span>light/dark</span>
        <span>etc.</span>
      </div>
    </section>
  );
}
