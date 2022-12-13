const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns event.partitionKey if it is a string", () => {
    const event = {
      partitionKey: "testKey",
    };
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe(event.partitionKey);
  });

  it("Returns event.partitionKey converted to JSON if it exists but is not a string", () => {
    const event = {
      partitionKey: 123,
    };
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe(JSON.stringify(event.partitionKey));
  });

  it("Length of return value does not exceed MAX_PARTITION_KEY_LENGTH (256) even when event.partitionKey is longer", () => {
    const event = {
      partitionKey: "a".repeat(300),
    };
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey.length).toBeLessThanOrEqual(256);
  });
});
