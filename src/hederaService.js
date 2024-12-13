const { Client, FileCreateTransaction, FileContentsQuery, PrivateKey } = require("@hashgraph/sdk");
require("dotenv").config();

const client = Client.forTestnet();
client.setOperator(process.env.ACCOUNT_ID, PrivateKey.fromStringECDSA(process.env.PRIVATE_KEY));

async function createCertificate(address, certificate) {
    try {
        const privateKey = PrivateKey.fromStringECDSA(process.env.PRIVATE_KEY); 
        const certificateContent = JSON.stringify({
            address: address,
            certificate: certificate,
        });

        const transaction = new FileCreateTransaction()
            .setContents(certificateContent)
            .setKeys([privateKey.publicKey])
            .freezeWith(client);

        const signTx = await transaction.sign(privateKey);
        const submitTx = await signTx.execute(client);

        const receipt = await submitTx.getReceipt(client);
        const fileId = receipt.fileId;

        console.log(`Certificate created with File ID: ${fileId}`);
        return fileId;
    } catch (error) {
        console.error("Error creating certificate:", error);
        throw error;
    }
}

async function verifyCertificate(fileId) {
    try {
        const fileContents = await new FileContentsQuery()
            .setFileId(fileId)
            .execute(client);

        const certificateContent = fileContents.toString();
        const parsedContent = JSON.parse(certificateContent);

        console.log("Certificate Content:", parsedContent);
        return parsedContent;
    } catch (error) {
        console.error("Error verifying certificate:", error);
        throw error;
    }
}

module.exports = { createCertificate, verifyCertificate };
