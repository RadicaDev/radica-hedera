const { Metadata, TraceabilityMetadata, Certificate } = require("./certificate");
const { createCertificate, verifyCertificate } = require("./hederaService");

(async () => {
    const metadata = new Metadata(
        "12345",
        "Product Certificate",
        "This is a product certificate",
        "https://example.com/image.png",
        "Manufacturer A",
        "https://example.com"
    );
    console.log("Using Account ID:", process.env.ACCOUNT_ID);
    console.log("Using Private Key:", process.env.PRIVATE_KEY);

    const traceabilityMetadata = new TraceabilityMetadata(
        "batch-001",
        "hash1234567890"
    );

    const certificate = new Certificate(1, metadata, traceabilityMetadata);

    const fileId = await createCertificate("0x1234567890abcdef", certificate);

    const verifiedCertificate = await verifyCertificate(fileId);
    console.log("Verified Certificate:", verifiedCertificate);
})();
