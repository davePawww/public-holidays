import axios from "axios";

const BASE_URL = "https://openholidaysapi.org";

const getCountries = async () => {
  const response = await axios.get(`${BASE_URL}/Countries`);
  return response.data;
};

export { getCountries };
