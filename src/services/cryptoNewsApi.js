import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_CRYPTO_NEWS_API,
    'X-RapidAPI-Host': process.env.REACT_APP_RAPIDAPI_CRYPTO_NEWS_HOST 
};

const baseUrl = process.env.REACT_APP_RAPIDAPI_CRYPTO_NEWS_URL;

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory }) => createRequest(`/v1/search?q=${newsCategory}&country=us&language=en`)
        })
    })  
})


export const { useGetCryptoNewsQuery } = cryptoNewsApi;