import * as AWS from "aws-sdk";

import { S3Event, S3Handler } from "aws-lambda";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handler: S3Handler = async (event: S3Event): Promise<any> => {
  try {
    const method = "save-movies.handler";
    const prefix = method;

    console.log(`${prefix} - started`);

    return {
      statusCode: 200,
      body: JSON.stringify(event),
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
