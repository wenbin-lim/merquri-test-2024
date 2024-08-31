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
