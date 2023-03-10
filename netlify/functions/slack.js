import { App, ExpressReceiver } from '@slack/bolt'
import { throwForAuth } from '../../util/auth';

const expressReceiver = new ExpressReceiver({
    signingSecret: `${process.env.SLACK_SIGNING_SECRET}`,
    processBeforeResponse: true
});

const app = new App({
    signingSecret: `${process.env.SLACK_SIGNING_SECRET}`,
    token: `${process.env.SLACK_BOT_TOKEN}`,
    receiver: expressReceiver
});


function parseRequestBody(stringBody) {
    try {
      return JSON.parse(stringBody ?? "");
    } catch {
      return undefined;
    }
  }

export async function handler( event, context ) {
    const payload = parseRequestBody( event.body );

    if(payload && payload.type && payload.type === 'url_verification') {
        return {
          statusCode: 200,
          body: payload.challenge
        };
      }
      
      // Code omitted for brevity
}