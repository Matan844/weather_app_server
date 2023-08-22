const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/data", async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: "City parameter is missing." });
    }
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=90e9aa3641dd4b31a09190503231208&q=${city}&aqi=no`
    );
    const responseData = {
      city:response.data.location.name ,
      celtemp: response.data.current.temp_c,
      wind_kph: response.data.current.wind_kph,
      precip_mm: response.data.current.precip_mm,
      humidity: response.data.current.humidity,
      country : response.data.location.country
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching city information:", error);
    res.status(500).json({ error: "Error fetching city information" });
  }
});

module.exports = router;
