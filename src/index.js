const { Metadata, TraceabilityMetadata, Certificate } = require("./certificate");
const { createCertificate, verifyCertificate, createToken, mintToken } = require("./hederaService");

(async () => {
    console.log("Creating Radica Token on HTS...");

    const tokenId = await createToken();
    console.log(`Token created with tokenId: ${tokenId}`);

    const recoveredAddress = "0.0.12347"; // Example recovered address, implement your recovery logic
    console.log(`Address recovered from tag: ${recoveredAddress}`);

    const metadata = new Metadata(
        "12345",
        "Product Certificate",
        "This is a product certificate",
        "https://example.com/image.png",
        "Manufacturer A",
        "https://example.com"
    );

    const traceabilityMetadata = new TraceabilityMetadata(
        "batch-001",
        "hash1234567890"
    );

    const certificate = new Certificate(1, metadata, traceabilityMetadata);
    console.log("Creating certificate:", JSON.stringify(certificate));

    console.log("\nSafing certificate to File Service...");
    const fileId = await createCertificate(recoveredAddress, certificate);
    console.log(`\nCertificate saved with fileId: ${fileId}`);

    console.log(`\nMinting token with metadata ${fileId} and assigning it to accountId: ${recoveredAddress}`);
    const nftSerial = await mintToken(tokenId, fileId, recoveredAddress);
    console.log(`\nToken created with serial: ${nftSerial}`);

    console.log("\nWriting serial on NFC Tag");
    //we need to implement the logic
})();