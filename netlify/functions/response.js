function parseRequestBody(stringBody) {
    try {
      return JSON.parse(stringBody ?? "");
    } catch {
      return undefined;
    }
  }

  const axios = require('axios');

  /**
   * Makes a request to a given URL, then awaits the response, and returns it to the requestor.
   * Uses Axios, so see their docs for information on how to structure a request.
   * @param {*} event 
   * @returns 
   */
exports.handler = async event => {
    let requests = parseRequestBody( event.body );

    if (!Array.isArray( requests )) {
        requests = [requests];
    }

    try {
        let responses = [];

        for ( const request of requests ) {
            let res = await axios( request );

            responses.push( {
                data: res.data,
                headers: res.headers
            } );
        }

        return res = {
            statusCode: 200,
            body: JSON.stringify({
                responses
            }),
        };
    } catch(err) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: "No request template supplied.",
                message: "You didn't provide a valid request template. This proxy uses Axios - see below for an example.",
                example: {
                    method: 'post',
                    url: 'https://example.com/api/user/12345',
                    data: {
                        firstName: 'Jonathon',
                        lastName: 'Grumble'
                    }
                },
                options: {
                    multiple_requests: "Provide an array[] to fire multiple requests simultaneously."
                }
            })
        };
    }
} 