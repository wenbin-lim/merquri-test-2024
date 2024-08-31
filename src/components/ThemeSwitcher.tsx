import { useState, useEffect } from "react";

import SunIcon from "../icons/SunIcon";
import MoonIcon from "../icons/MoonIcon";

const ThemeSwitcher = () => {
  const [useDarkTheme, setUseDarkTheme] = useState(false);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setUseDarkTheme(true);
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    } else {
      setUseDarkTheme(false);
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const switchTheme = () => {
    if (localStorage.theme === "dark") {
      setUseDarkTheme(false);
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    } else {
      setUseDarkTheme(true);
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <button
      className="bg-primary dark:bg-primary-dark fixed bottom-4 right-8 rounded-full p-4 text-white shadow-md dark:shadow-none"
      onClick={switchTheme}
    >
      {useDarkTheme ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export default ThemeSwitcher;
