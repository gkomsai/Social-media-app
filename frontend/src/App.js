import { Box } from "@chakra-ui/react";
import "./App.css";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <Box className="App" >
      <Box className="blur" top="-16%" right="0"></Box>
      <Box className="blur" top="37%" left="-8rem"></Box>
      <AllRoutes />
    </Box>
  );
}

export default App;
