import { Box, Button } from "@chakra-ui/react";
import React from "react";

const CustomButton = ({
  type = "",
  onClick,
  bg = "var(--buttonBg)",
  isLoading = "",
  value,
  color = "white",
  w = "",
  fontSize="15px",
  className,
  alignSelf = "",
  marginTop = "40px",
}) => {
  return (
    <Box>
      <Button
        className={className}
        type={type}
        w={w}
        bg={bg}
        mt={marginTop}
        padding="25px 35px 25px 35px"
        borderRadius="25px"
        fontSize={"15px"}
        color={color}
        fontWeight="700"
        alignSelf={alignSelf}
        isLoading={isLoading}
        _hover={{ bgGradient: "linear(to-l, #7928CA, #FF0080)" }}
        onClick={onClick}
      >
        {value}
      </Button>
    </Box>
  );
};

export default CustomButton;
