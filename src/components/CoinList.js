import React, { useContext, useEffect, useState } from "react";
import CoinGecko from "../Apis/CoinGecko";
import { WatchListContext } from "../Context/WatchListContext";
import Coin from "./Coin";

const CoinList = () => {
  const [coins, setCoins] = useState([]);
  const { watchList, deleteCoin } = useContext(WatchListContext);
  const [isLoading, setIsLoading] = useState(false);

  //console.log(watchList);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data } = await CoinGecko.get("/coins/markets/", {
        params: {
          vs_currency: "inr",
          ids: watchList.join(","), // array method that join element seperated by ','
        },
      });
      //console.log(data);
      setCoins(data);
      setIsLoading(false);
    };

    if (watchList.length > 0) {
      fetchData();  // fetching data only when length>0 
    } else {
      setCoins([]); // when list is empty , setcoins to []
    }
  }, [watchList]); //every watchlist changes, list re-rendered

  const renderCoins = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <ul className="coinlist list-group mt-2">
        {coins.map((coin) => {
          return <Coin key={coin.id} coin={coin} deleteCoin={deleteCoin} />;
        })}
      </ul>
    );
  };

  return <div>{renderCoins()}</div>;
};

export default CoinList;
