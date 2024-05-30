const options = {
  method: "GET",
  headers: { "x-cg-demo-api-key": "CG-nh6VEnLH8r2dgGfSb9SB99zT" },
};

fetch(
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => )
  .catch((err) => console.error(err));
