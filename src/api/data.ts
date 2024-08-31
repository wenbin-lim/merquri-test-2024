import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY as string;

export const getWeatherByLocationName = async (locationName: string) => {
  try {
    const locationRes = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=1&appid=${apiKey}`,
    );

    // no location found
    if (locationRes.data.length === 0) {
      return null;
    }

    // get the first location, limit is set to 1
    const { lat, lon } = locationRes.data[0];

    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
    );

    return weatherRes.data;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getSearchHistory = () => {
  const searchHistory = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key) {
      const value = localStorage.getItem(key);

      if (value) {
        searchHistory.push({ id: key, ...JSON.parse(value) });
      }
    }
  }

  // sort by id
  searchHistory.sort((a, b) => Number(b.id) - Number(a.id));

  return searchHistory;
};

export const storeSearchResult = (name: string, time: string) => {
  // store in localstorage
  // no id, using timestamp as id
  const id = Date.now();
  localStorage.setItem(`${id}`, JSON.stringify({ name, time }));
};

export const deleteSearchResult = (id: string) => {
  localStorage.removeItem(id);
};
