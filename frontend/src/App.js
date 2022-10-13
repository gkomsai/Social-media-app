import "./App.css";

import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      <AllRoutes />
    </div>
  );
}

export default App;
