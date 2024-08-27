import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Early return if currency is not provided
    if (!currency) {
      setData(null);
      setLoading(false);
      return;
    }

    // Fetch data
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/usd.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((res) => {
        if (res[currency]) {
          setData(res[currency]);
        } else {
          console.error(`Currency ${currency} not found in the response.`);
          setData({});
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch currency information:", error);
        setError(error);
        setData({});
        setLoading(false);
      });
  }, [currency]);

  return { data, loading, error };
}

export default useCurrencyInfo;
