import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HistoryChart from "../components/HistoryChart";
import CoinData from "../components/CoinData";
import CoinGecko from "../Apis/CoinGecko";

const CoinDetailPage = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  //console.log(id);

  const formatData = (data) => {
    return data.map((ele) => {
      return {
        t: ele[0],
        y: ele[1].toFixed(2),
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [day, week, year, detail] = await Promise.all([
        CoinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "inr",
            days: "1",
          },
        }),
        CoinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "inr",
            days: "7",
          },
        }),
        CoinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "inr",
            days: "365",
          },
        }),
        CoinGecko.get("/coins/markets/", {
          params: {
            vs_currency: "inr",
            ids: id,
          },
        }),
        setIsLoading(false),
      ]);

      //Promise.all() fuction call all apis together
      //console.log(detail.data);
      //console.log(response.data);
      setCoinData({
        day: formatData(day.data.prices),
        week: formatData(week.data.prices),
        year: formatData(year.data.prices),
        detail: detail.data[0],
      });
    };
    fetchData();
  }, [id]);

  const renderData = () => {
    if (isLoading) {
      return <div>Loading....</div>;
    }
    return (
      <div className="coinlist">
        <HistoryChart data={coinData} />
        <CoinData data={coinData.detail} />
      </div>
    );
  };

  return renderData();
};

export default CoinDetailPage;
