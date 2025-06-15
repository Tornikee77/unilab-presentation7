type Props = {
  isLight: boolean;
  setTheme: (theme: "light" | "dark") => void;
};

const ThemeSwitcherSelect = ({ isLight, setTheme }: Props) => {
  return (
    <button onClick={() => setTheme(isLight ? "dark" : "light")}>
      {isLight ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeSwitcherSelect;
