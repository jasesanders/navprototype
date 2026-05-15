type OverflowPopoverProps = {
  open: boolean;
  isDark: boolean;
};

export function OverflowPopover({ open, isDark }: OverflowPopoverProps) {
  return (
    <section className={`popover overflow-popover ${open ? "open" : ""} ${isDark ? "dark" : "light"}`}>
      <ul>
        <li>edit</li>
        <li>other things</li>
        <li>whatever</li>
        <li>etc</li>
      </ul>
    </section>
  );
}
