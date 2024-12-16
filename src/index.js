const { Hbar, PublicKey } = require("@hashgraph/sdk");
const {
  Metadata,
  TraceabilityMetadata,
  Certificate,
} = require("./certificate");
const {
  createAccount,
  createCertificate,
  verifyCertificate,
  createToken,
  mintToken,
  getNftInfo,
} = require("./hederaService");

(async () => {
  console.log("********** Creating Radica Token on HTS **********");

  const tokenId = await createToken();
  console.log(`Token created with tokenId: ${tokenId}`);

  console.log("\n********** Creating Certificate **********");

  const recoveredPublicKey = PublicKey.fromStringECDSA(
    "0x02493ade2837d409db022bb9cde7becfe22a350c97bb75a9e3df4415a79f8ec4de",
  );
  const recoveredAddress = recoveredPublicKey.toEvmAddress();
  console.log("Recovered address from tag:", `0x${recoveredAddress}`);
  const initBalance = new Hbar(0);
  const derivedAccountId = await createAccount(recoveredPublicKey, initBalance);
  console.log("Account created with accountId:", derivedAccountId.toString());

  const metadata = new Metadata(
    "12345",
    "Product Certificate",
    "This is a product certificate",
    "https://example.com/image.png",
    "Manufacturer A",
    "https://example.com",
  );

  const traceabilityMetadata = new TraceabilityMetadata(
    "batch-001",
    "hash1234567890",
  );

  const certificate = new Certificate(
    BigInt(`0x${recoveredAddress}`).toString(),
    metadata,
    traceabilityMetadata,
  );
  console.log("Creating certificate:", JSON.stringify(certificate, null, 2));

  console.log("\nSaving certificate to File Service...");
  const fileId = await createCertificate(recoveredAddress, certificate);
  console.log(`\nCertificate saved with fileId: ${fileId}`);

  console.log(`\n********** Minting token **********`);
  const nftSerial = await mintToken(tokenId, fileId);
  console.log(`Token created with serial: ${nftSerial}`);

  console.log("Writing serial on NFC Tag");

  console.log("\n\n********** Verifying Certificate **********");

  console.log("Recovered address from tag:", `0x${recoveredAddress}`);
  console.log("Read serial from NFC Tag:", nftSerial.toString());

  console.log("Retrieving token metadata...");

  const metadataRetrieved = await getNftInfo(tokenId, nftSerial);
  console.log("Token metadata:", metadataRetrieved);

  console.log(`Verifying certificate with fileId ${metadataRetrieved}`);
  const certificateRetrieved = await verifyCertificate(metadataRetrieved);
  console.log(
    "Certificate Retrieved:",
    JSON.stringify(certificateRetrieved, null, 2),
  );

  console.log("\n\n******************************************");
  console.log("********** Certificate Verified **********");
  console.log("******************************************");
  process.exit(0);
})().catch((error) => {
  console.error("Error:", error);
  process.exit(-1);
});
