// The visible services (in the order the admin set), for the public pages.
// Returns an empty list while loading.
import useApiData from "./useApiData";

const useServices = () => useApiData("/services", []);

export default useServices;
