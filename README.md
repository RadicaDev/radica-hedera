# Decentralized Certification and Traceability System

## Overview
This project leverages **Hedera Hashgraph** to build a decentralized system for managing product certificates and traceability. It uses the **Hedera File Service (HFS)** for certificate storage and the **Hedera Token Service (HTS)** for tokenizing certificates as NFTs. The system ensures transparency, security, and scalability, providing tamper-proof verification of product authenticity.

## Features
- **Certificate Management**: Create and store detailed certificates with metadata (e.g., serial number, description, batch ID).
- **Tokenization**: Mint unique NFTs associated with certificates and assign ownership to specific accounts.
- **Verification**: Verify certificates and linked tokens, ensuring product authenticity and traceability.
- **Decentralization**: Leverage Hedera's distributed ledger for immutable records and secure transactions.

## Technology Stack
- **Backend**: Node.js
- **Blockchain**: Hedera Hashgraph
  - **Hedera File Service (HFS)**: For certificate storage.
  - **Hedera Token Service (HTS)**: For minting and managing NFTs.
- **Environment Configuration**: dotenv

## Packages to Install
Install the following npm packages to set up the project:

```bash
npm install @hashgraph/sdk dotenv
```

### Package Details
- **@hashgraph/sdk**: Provides the SDK for interacting with Hedera services.
- **dotenv**: Allows secure management of environment variables.

## How to Run the Project

### Prerequisites
1. **Node.js**: Install the latest version of Node.js from [here](https://nodejs.org/).
2. **Hedera Testnet Account**: Set up an account on the Hedera Testnet (or Mainnet for production).
3. **Environment Variables**: Create a `.env` file in the project root and configure it with the following details:

```env
ACCOUNT_ID=your-hedera-account-id
PRIVATE_KEY=your-hedera-private-key
```

### Steps to Run
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Project**:
   ```bash
   node src/index.js
   ```

### Expected Output
- The script will:
  1. Create a token on HTS.
  2. Generate and upload a certificate to HFS.
  3. Mint a token associated with the certificate.
  4. Assign the token to a specified account.
  5. Log all operations to the console.

## Example Output
```plaintext
Creating Radica Token on HTS...
Token created with tokenId: 0.0.XXXXXXX
Address recovered from tag: 0.0.12345
Creating certificate: {...certificate}
Saving certificate to File Service...
Certificate saved with fileId: 0.0.XXXXXXX
Minting token with metadata 0.0.XXXXXXX and assigning it to accountId: 0.0.12345
Token created with serial: 1
Writing serial on NFC Tag
```

## License
This project is licensed under the MIT License.