<!-- 
layout: Doc
-->

## Structure

The idea behind the `borrower-identity-service` directory is that in case you want to create a service containing multiple resources e.g. bloom identity jsons.

## Use-cases

- API for a Web Application
- API for a Mobile Application

## Setup

```bash
npm install
```

## Deploy

In order to deploy the endpoint simply run

```bash
serverless deploy
```

The expected result should be similar to:

```bash
Serverless: Packaging service…
Serverless: Uploading CloudFormation file to S3…
Serverless: Uploading service .zip file to S3…
Serverless: Updating Stack…
Serverless: Checking Stack update progress…
Serverless: Stack update finished…

Service Information
service: rcn-bloom-identity
stage: dev
region: us-east-1
api keys:
  None
endpoints:
  POST - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/borrower-identity-service
  GET - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/borrower-identity-service
  GET - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/borrower-identity-service/{id}
  PUT - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/borrower-identity-service/{id}
  DELETE - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/borrower-identity-service/{id}

## Usage

You can create, retrieve, update, or delete borrower-identity with the following commands:

### Create a identity

```bash
curl -X POST https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/borrower-identity-service --data '{ "text": "Bloom identity json" }'
```

Example Result:
```bash
{"text":"Bloom identity json","id":"ee6490d0-aa81-11e6-9ede-afdfa051af86","createdAt":1479138570824,"checked":false,"updatedAt":1479138570824}%
```

### List all borrower identity

```bash
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/borrower-identity-service
```

Example output:
```bash
[{"text":"Bloom identity json 1","id":"ac90fe80-aa83-11e6-9ede-afdfa051af86","checked":true,"updatedAt":1479139961304},{"text":"Bloom identity json 2","id":"20679390-aa85-11e6-9ede-afdfa051af86","createdAt":1479139943241,"checked":false,"updatedAt":1479139943241}]%
```

### Get one Bloom Identity

```bash
# Replace the <id> part with a real id from your borrower identity table
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/borrower-identity-service/<id>
```

Example Result:
```bash
{"text":"JSON","id":"ee6490d0-aa81-11e6-9ede-afdfa051af86","createdAt":1479138570824,"checked":false,"updatedAt":1479138570824}%
```

### Update a Bloom Identity

```bash
# Replace the <id> part with a real id from your ower identity table
curl -X PUT https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/borrower-identity-service/<id> --data '{ "text": "JSON", "checked": true }'
```

Example Result:
```bash
{"text":"JSON","id":"ee6490d0-aa81-11e6-9ede-afdfa051af86","createdAt":1479138570824,"checked":true,"updatedAt":1479138570824}%
```

### Delete a  Bloom Identity

```bash
# Replace the <id> part with a real id from your borrower identity table
curl -X DELETE https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/borrower-identity-service/<id>
```
