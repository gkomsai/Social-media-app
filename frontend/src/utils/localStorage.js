
// function for getting the data in Local storage
export const getItemFromLocal = (key) =>{
    try {
      let temp =JSON.parse(localStorage.getItem(key));
      return temp;  
    } catch (error) {
        return undefined
    }
};



// function for saving the data in Local storage
export const  saveItemToLocal = (key,data) => {
    localStorage.setItem(key, JSON.stringify(data));
};



export  const removeItemFromLocal = (key) => {
    return localStorage.removeItem(key);
};