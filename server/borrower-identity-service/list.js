'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const params = {
    TableName: process.env.DYNAMODB_TABLE
};
module.exports.list = (event, context, callback) => {
    // fetch all borrower identity from the database
    dynamoDb.scan(params, (error, result) => {
        // handle potential errors
        if (error) {
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t fetch the borrower identity.'
            });
        }
        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Items)
        };
        callback(null, response);
    });
};
