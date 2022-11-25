import { Box } from "@chakra-ui/react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <Box className="App">
      <Navbar />
      <Box className="blur" top="0%" right="0"></Box>
      <Box className="blur" top="2%" left="-1rem"></Box>
      <AllRoutes />
    </Box>
  );
}

export default App;
