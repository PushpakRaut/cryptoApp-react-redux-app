import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_CRYPTO_API,
  "X-RapidAPI-Host": process.env.REACT_APP_RAPIDAPI_CRYPTO_HOST,
};

const baseUrl = process.env.REACT_APP_RAPIDAPI_CRYPTO_URL;

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });
 
export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoCoins: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`)
    }),
  }),
});

export const { useGetCryptoCoinsQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetCryptoExchangesQuery } = cryptoApi;
