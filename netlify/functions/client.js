const axios = require('axios');

exports.handler = async event => {

    const { text: dueBy } = event.queryStringParameters;
    let within = 7

    switch( dueBy ) {
        case 'week':
            within = 7;
            break;
        case 'fortnight':
            within = 14;
            break;
        case 'month':
            within = 30;
            break;
        case 'year':
            within = 365;
            break;
    }

    let blocks = [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `The following Tasks have Due Dates within *${within} days*.`
                }
            },
            {
                "type": "divider"
            }
        ];

    let tasks = await axios( {
        method: 'get',
        url: `https://thejoinary.teamwork.com/tasklists/2440782/tasks.json?filter=within${within}&getSubTasks=no`,
        headers: {
            Authorization: "Basic dHdwX2RGV01pT0tSWXpUVnE3SlpqWktGa2VDanROY1M="
        }
    } );

    taskBlocks = 
        tasks.data["todo-items"]
            .map( x => {
                return {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `<https://thejoinary.teamwork.com/app/tasks/${x.id}|*${x.content}*>\n\n ${x.description}`
                    }
                }
             } );

    blocks = blocks.concat( taskBlocks );

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
            blocks
        })
    }
}