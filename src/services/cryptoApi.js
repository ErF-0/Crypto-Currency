const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
const options = {
  method: "GET",
  headers: { "x-cg-demo-api-key": import.meta.env.VITE_REACT_APP_API_KEY },
};

const searchOptions = (controller) => {
  const options = {
    signal: controller.signal,
    method: "GET",
    headers: { "x-cg-demo-api-key": import.meta.env.VITE_REACT_APP_API_KEY },
  };
  return options;
};

const getCoins = (page, currency) =>
  `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}`;
const getCoin = (coinId) =>
  `${BASE_URL}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
const searchCoins = (query) => `${BASE_URL}/search?query=${query}`;
const chartCoin = (coinId) =>
  `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=7`;

export { searchCoins, getCoins, options, searchOptions, chartCoin, getCoin };
