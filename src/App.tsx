import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import {
  getWeatherByLocationName,
  getSearchHistory,
  storeSearchResult,
  deleteSearchResult,
} from "./api/data";

// assets
import cloudImage from "./assets/cloud.png";
import sunImage from "./assets/sun.png";
import SearchIcon from "./icons/SearchIcon";
import DeleteIcon from "./icons/DeleteIcon";

type SearchHistoryItem = {
  id: string;
  name: string;
  time: string;
};

function App() {
  // query state
  const [locationQuery, setLocationQuery] = useState("");

  // today weather state
  const [todayWeatherDegree, setTodayWeatherDegree] = useState(0);
  const [todayWeatherHigh, setTodayWeatherHigh] = useState(0);
  const [todayWeatherLow, setTodayWeatherLow] = useState(0);
  const [todayWeatherLocation, setTodayWeatherLocation] = useState("");
  const [todayWeatherTime, setTodayWeatherTime] = useState("");
  const [todayWeatherHumidity, setTodayWeatherHumidity] = useState(0);
  const [todayWeatherDescription, setTodayWeatherDescription] = useState("");
  const [todayWeatherImageAsSun, setTodayWeatherImageAsSun] = useState(false);

  // search history state
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  // populate search history on load
  useEffect(() => {
    setSearchHistory(getSearchHistory());
  }, []);

  const getWeather = async (query: string) => {
    try {
      const res = await getWeatherByLocationName(query);

      if (!res) {
        toast.error("No location found");
        return;
      }

      setTodayWeatherDegree(Math.round(res.main.temp));
      setTodayWeatherHigh(Math.round(res.main.temp_max));
      setTodayWeatherLow(Math.round(res.main.temp_min));
      setTodayWeatherLocation(`${res.name}, ${res.sys.country}`);

      // convert unix timestamp to date
      const date = new Date(res.dt * 1000);
      const dateString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

      setTodayWeatherTime(dateString);

      setTodayWeatherHumidity(res.main.humidity);
      setTodayWeatherDescription(res.weather[0].main);

      // https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
      // weather code 800 is clear, using sun.png to represent clear weather
      // other weather codes will be defaulted to cloud.png
      if (res.weather[0].id === 800) {
        setTodayWeatherImageAsSun(true);
      } else {
        setTodayWeatherImageAsSun(false);
      }

      // store search result
      storeSearchResult(`${res.name}, ${res.sys.country}`, dateString);
      setSearchHistory(getSearchHistory());
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const onClickDeleteSearchResult = (id: string) => {
    deleteSearchResult(id);
    setSearchHistory(getSearchHistory());
  };

  return (
    <main className="h-screen overflow-auto bg-[url('./assets/bg-light.png')] p-4 dark:bg-[url('./assets/bg-dark.png')]">
      <header className="mx-auto flex max-w-screen-sm gap-x-4">
        <div className="bg-input dark:bg-input-dark flex w-full flex-col overflow-hidden rounded-[20px] px-6 py-2 text-black dark:text-white">
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
          className="bg-primary dark:bg-primary-dark rounded-[20px] px-4 text-white"
          onClick={() => getWeather(locationQuery)}
        >
          <SearchIcon />
        </button>
      </header>

      <section className="relative mx-auto mt-32 max-w-screen-sm rounded-[40px] border border-white/50 bg-white/20 p-8 text-black dark:border-transparent dark:bg-[#1A1A1A4D] dark:text-white">
        {/* <img
          className="absolute -top-1/4 right-4 h-[150px] w-auto sm:-top-1/2 sm:right-0 sm:h-[300px]"
          src={todayWeatherImageAsSun ? sunImage : cloudImage}
          alt={todayWeatherImageAsSun ? "sun image" : "cloud image"}
        /> */}
        <div className="flex justify-between gap-x-4">
          <div>
            <p>Today's Weather</p>
            <p className="text-primary text-8xl font-bold dark:text-white">
              {todayWeatherDegree}&#176;
            </p>
            <p>
              H: {todayWeatherHigh}&#176; L: {todayWeatherLow}&#176;
            </p>
            <p className="font-bold text-[#666666] dark:text-white">
              {todayWeatherLocation || "-"}
            </p>
          </div>
          <div className="self-end text-right text-[#666666] sm:flex sm:flex-1 sm:flex-row-reverse sm:justify-between sm:gap-x-4 sm:text-center dark:text-white">
            <p>{todayWeatherDescription || "-"}</p>
            <p>Humidity: {todayWeatherHumidity}%</p>
            <p>{todayWeatherTime || "-"}</p>
          </div>
        </div>

        <div className="mt-8 space-y-4 rounded-[24px] bg-white/20 p-6 dark:bg-[#1A1A1A4D]">
          <p>Search History</p>
          {searchHistory.map((item) => (
            <div
              key={item.id}
              className="flex rounded-[16px] bg-white/40 px-4 py-3 dark:bg-[#1A1A1A80]"
            >
              <div className="flex-1 sm:mr-2 sm:flex sm:items-center">
                <p className="mr-auto">{item.name}</p>
                <p className="text-sm dark:text-white/50">{item.time}</p>
              </div>
              <div className="flex gap-x-2">
                <button
                  className="rounded-full bg-white p-2 text-black/50 shadow-md dark:border-2 dark:border-white/40 dark:bg-transparent dark:text-white/50 dark:shadow-none"
                  onClick={() => getWeather(item.name)}
                >
                  <SearchIcon />
                </button>
                <button
                  className="rounded-full bg-white p-2 text-black/50 shadow-md dark:border-2 dark:border-white/40 dark:bg-transparent dark:text-white/50 dark:shadow-none"
                  onClick={() => onClickDeleteSearchResult(item.id)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Toaster position="bottom-center" />
    </main>
  );
}

export default App;
