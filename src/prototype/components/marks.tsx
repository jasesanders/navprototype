export function FandomMark() {
  return (
    <svg className="fandom-mark" viewBox="0 0 48 48" aria-hidden="true">
      <path
        d="M15 5v14.5l6.2-6.2 11.5 11.6V5L43 15.4v15.3L24 43 5 30.7V15.4L15 5Z"
        fill="#fa005a"
      />
      <path d="M17 25.2 24 32l7-6.8v5.3L24 37l-7-6.5v-5.3Z" fill="#ffe600" />
    </svg>
  );
}

export function FandomWordmark({ dark }: { dark: boolean }) {
  return (
    <div className="fandom-wordmark">
      <span style={{ color: dark ? "#fff1cf" : "#68135f" }}>Fand</span>
      <FandomMark />
      <span style={{ color: dark ? "#fff1cf" : "#68135f" }}>m</span>
    </div>
  );
}
