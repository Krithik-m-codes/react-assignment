import { useState } from "react";
import FlightCard from "./components/FlightCard";
import { ChevronDown } from "lucide-react";
// import Card from "./components/Card";

const FlightSearch = () => {
  const [origin, setOrigin] = useState("JFK");
  const [destination, setDestination] = useState("JFK");
  const [cabin, setCabin] = useState("Economy");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [route, setRoute] = useState("");
  const [date, setDate] = useState("test");

  const originOptions = ["JFK", "DEL", "SYD", "BOM", "BNE", "BLR"];
  const destinationOptions = ["JFK", "DEL", "SYD", "LHR", "CDG", "DOH", "SIN"];
  const cabinOptions = ["Economy", "Business", "First"];

  // to get data from the api
  const searchFlights = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("https://cardgpt.in/apitest", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.9,hi;q=0.8",
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origin,
          destination,
          partnerPrograms: [
            "Air Canada",
            "United Airlines",
            "KLM",
            "Qantas",
            "American Airlines",
            "Etihad Airways",
            "Alaska Airlines",
            "Qatar Airways",
            "LifeMiles",
          ],
          stops: 2,
          departureTimeFrom: "2024-07-09T00:00:00Z",
          departureTimeTo: "2024-10-07T00:00:00Z",
          isOldData: false,
          limit: 302,
          offset: 0,
          cabinSelection: [cabin],
          date: "2024-07-09T12:00:17.796Z",
        }),
      });
      setRoute(origin + "→" + destination);
      setDate("2024-07-09 - 2024-10-07");
      const data = await response.json();
      console.log("data in searchFlights", data.data);
      setResults(data.data);
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#172014] min-h-screen text-[#9da19d] p-6">
      <div className="max-w-4xl mx-auto h-full flex flex-col justify-center items-center">
        <div className="w-1/2">
          <h1 className="text-2xl font-bold mb-4 text-[#9da19dd1]">
            Choose Origin & Destination Airports:
          </h1>
          <div className=" p-4 flex justify-start relative flex-col mb-6 gap-7 h-auto">
            <div className="w-full relative">
              <label htmlFor="Origin" className="left-4 mb-2 absolute">
                Origin
              </label>
              <select
                className="appearance-none bg-[#181818] font-bold text-[#b4b4b4] w-full h-[4.5rem] py-5 px-4 rounded"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              >
                {originOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-6 top-6" />
            </div>
            <div className="w-full relative">
              <label htmlFor="Destination" className="left-4 mb-2 absolute">
                Destination
              </label>
              <select
                className="appearance-none bg-[#181818] font-bold text-[#b4b4b4]  w-full h-[4.5rem] py-5 px-4 rounded"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                {destinationOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-6 top-6" />
            </div>
            <div className="w-full relative">
              <label htmlFor="Cabin" className="left-4 mb-2 absolute">
                Cabin Selection
              </label>
              <select
                className="appearance-none bg-[#18181886] font-bold text-[#eeeeee]  w-full h-[4.5rem] py-5 px-4 rounded-t-lg border-b-2 border-white"
                value={cabin}
                onChange={(e) => setCabin(e.target.value)}
              >
                {cabinOptions.map((opt) => (
                  <option
                    key={opt}
                    value={opt}
                    className="bg-black outline-none py-5"
                  >
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-6 top-6" />
            </div>
          </div>
          <button
            className="bg-[#00c2a8] text-white ms-6 px-4 py-2 rounded"
            onClick={searchFlights}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {results.length === 0 && !loading && !error && (
          <p className="mt-5">Try another search route.</p>
        )}

        <div className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-4 h-1/2">
          {results.map((result, index) => (
            <FlightCard key={index} result={result} route={route} date={date} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
