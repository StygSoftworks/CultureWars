import { useState, useEffect } from 'react';

const url = 'https://raw.githubusercontent.com/StygSoftworks/cwarsJson/main/cards.json';

function GetCards() {
  const [jsonData, setJsonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setJsonData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [url]);

  return { jsonData, isLoading, error };
}

export default GetCards;
