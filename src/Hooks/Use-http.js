import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchRequest = useCallback(
    async (requestDetails, callback, setErrormessage) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(requestDetails.url, {
          method: (requestDetails.method ??= "GET"),
          body: (requestDetails.body ??= null),
          headers: (requestDetails.headers ??= {}),
        });

        if (!response.ok) {
          throw new Error("Request failed!");
        }
        const data = await response.json();
        callback(data);
      } catch (err) {
        setError(err.message || "Oops!!! Something went wrong!");
        setErrormessage(err.message || "Oops!!! Something went wrong!");
      }
      setIsLoading(false);
    },
    []
  );
  return { fetchRequest, isLoading, error };
};

export default useHttp;
