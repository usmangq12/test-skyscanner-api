import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [airpots, setAirpots] = useState([]);
  const [keywords, setKeywords] = useState("");

  useEffect(() => {
    try {
      var results = axios.post(
        `https://partners.api.skyscanner.net/apiservices/v3/autosuggest/flights/`,

        {
          query: {
            searchTerm: keywords,
            locale: "en-US",
            market: "IN",
          },
        },
        {
          headers: {
            "x-api-key": "ch111297163341605153883941625911",
          },
        }
      );

      setAirpots(results?.Places || []);
    } catch (error) {}
  }, [keywords]);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={airpots}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Airports"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
      )}
    />
  );
}

export default App;
