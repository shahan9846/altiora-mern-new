// Loads data from the backend once when the page opens.
//   path       - for example "/services"
//   emptyValue - what to return while loading (or if loading fails)
// The small hooks useServices, useTraining and usePageContent are built on this one.
import { useEffect, useState } from "react";
import api from "../api/api";

const useApiData = (path, emptyValue) => {
  const [data, setData] = useState(emptyValue);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await api.get(path);
        setData(response.data);
      } catch (error) {
        console.error(`Could not load ${path}:`, error.message);
      }
    };
    loadData();
  }, [path]);

  return data;
};

export default useApiData;
