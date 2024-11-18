import SkeletonLoading from "@/components/SkeletonLoading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeoLocation } from "@/hooks/useGeolocation";
import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react";

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeoLocation();

  const handleRefresh = () => {
    getLocation();

    if (coordinates) {
      //reload weather data
    }
  };

  if (locationLoading) {
    return <SkeletonLoading />;
  }

  if (locationError) {
    return (
      <Alert variant={"destructive"}>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert variant={"destructive"}>
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location access to see your local weather.</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {/* fhav */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight ">my location</h1>
        <Button onClick={handleRefresh} variant={"outline"} size={"icon"}>
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>
      {/* current and hourly weather */}
    </div>
  );
};

export default WeatherDashboard;
