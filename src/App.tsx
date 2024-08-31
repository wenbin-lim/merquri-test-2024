import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import {
  getWeatherByLocationName,
  getSearchHistory,
  storeSearchResult,
  deleteSearchResult,
} from "./api/data";

// components
import TodayWeatherCard from "./components/TodayWeatherCard";
import SearchHistoryItem from "./components/SearchHistoryItem";

// assets
import LoaderIcon from "./icons/LoaderIcon";
import SearchIcon from "./icons/SearchIcon";

type SearchHistoryItem = {
  id: string;
  name: string;
  time: string;
};

function App() {
  // query state
  const [locationQuery, setLocationQuery] = useState("");
  const [queryLoading, setQueryLoading] = useState(false);

  // today weather state
  const [emptyTodayWeather, setEmptyTodayWeather] = useState(true);

  const [todayWeatherTemperature, setTodayWeatherTemperature] = useState(0);
  const [todayWeatherTempHigh, setTodayWeatherTempHigh] = useState(0);
  const [todayWeatherTempLow, setTodayWeatherTempLow] = useState(0);
  const [todayWeatherLocation, setTodayWeatherLocation] = useState("");
  const [todayWeatherDateTime, setTodayWeatherDateTime] = useState("");
  const [todayWeatherHumidity, setTodayWeatherHumidity] = useState(0);
  const [todayWeatherDescription, setTodayWeatherDescription] = useState("");
  const [todayWeatherImageAsSun, setTodayWeatherImageAsSun] = useState(false);

  // search history state
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  useEffect(() => {
    // populate search history on load
    setSearchHistory(getSearchHistory());
  }, []);

  const getWeather = async (query: string) => {
    setEmptyTodayWeather(false);
    setQueryLoading(true);

    try {
      const res = await getWeatherByLocationName(query);
      setQueryLoading(false);

      if (!res) {
        toast.error("No location found");
        return;
      }

      setTodayWeatherTemperature(Math.round(res.main.temp));
      setTodayWeatherTempHigh(Math.round(res.main.temp_max));
      setTodayWeatherTempLow(Math.round(res.main.temp_min));
      setTodayWeatherLocation(`${res.name}, ${res.sys.country}`);

      // convert unix timestamp to date
      const date = new Date(res.dt * 1000);
      const dateString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

      setTodayWeatherDateTime(dateString);

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
    toast.success("Search result deleted");
  };

  return (
    <main className="h-screen overflow-auto bg-[url('./assets/bg-light.png')] p-4 dark:bg-[url('./assets/bg-dark.png')]">
      <form
        className="mx-auto flex max-w-screen-sm gap-x-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
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
          type="submit"
          className="bg-primary dark:bg-primary-dark rounded-[20px] px-4 text-white"
          onClick={() => getWeather(locationQuery)}
        >
          <SearchIcon />
        </button>
      </form>

      <section className="relative mx-auto mt-32 flex max-w-screen-sm flex-col gap-y-8 rounded-[40px] border border-white/50 bg-white/20 p-8 text-black dark:border-transparent dark:bg-[#1A1A1A4D] dark:text-white">
        {emptyTodayWeather && searchHistory.length === 0 && (
          <p className="text-center">Search for a weather result now!</p>
        )}

        {!emptyTodayWeather &&
          (queryLoading ? (
            <div className="flex justify-center">
              <LoaderIcon />
            </div>
          ) : (
            <TodayWeatherCard
              temperature={todayWeatherTemperature}
              tempHigh={todayWeatherTempHigh}
              tempLow={todayWeatherTempLow}
              location={todayWeatherLocation}
              dateTime={todayWeatherDateTime}
              humidity={todayWeatherHumidity}
              description={todayWeatherDescription}
              showImageAsSun={todayWeatherImageAsSun}
            />
          ))}

        {searchHistory.length > 0 && (
          <div className="space-y-4 rounded-[24px] bg-white/20 p-6 dark:bg-[#1A1A1A4D]">
            <p>Search History</p>
            {searchHistory.map((item) => (
              <SearchHistoryItem
                key={item.id}
                id={item.id}
                name={item.name}
                dateTime={item.time}
                onClickSearch={() => getWeather(item.name)}
                onClickDelete={() => onClickDeleteSearchResult(item.id)}
              />
            ))}
          </div>
        )}
      </section>

      <Toaster position="bottom-center" />
    </main>
  );
}

export default App;
