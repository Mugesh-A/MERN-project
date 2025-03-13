
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, ArrowRight, MapPin, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { searchStations, type Station } from "@/data/indianStations";

export const SearchForm = () => {
  const [date, setDate] = useState<Date>();
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [departureStations, setDepartureStations] = useState<Station[]>([]);
  const [arrivalStations, setArrivalStations] = useState<Station[]>([]);
  const [showDepartureResults, setShowDepartureResults] = useState(false);
  const [showArrivalResults, setShowArrivalResults] = useState(false);
  const departureRef = useRef<HTMLDivElement>(null);
  const arrivalRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Handle clicks outside the suggestion boxes
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (departureRef.current && !departureRef.current.contains(event.target as Node)) {
        setShowDepartureResults(false);
      }
      if (arrivalRef.current && !arrivalRef.current.contains(event.target as Node)) {
        setShowArrivalResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDepartureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDeparture(value);
    setDepartureStations(searchStations(value));
    setShowDepartureResults(true);
  };

  const handleArrivalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setArrival(value);
    setArrivalStations(searchStations(value));
    setShowArrivalResults(true);
  };

  const selectDepartureStation = (station: Station) => {
    setDeparture(`${station.name} (${station.code})`);
    setShowDepartureResults(false);
  };

  const selectArrivalStation = (station: Station) => {
    setArrival(`${station.name} (${station.code})`);
    setShowArrivalResults(false);
  };

  const clearDeparture = () => {
    setDeparture("");
    setDepartureStations([]);
  };

  const clearArrival = () => {
    setArrival("");
    setArrivalStations([]);
  };

  const handleSearch = () => {
    if (!departure || !arrival || !date) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all fields before searching",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Search Initiated",
      description: `Searching for trains from ${departure} to ${arrival} on ${format(date, "PP")}`,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-100 animate-fade-up">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2" ref={departureRef}>
          <label className="text-sm font-medium">From</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              className="pl-9 pr-9" 
              placeholder="Departure Station" 
              value={departure}
              onChange={handleDepartureChange}
              onClick={() => setShowDepartureResults(true)}
            />
            {departure && (
              <button
                className="absolute right-3 top-3"
                onClick={clearDeparture}
                type="button"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
            {showDepartureResults && departureStations.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
                {departureStations.map((station) => (
                  <div
                    key={station.code}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => selectDepartureStation(station)}
                  >
                    <div className="font-medium">{station.name}</div>
                    <div className="text-xs text-gray-500">{station.code} - {station.state}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2" ref={arrivalRef}>
          <label className="text-sm font-medium">To</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              className="pl-9 pr-9" 
              placeholder="Arrival Station" 
              value={arrival}
              onChange={handleArrivalChange}
              onClick={() => setShowArrivalResults(true)}
            />
            {arrival && (
              <button
                className="absolute right-3 top-3"
                onClick={clearArrival}
                type="button"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
            {showArrivalResults && arrivalStations.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
                {arrivalStations.map((station) => (
                  <div
                    key={station.code}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => selectArrivalStation(station)}
                  >
                    <div className="font-medium">{station.name}</div>
                    <div className="text-xs text-gray-500">{station.code} - {station.state}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2 md:space-y-8">
          <label className="text-sm font-medium md:hidden">Search</label>
          <Button 
            className="w-full bg-primary hover:bg-primary/90"
            onClick={handleSearch}
          >
            Search Trains
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
