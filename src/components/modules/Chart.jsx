import { useState, useEffect } from "react";
import styles from "./Chart.module.css";
import { convertData } from "../../helpers/convertData";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const Chart = ({ chart, setChart }) => {
  const [type, setType] = useState("prices");
  const typeHandler = (event) => {
    if (event.target.tagName === "BUTTON") {
      const typeName = event.target.innerText.toLowerCase().replace(" ", "_");
      setType(typeName);
    }
  };
  const handleCloseModal = (event) => {
    if (event.target.className === styles.container) {
      setChart(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleCloseModal);
    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleCloseModal);
    };
  }, []);

  return (
    <section className={styles.container}>
      <span className={styles.cross} onClick={() => setChart(null)}>
        X
      </span>
      <article className={styles.chart}>
        <div className={styles.name}>
          <img src={chart.coin.image} alt={chart.coin.name} />
          <p>{chart.coin.name}</p>
        </div>
        <ChartComponent data={convertData(chart, type)} type={type} />
        <div className={styles.types} onClick={typeHandler}>
          <button className={type === "prices" ? styles.selected : null}>
            Prices
          </button>
          <button className={type === "market_caps" ? styles.selected : null}>
            Market Caps
          </button>
          <button className={type === "total_volumes" ? styles.selected : null}>
            Total Volumes
          </button>
        </div>
        <div className={styles.details}>
          <div>
            <p>Price:</p>
            <span>${chart.coin.current_price}</span>
          </div>
          <div>
            <p>ATH:</p>
            <span>${chart.coin.ath}</span>
          </div>
          <div>
            <p>Market Cap:</p>
            <span>{chart.coin.market_cap.toLocaleString()}</span>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Chart;

const ChartComponent = ({ data, type }) => {
  return (
    <div className={styles.graph}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={400} height={400} data={data}>
          <Line
            type="monotone"
            dataKey={type}
            stroke="#3874ff"
            strokeWidth="2px"
          />
          <XAxis dataKey="date" hide />
          <YAxis dataKey={type} domain={["auto", "auto"]} />
          <CartesianGrid stroke="#404042" strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
