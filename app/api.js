const axios = require('axios');
const URL = 'http://5c35e7f96fc11c0014d32fcd.mockapi.io/compare/products'
import json from './json'

/* Dear reader: API by URL stops to work frequently so I set it into a json and use it properly instead.
             the code works with axios, just comment out the 2 lines and remove the call to getJsonData
             Please NOTE: the data is different from the example in the pdf with task description
*/
export const getData = async (url = URL) => {
    try {
        /* const response = await axios.get(url)
        return response.data.products.sort((a, b) => a.name - b.name) */
        return getJsonData()
    }
    catch (error) {
        console.log(error)
        return error
    }
}

/* This function added due to proxy issue with url, products are listed there as json response */
const getJsonData = async () => {
    try {
        return json.products.sort((a, b) => a.name - b.name)
    }
    catch (error) {
        return error
    }
}
