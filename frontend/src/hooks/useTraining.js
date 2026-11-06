// The visible training areas, each with its programs, for the Training page.
// Returns null while loading.
import useApiData from "./useApiData";

const useTraining = () => useApiData("/training", null);

export default useTraining;
