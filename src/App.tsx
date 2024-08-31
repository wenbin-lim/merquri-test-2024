import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { getWeatherByLocationName } from "./api/data";

// assets
import cloudImage from "./assets/cloud.png";
import sunImage from "./assets/sun.png";
import SearchIcon from "./icons/SearchIcon";

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

  const getWeather = async () => {
    try {
      const res = await getWeatherByLocationName(locationQuery);

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
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <main className="h-screen bg-[url('./assets/bg-light.png')] p-4 dark:bg-[url('./assets/bg-dark.png')]">
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
          onClick={getWeather}
        >
          <SearchIcon />
        </button>
      </header>

      <section className="bg-result-section dark:bg-result-section-dark relative mx-auto mt-32 max-w-screen-sm rounded-[40px] border border-white/50 p-8 text-black dark:border-transparent dark:text-white">
        <img
          className="absolute -top-1/4 right-4 h-[150px] w-auto sm:-top-1/2 sm:right-0 sm:h-[300px]"
          src={todayWeatherImageAsSun ? sunImage : cloudImage}
          alt={todayWeatherImageAsSun ? "sun image" : "cloud image"}
        />
        <div className="flex justify-between">
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
      </section>
      <Toaster position="bottom-center" />
    </main>
  );
}

export default App;
