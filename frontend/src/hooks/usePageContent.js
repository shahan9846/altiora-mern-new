// The saved text of one public page, for example usePageContent("about").
// Returns null while loading (or if the page could not be loaded).
import useApiData from "./useApiData";

const usePageContent = (pageName) => useApiData(`/pages/${pageName}`, null);

export default usePageContent;
