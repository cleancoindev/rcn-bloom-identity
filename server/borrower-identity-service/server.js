const express = require('express');
const app = express();
const port = 3001;
const ethUtil = require('ethereumjs-util');
const sortObject = require('sortobject');
let receivedRequests = [];
const recoverHashSigner = (hash, sig) => {
    const signature = ethUtil.toBuffer(sig);
    const sigParams = ethUtil.fromRpcSig(signature);
    const pubKey = ethUtil.ecrecover(hash, sigParams.v, sigParams.r, sigParams.s);
    const sender = ethUtil.publicToAddress(pubKey);
    return ethUtil.bufferToHex(sender);
};
app.use(express.json());
app.post('/api/receiveData', (req, res, next) => {
    console.log("reqbody : ", req.body);
    console.log("res : ", res);
    console.log("#####");
    try {
        if (typeof req.body.bloom_id !== 'number') {
            throw new Error('Missing expected `bloom_id` of type `number` field in request.');
        }
        if (!(req.body.data instanceof Array)) {
            throw new Error('Missing expected `data` field of type `Array` field in request.');
        }
        if (typeof req.body.token !== 'string') {
            throw new Error('Missing expected `token` field of type `string` field in request.');
        }
        if (typeof req.body.signature !== 'string') {
            throw new Error('Missing expected `signature` field of type `string` field in request.');
        }
        console.log(req.body.bloom_id, req.body.data, req.body.token, req.body.signature, req.body.signerEthAddress);
        receivedRequests.push(req.body);
        //Recover address of wallet that signed the payload
        const qrToken = (String(req.body.token)).trim();
        const sortedData = req.body.data.map(d => sortObject(d));
        const sortedDataJSON = JSON.stringify(sortObject({
            data: sortedData,
            token: qrToken,
        }));
        let packedData = ethUtil.addHexPrefix(ethUtil.keccak256(sortedDataJSON).toString("hex"));
        console.log(`sortedDataJSON = ${sortedDataJSON}`);
        console.log(`Previously computed packedData = ${packedData}`);
        console.log(`Newly computed packedData = ${packedData}`);
        if (req.body.packedData !== packedData) {
            throw Error("Previously computed packedData doesn't match the newly computed " +
                `packedData for the following data: ${sortedDataJSON}`);
        }
        const signerEthAddress = recoverHashSigner(ethUtil.toBuffer(ethUtil.addHexPrefix(ethUtil.keccak256(sortedDataJSON))), req.body.signature);
        console.log(`signerEthAddress = '${signerEthAddress}'`);
        //Check that the recovered address matches the subject of the attestation
        //...
        //...
        //Validate parsedData using the embedded Merkle Proof
        //...
        //...
        return res.status(200).json({
            success: true,
            token: req.body.token,
        });
    }
    catch (error) {
        console.log('Encountered an error while receiving data', JSON.stringify({
            error
        }));
        return error;
    }
});
