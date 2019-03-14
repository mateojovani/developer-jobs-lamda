'use strict'

module.exports.search = async (event, context) => {
    const request = require('request-promise')
    const endpoint = "https://www.reed.co.uk/api/1.0"
    const auth = "Basic " + new Buffer(process.env.reedAPIKey + ":").toString("base64")

    let queryString = ""
    for (let param in event.queryStringParameters) {
        queryString += `${param}=${event.queryStringParameters[param]}&`
    }

    const response = await request.get({
        url: `${endpoint}/search?${queryString}`,
        headers: {
            "Authorization": auth
        }
    })

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: response
    }
}
