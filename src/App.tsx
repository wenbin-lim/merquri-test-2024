import { useState } from "react";

import { getWeatherByLocationName } from "./api/data";

import SearchIcon from "./icons/SearchIcon";

function App() {
  const [locationQuery, setLocationQuery] = useState("");

  const getWeather = async () => {
    const res = await getWeatherByLocationName(locationQuery);
    console.log(res);
  };

  return (
    <main className="h-screen bg-[url('./assets/bg-light.png')] p-4 dark:bg-[url('./assets/bg-dark.png')]">
      <header className="mx-auto flex max-w-screen-sm gap-x-4">
        <div className="bg-input dark:bg-input-dark flex w-full flex-col overflow-hidden rounded-xl px-6 py-2 dark:text-white">
          <label
            className="text-input-label dark:text-input-label-dark text-xs"
            htmlFor="locationQuery"
          >
            Country
          </label>
          <input
            className="bg-transparent focus:outline-none"
            type="text"
            name="locationQuery"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            autoFocus
          />
        </div>

        <button
          className="bg-primary dark:bg-primary-dark rounded-xl px-4 text-white"
          onClick={getWeather}
        >
          <SearchIcon />
        </button>
      </header>
    </main>
  );
}

export default App;
