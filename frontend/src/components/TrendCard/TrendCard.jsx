import React from "react";
import "./TrendCard.css";
import { trendingData } from "../../Data/trendingData";
import { Box, Text } from "@chakra-ui/react";


const TrendCard = () => {

  
  return (
    <Box className="TrendCard">
      <Text fontWeight={"600"}>Trends for you</Text>

      {trendingData.map((el, id) => {
        return (
          <Box className="trend" key={Date.now()+el.name}>
            <span>#{el.name}</span>
            <span>{el.shares}k shares</span>
          </Box>
        );
      })}
    </Box>
  );
};

export default TrendCard;
