import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  //Backend url

  const url = "http://localhost:4000";
  //to store token  which are returned by success

  const [token, setToken] = useState("");

  //to get images data from database
  const [food_list, setFoodList] = useState([]);
  const [food_search_list, setFoodSearhcList] = useState([]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) {
        return { ...prev, [itemId]: 1 };
      } else {
        return { ...prev, [itemId]: prev[itemId] + 1 };
      }
    });

    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId] === 1) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      } else {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      }
    });

    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {

      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        console.log(itemInfo.price)
        totalAmount += itemInfo.price * cartItems[item];
        // totalAmount=50;
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list"); //api

    setFoodList(response.data.data);
  };


  const fetchSearhcList = async (name) => {
    console.log("hello world search list")
    const response = await axios.get(url + `/api/food/search/${name}`); //api

    setFoodSearhcList(response.data.data);
  };


  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    //to load foodimages data

    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }

    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    food_search_list,
    fetchSearhcList

  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
