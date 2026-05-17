import css from "./SearchBox.module.css";

interface SearchBoxProps {
  text: string;
  onSearch: (query: string) => void;
}

export default function SearchBox({ text, onSearch }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={text}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
