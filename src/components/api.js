import axios from 'axios';

const googleApiKey = process.env.REACT_APP_GOOGLE_API;

export const fetchAllBusinesses = async (latitude, longitude, term, radius = 40233.6) => {
    const googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
    let results = [];
    let nextPageToken = null;
  
    try {
      do {
        const response = await axios.get(googlePlacesUrl, {
          params: {
            location: `${latitude},${longitude}`,
            radius,
            keyword: term, // Use keyword for the search term
            key: googleApiKey,
            pagetoken: nextPageToken,
          },
        });
  
        if (response.data.results) {
          results = [...results, ...response.data.results];
        }
  
        nextPageToken = response.data.next_page_token;
  
        // Google requires a short delay between paginated requests with next_page_token
        if (nextPageToken) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      } while (nextPageToken && results.length < 60); // Stop once 60 results are loaded or no more pages
  
      return results;
    } catch (error) {
      console.error("Error fetching businesses:", error.response ? error.response.data : error.message);
      return [];
    }
  };
  
  export const getCoordinates = async (location) => {
    const googleGeocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json`;
  
    try {
      const response = await axios.get(googleGeocodeUrl, {
        params: {
          address: location,
          key: googleApiKey,
        },
      });
  
      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        console.error("No results found for the location.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };
  
  export const fetchBusinessDetails = async (placeId) => {
    const googlePlacesDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json`;
  
    try {
      const response = await axios.get(googlePlacesDetailsUrl, {
        params: {
          place_id: placeId,
          fields: "formatted_phone_number,name,rating,formatted_address", // Specify required fields
          key: googleApiKey,
        },
      });
      return response.data.result;
    } catch (error) {
      console.error("Error fetching business details:", error);
      return null;
    }
  };
  
  