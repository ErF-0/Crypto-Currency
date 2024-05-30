import { chartCoin, options } from "../../services/cryptoApi";
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import Loader from "./Loader";

import styles from "./TableCoin.module.css";

const TableCoin = ({ coins, isLoading, currency, setChart }) => {
  return (
    <section className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th className={styles.hidden}>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th className={styles.hidden}>Total Volume</th>
              <th className={styles.hidden}></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow
                coin={coin}
                key={coin.id}
                currency={currency}
                setChart={setChart}
              />
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default TableCoin;

const TableRow = ({ coin, currency, setChart }) => {
  const {
    id,
    image,
    name,
    symbol,
    current_price,
    total_volume,
    price_change_percentage_24h: price_change,
  } = coin;
  const currencySymbol = {
    usd: "$",
    eur: "€",
    cny: "¥",
  };
  const showHandler = async () => {
    const res = await fetch(chartCoin(id), options);
    const result = await res.json();
    setChart({ ...result, coin });
  };
  return (
    <tr key={id}>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
          <img src={image} alt={name} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td className={styles.hidden}>{name}</td>
      <td>{`${currencySymbol[currency]} ${current_price.toLocaleString()}`}</td>
      <td
        className={
          price_change > 0 ? styles.priceIncrease : styles.priceFalling
        }
      >
        {price_change.toFixed(2)}%
      </td>
      <td className={styles.hidden}>{total_volume.toLocaleString()}</td>
      <td className={styles.hidden}>
        <img src={price_change > 0 ? chartUp : chartDown} alt={name} />
      </td>
    </tr>
  );
};
