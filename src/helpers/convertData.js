const convertData = (data, type) => {
  const convertedData = data[type].map((item) => {
    let convertedDate = new Date(item[0]);
    convertedDate = convertedDate.toLocaleDateString();
    return {
      date: convertedDate,
      [type]: item[1],
    };
  });
  return convertedData;
};

const clipData = (data) => {
  const {
    image: { small: image },
    name,
    market_data: {
      ath: { usd: ath },
      current_price: { usd: current_price },
      market_cap: { usd: market_cap },
    },
  } = data;
  return {
    image,
    name,
    ath,
    current_price,
    market_cap,
  };
};

export { convertData, clipData };
