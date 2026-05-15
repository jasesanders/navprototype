import { Search } from "lucide-react";

type SearchControlProps = {
  open: boolean;
  onClick: () => void;
};

export function SearchControl({ open, onClick }: SearchControlProps) {
  return (
    <button className={`search-control ${open ? "active" : ""}`} onClick={onClick}>
      <Search size={23} strokeWidth={2.5} />
      <span>Search or Ask</span>
    </button>
  );
}
