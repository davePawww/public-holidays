import axios from "axios";

const BASE_URL = "https://openholidaysapi.org";

export const getPublicHolidays = async (countryIsoCode: string) => {
  const currentYear = new Date().getFullYear();
  const response = await axios.get(`${BASE_URL}/PublicHolidays`, {
    params: {
      countryIsoCode,
      validFrom: `${currentYear}-01-01`,
      validTo: `${currentYear}-12-31`,
      languageIsoCode: "EN",
    },
  });
  return response.data;
};
