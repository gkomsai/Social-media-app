import { Box } from "@chakra-ui/react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <Box className="App">
      <Navbar />
      <AllRoutes />
    </Box>
  );
}

export default App;
