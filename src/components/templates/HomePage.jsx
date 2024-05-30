import { useEffect, useState } from "react";

import { getCoins, options } from "../../services/cryptoApi";
import TableCoin from "../modules/TableCoin";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";
import Chart from "../modules/Chart";

const HomePage = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);
  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
    }
    const getData = async () => {
      try {
        const res = await fetch(getCoins(page, currency), options);
        const data = await res.json();
        setCoins(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [page, currency]);

  return (
    <>
      <Search
        currency={currency}
        setCurrency={setCurrency}
        chart={chart}
        setChart={setChart}
      />
      <TableCoin
        coins={coins}
        isLoading={isLoading}
        currency={currency}
        setChart={setChart}
      />
      <Pagination page={page} setPage={setPage} />
      {!!chart && <Chart chart={chart} setChart={setChart} />}
    </>
  );
};

export default HomePage;
