import React, { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  //console.log(localStorage.getItem("watchList").split(","));

  const [watchList, setWatchList] = useState(
    localStorage.getItem("watchList")?.split(",") || [
      "bitcoin",
      "ethereum",
      "ripple",
      "litecoin",
    ]
  );

  useEffect(() => {
    localStorage.setItem("watchList", watchList);
  }, [watchList]);

  const deleteCoin = (coin) => {
    setWatchList(
      watchList.filter((ele) => {
        return ele !== coin;
      })
    );
  };

  const addCoin = (coin) => {
    if (watchList.indexOf(coin) === -1) {
      setWatchList([...watchList, coin]);
    }
  };

  return (
    <WatchListContext.Provider value={{ watchList, deleteCoin, addCoin }}>
      {props.children}
    </WatchListContext.Provider>
  );
};
