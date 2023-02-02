const axios = require('axios');

exports.handler = async event => {

    const { text: clientName } = event.queryStringParameters;

    let tasks = axios( {
        method: 'get',
        url: "https://thejoinary.teamwork.com/tasklists/2440782/tasks.json",
        headers: {
            Authorization: "Basic dHdwX2RGV01pT0tSWXpUVnE3SlpqWktGa2VDanROY1M="
        }
    } );

    // Teamwork calls here

    // 1. Find all Tasks with that name
    // 2. Find all Projects with that name
    // 3. (optional) Find CRM Tiles with that name
    // 4. Aggregate data into an easy to read response
    // 5. Append links
    // 6. Fire response

    return {
        statusCode: 200,
        body: JSON.stringify({
            response_type: 'ephemeral',
            text: JSON.stringify(tasks)
        })
    }
}