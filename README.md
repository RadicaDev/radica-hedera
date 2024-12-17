# Radica implementation using Hedera Hashgraph Native Services (unit demo)

## Overview

This project leverages **Hedera Hashgraph** to build a decentralized system for managing product certificates and traceability. It uses the **Hedera File Service (HFS)** for certificate storage and the **Hedera Token Service (HTS)** for tokenizing certificates as NFTs. The system ensures transparency, security, and scalability, providing tamper-proof verification of product authenticity.

## Features

This is just an example script to demonstrate how the Radica System can be implemented using Hedera Hashgraph Native Services.

The script will:

1. Create a token on HTS.
2. Generate and upload a certificate to HFS.
3. Mint a token associated with the certificate.
4. Verify the just created product.

## Getting Started

### Requirements

- nodejs
- Hedera Hashgraph testnet account

### Install Dependencies

run the following command to install the required dependencies:

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root and configure it with the following details:

```env
cp .env.example .env
```

Update the `.env` file with your Hedera account ID and private key.

```env
ACCOUNT_ID=your-hedera-account-id
PRIVATE_KEY=your-hedera-private-key
```

### Run the Project

run the following command to start the project:

```bash
node src/index.js
```

### Expected Output

```plaintext
********** Creating Radica Token on HTS **********
Token created with tokenId: 0.0.5281388

********** Creating Certificate **********
Recovered address from tag: 0x9cc98b297731f97644865becc12851aa7ffeb11a
Account created with accountId: 0.0.5281389
Creating certificate: {
  "id": "895097132751182793199175099238535307862304796954",
  "metadata": {
    "serialNumber": "12345",
    "name": "Product Certificate",
    "description": "This is a product certificate",
    "image": "https://example.com/image.png",
    "manufacturer": "Manufacturer A",
    "externalUrl": "https://example.com"
  },
  "traceabilityMetadata": {
    "batchId": "batch-001",
    "supplierChainHash": "hash1234567890"
  }
}

Saving certificate to File Service...

Certificate saved with fileId: 0.0.5281390

********** Minting token **********
Token created with serial: 1
Writing serial on NFC Tag


********** Verifying Certificate **********
Recovered address from tag: 0x9cc98b297731f97644865becc12851aa7ffeb11a
Read serial from NFC Tag: 1
Retrieving token metadata...
Token metadata: 0.0.5281390
Verifying certificate with fileId 0.0.5281390
Certificate Retrieved: {
  "address": "9cc98b297731f97644865becc12851aa7ffeb11a",
  "certificate": {
    "id": "895097132751182793199175099238535307862304796954",
    "metadata": {
      "serialNumber": "12345",
      "name": "Product Certificate",
      "description": "This is a product certificate",
      "image": "https://example.com/image.png",
      "manufacturer": "Manufacturer A",
      "externalUrl": "https://example.com"
    },
    "traceabilityMetadata": {
      "batchId": "batch-001",
      "supplierChainHash": "hash1234567890"
    }
  }
}


******************************************
********** Certificate Verified **********
******************************************
```
