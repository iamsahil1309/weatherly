import { Button } from "@/components/ui/button"
import {RefreshCcw } from "lucide-react"


const WeatherDashboard = () => {
   
  return (
    <div className="space-y-4">
      {/* fhav */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight ">my location</h1>
        <Button variant={'outline'} size={'icon'}>
          <RefreshCcw className="h-4 w-4"/>
        </Button>
      </div>
      {/* current and hourly weather */}
    </div>
  )
}

export default WeatherDashboard
