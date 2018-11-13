'use strict'

import { DynamoDB } from 'aws-sdk'
// import { util } from '@bloomprotocol/share-kit'

const uuid = require('uuid')
const sortObject = require('sortobject')
const ethUtil = require('ethereumjs-util')

const dynamoDb = new DynamoDB.DocumentClient()

const recoverHashSigner = (hash, sig) => {
  const signature = ethUtil.toBuffer(sig)
  const sigParams = ethUtil.fromRpcSig(signature)
  const pubKey = ethUtil.ecrecover(hash, sigParams.v, sigParams.r, sigParams.s)
  const sender = ethUtil.publicToAddress(pubKey)
  return ethUtil.bufferToHex(sender)
}

module.exports.create = (req, res, callback) => {
  const body = JSON.parse(req.body)
  if (typeof body.bloom_id !== 'number') {
    callback(null, {
      statusCode: 400,
      body: 'Missing expected `bloom_id` of type `number` field in request.'
    })
  }
  if (!(body.data instanceof Array)) {
    callback(null, {
      statusCode: 400,
      body: 'Missing expected `data` field of type `Array` field in request.'
    })
  }
  if (typeof body.token !== 'string') {
    callback(null, {
      statusCode: 400,
      body: 'Missing expected `token` field of type `string` field in request.'
    })
  }
  if (typeof body.signature !== 'string') {
    callback(null, {
      statusCode: 400,
      body: 'Missing expected `signature` field of type `string` field in request.'
    })
  }

  // Recover address of wallet that signed the payload
  const qrToken = (String(body.token)).trim()
  const sortedData = body.data.map(d => sortObject(d))
  const sortedDataJSON = JSON.stringify(
    sortObject({
      data: sortedData,
      token: qrToken
    })
  )

  let packedData = ethUtil.addHexPrefix(ethUtil.keccak256(sortedDataJSON).toString('hex'))
  console.log(`sortedDataJSON = ${sortedDataJSON}`)

  if (body.packedData !== packedData) {
    callback(null, {
      statusCode: 400,
      body: 'Previously computed packedData is different.'
    })
  }

  const signerEthAddress = recoverHashSigner(
    ethUtil.toBuffer(ethUtil.addHexPrefix(ethUtil.keccak256(sortedDataJSON))),
    body.signature
  )
  console.log(signerEthAddress)

  /*const verified = body.data.every(data => {
    return util.verifyProof(data)
  })
  if (!verified) {
    callback(null, {
      statusCode: 400,
      body: "Can't verify that the plaintext data belongs to the merkle tree with the specified rootHash"
    })
  }*/

  const timestamp = new Date().getTime()
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      text: String(body),
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  }

  // write the bloom identity to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      callback(null, {
        statusCode: error.statusCode || 501,
        body: 'Couldn\'t create the bloom identity item.'
      })
    }

    // create a response
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        token: body.token
      })
    })
  })
}
