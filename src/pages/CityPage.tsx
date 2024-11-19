import CurrentWeather from "@/components/CurrentWeather"
import { FavoriteButton } from "@/components/FButton"
import { HourlyTemperature } from "@/components/HourlyTemprature"
import SkeletonLoading from "@/components/SkeletonLoading"
import WeatherDetail from "@/components/WeatherDetail"
import { WeatherForecast } from "@/components/WeatherForecast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useForecastQuery, useWeatherQuery } from "@/hooks/useWeather"
import { AlertTriangle } from "lucide-react"
import { useParams, useSearchParams } from "react-router-dom"

const CityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Failed to load weather data. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

   if(!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <SkeletonLoading/>
   }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.cityName}, {weatherQuery.data.sys.country}
        </h1>
        <div className="flex gap-2">
          <FavoriteButton
            data={{ ...weatherQuery.data, name: params.cityName }}
          />
        </div>
      </div>

      <div className="grid gap-6">
        <CurrentWeather data={weatherQuery.data} />
        <HourlyTemperature data={forecastQuery.data} />
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetail data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
}

export default CityPage
