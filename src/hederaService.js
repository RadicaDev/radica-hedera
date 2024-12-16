const {
  Client,
  FileCreateTransaction,
  FileContentsQuery,
  PrivateKey,
  TokenCreateTransaction,
  TokenMintTransaction,
  TokenType,
  TokenSupplyType,
  Hbar,
} = require("@hashgraph/sdk");
require("dotenv").config();

const client = Client.forTestnet();
client.setOperator(
  process.env.ACCOUNT_ID,
  PrivateKey.fromStringECDSA(process.env.PRIVATE_KEY)
);

async function createToken() {
  try {
    const supplyKey = PrivateKey.fromStringECDSA(process.env.PRIVATE_KEY);

    const transaction = new TokenCreateTransaction()
      .setTokenName("Radica Token")

      .setTokenSymbol("RDT")
      .setTreasuryAccountId(process.env.ACCOUNT_ID)
      .setTokenType(TokenType.FungibleCommon)
      .setSupplyType(TokenSupplyType.Finite)
      .setMaxSupply(2000)
      .setInitialSupply(0)
      .setDecimals(0)
      .setSupplyKey(supplyKey.publicKey)
      .freezeWith(client);

    const signTx = await transaction.sign(supplyKey);
    const submitTx = await signTx.execute(client);

    const receipt = await submitTx.getReceipt(client);
    return receipt.tokenId;
  } catch (error) {
    console.error("Error creating token:", error);
    throw error;
  }
}

async function createCertificate(address, certificate) {
  try {
    const certificateContent = JSON.stringify({
      address: address,
      certificate: certificate,
    });

    const transaction = new FileCreateTransaction()
      .setContents(certificateContent)
      .setKeys([PrivateKey.fromStringECDSA(process.env.PRIVATE_KEY).publicKey])
      .freezeWith(client);

    const signTx = await transaction.sign(
      PrivateKey.fromStringECDSA(process.env.PRIVATE_KEY)
    );
    const submitTx = await signTx.execute(client);

    const receipt = await submitTx.getReceipt(client);
    return receipt.fileId;
  } catch (error) {
    console.error("Error creating certificate:", error);
    throw error;
  }
}

async function mintToken(tokenId, fileId, accountId) {
  try {
    const metadata = fileId.toString();

    const transaction = new TokenMintTransaction()
      .setTokenId(tokenId)
      .setMetadata([Buffer.from(metadata)])
      .setMaxTransactionFee(new Hbar(20)) // Use when HBAR is under 10 cents
      .freezeWith(client);
    const signTx = await transaction.sign(
      PrivateKey.fromStringECDSA(process.env.PRIVATE_KEY)
    );
    const submitTx = await signTx.execute(client);

    const receipt = await submitTx.getReceipt(client);
    console.log("******************Token minted:****************", receipt);

    // Get the serial number from the record, not the receipt
    const record = await submitTx.getRecord(client);
    //   const serial = record.serials[0];

    console.log(`Minted NFT with serial: ${record.serials}`);
    console.log(
      `Assigning token serial ${record.serials} to accountId: ${accountId}`
    );
    return serial;
  } catch (error) {
    console.error("Error minting token:", error);
    throw error;
  }
}

async function verifyCertificate(fileId) {
  try {
    const fileContents = await new FileContentsQuery()
      .setFileId(fileId)
      .execute(client);

    const certificateContent = fileContents.toString();
    return JSON.parse(certificateContent);
  } catch (error) {
    console.error("Error verifying certificate:", error);
    throw error;
  }
}

module.exports = {
  createCertificate,
  verifyCertificate,
  createToken,
  mintToken,
};
