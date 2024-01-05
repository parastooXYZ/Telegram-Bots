const axios = require("axios");
require("dotenv").config();

const ONE_API_TOKEN = process.env.ONE_API_TOKEN;

const getOwghatFromAPI = async (city, enNum) => {
  let result;
  await axios
    .get(
      `https://one-api.ir/owghat/?token=${ONE_API_TOKEN}&city=${city}&en_num=${enNum}`
    )
    .then((res) => (result = res))
    .catch((err) => console.log(err));

  return await result;
};

module.exports = { getOwghatFromAPI };
