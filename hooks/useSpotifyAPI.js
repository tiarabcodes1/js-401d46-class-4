import { useEffect, useState } from "react";
import axios from 'axios';

  function useSpotifyAPI() {

  const [response, setResponse] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://date.nager.at/api/v2/publicholidays/2020/US')
      .then(response => setResponse(response.data[0]))
      .catch(e => setError(e));
  }, []);

  return{
    ...response,
    error,
  }
}

export default useSpotifyAPI;