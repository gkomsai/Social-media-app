export const notify = (toast, title, status, description) => {
    return toast({
      title,
      status,
      description,
      duration: 3000,
      position: "top",
      isClosable: true,
    });
  };
  
 export const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1)+"..." : string;
  };