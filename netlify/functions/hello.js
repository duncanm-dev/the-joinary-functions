// hello there!
// 
// I'm a serverless function that you can deploy as part of your site.
// I'll get deployed to AWS Lambda, but you don't need to know that. 
// You can develop and deploy serverless functions right here as part
// of your site. Netlify Functions will handle the rest for you.

const { throwForAuth } = require('../../util/auth')


exports.handler = async event => {
    let auth = throwForAuth( event.queryStringParameters );

    if (auth !== undefined) return auth;

    const subject = event.queryStringParameters.name || 'World'
    return {
        statusCode: 200,
        body: `Hello ${subject}!`,
    }
}