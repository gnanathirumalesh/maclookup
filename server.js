const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(express.json());
app.use(cors());

app.get('/mac/:macAddress', async (req, res) => {
  try {
    const macAddress = req.params.macAddress;
    const apiUrl = `https://api.maclookup.app/v2/macs/${macAddress}`;

    // Make a GET request to the MAC address lookup API
    const response = await axios.get(apiUrl);

    // Extract relevant data from the response
    const {
      success,
      found,
      macPrefix,
      company,
      address,
      country,
      blockStart,
      blockEnd,
      blockSize,
      blockType,
      updated,
      isRand,
      isPrivate,
    } = response.data;

    // Send the formatted JSON response
    res.json({
      success,
      found,
      macPrefix,
      company,
      address,
      country,
      blockStart,
      blockEnd,
      blockSize,
      blockType,
      updated,
      isRand,
      isPrivate,
    });
  } catch (error) {
    console.error(error.message); // Log the error message
    res.status(error.response ? error.response.status : 500).json({
      success: false,
      error: error.message || 'Internal Server Error',
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
