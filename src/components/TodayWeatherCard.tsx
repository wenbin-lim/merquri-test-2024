// assets
import cloudImage from "../assets/cloud.png";
import sunImage from "../assets/sun.png";

type Props = {
  temperature: number;
  tempHigh: number;
  tempLow: number;
  location: string;
  dateTime: string;
  humidity: number;
  description: string;
  showImageAsSun: boolean;
};

const TodayWeatherCard = ({
  temperature,
  tempHigh,
  tempLow,
  location,
  dateTime,
  humidity,
  description,
  showImageAsSun,
}: Props) => {
  return (
    <div className="relative flex justify-between gap-x-4">
      <img
        className="absolute -top-1/2 right-0 h-[150px] w-auto sm:-top-3/4 sm:h-[300px]"
        src={showImageAsSun ? sunImage : cloudImage}
        alt={showImageAsSun ? "sun image" : "cloud image"}
      />
      <div>
        <p>Today's Weather</p>
        <p className="text-primary text-8xl font-bold dark:text-white">
          {temperature}&#176;
        </p>
        <p>
          H: {tempHigh}&#176; L: {tempLow}&#176;
        </p>
        <p className="font-bold text-[#666666] dark:text-white">
          {location || "-"}
        </p>
      </div>
      <div className="self-end text-right text-[#666666] sm:flex sm:flex-1 sm:flex-row-reverse sm:justify-between sm:gap-x-4 sm:text-center dark:text-white">
        <p>{description || "-"}</p>
        <p>Humidity: {humidity}%</p>
        <p>{dateTime || "-"}</p>
      </div>
    </div>
  );
};

export default TodayWeatherCard;
