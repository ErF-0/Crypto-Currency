import { useEffect, useState, useRef } from "react";
import {
  chartCoin,
  getCoin,
  options,
  searchCoins,
  searchOptions,
} from "../../services/cryptoApi";
import { MiniLoader } from "./Loader";

import styles from "./Search.module.css";
import { clipData } from "../../helpers/convertData";

const Search = ({ currency, setCurrency, chart, setChart }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearchResult, setShowResult] = useState(true);
  const searchBoxRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    setFilteredCoins([]);
    if (!searchText) {
      setIsLoading(false);
      return;
    }
    const fetching = async () => {
      try {
        const res = await fetch(
          searchCoins(searchText),
          searchOptions(controller)
        );
        const data = await res.json();
        setIsLoading(false);
        if (data.coins) {
          setFilteredCoins(data.coins);
        } else {
          alert(data.status.error_message);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      }
    };
    setIsLoading(true);
    fetching();
    return () => controller.abort();
  }, [searchText]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        // Click occurred outside of searchResult div
        setShowResult(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const fetching = async (id) => {
    try {
      const res1 = await fetch(getCoin(id), options);
      const result1 = await res1.json();
      const coinData = clipData(result1);
      const res2 = await fetch(chartCoin(id), options);
      const result2 = await res2.json();
      setChart({ ...result2, coin: coinData });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.searchBox} ref={searchBoxRef}>
      <input
        type="text"
        placeholder="Enter Crypto name"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onClick={() => setShowResult(true)}
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="cny">CNY</option>
      </select>

      {(!!filteredCoins.length || isLoading) && (
        <div
          className={`${styles.searchResult} ${
            showSearchResult ? null : styles.hidden
          }`}
        >
          {isLoading && <MiniLoader />}
          <ul>
            {filteredCoins.map((coin) => (
              <li key={coin.id} onClick={() => fetching(coin.id)}>
                <img src={coin.thumb} alt={coin.name} />
                <p>{coin.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
