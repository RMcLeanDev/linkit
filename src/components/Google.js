import React, { useState } from 'react';
import { fetchAllBusinesses, fetchBusinessDetails, getCoordinates } from './api';

const GooglePlacesSearch = () => {
  const [location, setLocation] = useState('');
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [pageOffset, setPageOffset] = useState(0);

  const handleSearch = async () => {
    const coordinates = await getCoordinates(location);

    if (!coordinates) {
      console.error("Failed to get coordinates for location.");
      return;
    }

    // Adjust coordinates slightly to change the center after each 60 results
    const adjustedLatitude = coordinates.latitude + (pageOffset * 0.01); // Adjust latitude slightly
    const adjustedLongitude = coordinates.longitude + (pageOffset * 0.01); // Adjust longitude slightly

    const initialResults = await fetchAllBusinesses(adjustedLatitude, adjustedLongitude, term);

    const resultsWithDetails = await Promise.all(
      initialResults.map(async (business) => {
        const details = await fetchBusinessDetails(business.place_id);
        return {
          ...business,
          formatted_address: details?.formatted_address || business.vicinity || "Address not available",
          phone_number: details?.formatted_phone_number || "N/A",
        };
      })
    );

    setResults((prevResults) => [...prevResults, ...resultsWithDetails]);
    setPageOffset((prevOffset) => prevOffset + 1); // Increment offset for next search
  };
  console.log(results)
  return (
    <div>
      <h1>Business Search</h1>
      <input
        type="text"
        placeholder="Location (e.g., New York)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder="Search term (e.g., cafe)"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={() => handleSearch()}>Load More Results</button>
      <p>{results.length}</p>
      <ul>
        {results.map((business) => (
          <li key={business.place_id}>
            <h3>{business.name}</h3>
            <p>{business.formatted_address}</p>
            <p>{business.rating} stars</p>
            <p>Phone: {business.phone_number}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GooglePlacesSearch;
