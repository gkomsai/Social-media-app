import { Box } from "@chakra-ui/react";
import "./App.css";
import NavIcons from "./components/Navbar/Navbar";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <Box className="App">
      <NavIcons />
      <Box className="blur" top="-10%" right="0"></Box>
      <Box className="blur" top="20%" left="-3rem"></Box>
      
      <AllRoutes />
    </Box>
  );
}

export default App;
