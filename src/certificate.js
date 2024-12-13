class Metadata {
    constructor(serialNumber, name, description, image, manufacturer, externalUrl) {
        this.serialNumber = serialNumber;
        this.name = name;
        this.description = description;
        this.image = image;
        this.manufacturer = manufacturer;
        this.externalUrl = externalUrl;
    }
}

class TraceabilityMetadata {
    constructor(batchId, supplierChainHash) {
        this.batchId = batchId;
        this.supplierChainHash = supplierChainHash;
    }
}

class Certificate {
    constructor(id, metadata, traceabilityMetadata) {
        this.id = id;
        this.metadata = metadata;
        this.traceabilityMetadata = traceabilityMetadata;
    }
}

module.exports = { Metadata, TraceabilityMetadata, Certificate };

