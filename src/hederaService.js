const {
  Client,
  FileCreateTransaction,
  FileContentsQuery,
  PrivateKey,
  TokenCreateTransaction,
  TokenMintTransaction,
  TokenType,
  TokenSupplyType,
  AccountCreateTransaction,
  NftId,
  TokenNftInfoQuery,
} = require("@hashgraph/sdk");
require("dotenv").config();

const client = Client.forTestnet();
client.setOperator(
  process.env.ACCOUNT_ID,
  PrivateKey.fromStringECDSA(process.env.PRIVATE_KEY),
);

async function createAccount(publicKey, initialBalance) {
  try {
    const res = await new AccountCreateTransaction()
      .setInitialBalance(initialBalance)
      .setKey(publicKey)
      .execute(client);
    const receipt = await res.getReceipt(client);
    return receipt.accountId;
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
}

async function createToken() {
  try {
    const supplyKey = PrivateKey.fromStringECDSA(process.env.PRIVATE_KEY);

    const transaction = new TokenCreateTransaction()
      .setTokenName("Radica Token")

      .setTokenSymbol("RDT")
      .setTreasuryAccountId(process.env.ACCOUNT_ID)
      .setTokenType(TokenType.NonFungibleUnique)
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
      PrivateKey.fromStringECDSA(process.env.PRIVATE_KEY),
    );
    const submitTx = await signTx.execute(client);

    const receipt = await submitTx.getReceipt(client);
    return receipt.fileId;
  } catch (error) {
    console.error("Error creating certificate:", error);
    throw error;
  }
}

async function mintToken(tokenId, fileId) {
  try {
    const metadata = fileId.toString();

    const transaction = new TokenMintTransaction()
      .setTokenId(tokenId)
      .setMetadata([Buffer.from(metadata)])
      .freezeWith(client);
    const signTx = await transaction.sign(
      PrivateKey.fromStringECDSA(process.env.PRIVATE_KEY),
    );
    const submitTx = await signTx.execute(client);

    const receipt = await submitTx.getReceipt(client);
    return receipt.serials[0];
  } catch (error) {
    console.error("Error minting token:", error);
    throw error;
  }
}

async function getNftInfo(tokenId, serial) {
  const nftId = new NftId(tokenId, serial);
  try {
    const tokenInfo = await new TokenNftInfoQuery()
      .setNftId(nftId)
      .execute(client);

    return tokenInfo[0].metadata.toString();
  } catch (error) {
    console.error("Error getting NFT info:", error);
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
  createAccount,
  createCertificate,
  verifyCertificate,
  createToken,
  mintToken,
  getNftInfo,
};
