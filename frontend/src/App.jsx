import Home from "./pages/user/Home";
import HomeEditor from "./pages/admin/HomeEditor";

// No router yet: just look at the address bar.
// /admin...  -> admin dashboard (Home editor)
// anything else -> public home page
const isAdmin = window.location.pathname.startsWith("/admin");

function App() {
  return <>{isAdmin ? <HomeEditor /> : <Home />}</>;
}

export default App;
