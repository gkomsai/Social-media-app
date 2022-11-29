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
          <Box className="trend" key={Date.now() + el.name}>
            <Text
              as="span"
              fontWeight={"bold"}
              color="blue.400"
              _hover={{ color: "green", textDecoration: "underline" }}
            >
              #{el.name}
            </Text>
            <Text mt="-10px" fontSize={"14px"}>{el.shares}k shares</Text>
          </Box>
        );
      })}
    </Box>
  );
};

export default TrendCard;
