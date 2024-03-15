import Router, { Route } from "preact-router";
import AppContextProvider from "./app-context";
import Artwork from "./artwork";
import POV from "./components/pov";
import Home from "./home";

export function App() {
  return (
    <div className="flex flex-col  min-h-screen w-full">
      <AppContextProvider>
        <main className="flex flex-col min-h-screen w-full">
          <POV />
          <div className="p-2">
            <Router>
              <Route path="/" component={() => <Home />} />
              <Route path="/art" component={() => <Artwork />} />
            </Router>
          </div>
        </main>
      </AppContextProvider>
    </div>
  );
}
