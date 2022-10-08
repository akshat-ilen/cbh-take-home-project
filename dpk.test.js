const { deterministicPartitionKey } = require("./dpk");

const LONGER_PARTITION_KEY_THAN_MAX_PARTITION_LENGTH =
  "14231fa9845f1451766d04294a13e704d1a9c0d42946b391510bc8422f4f990fe90d4facb31974773596325035975bfc3a352e44d20fd5bcc38d2e6d9e5bb00414231fa9845f1451766d04294a13e704d1a9c0d42946b391510bc8422f4f990fe90d4facb31974773596325035975bfc3a352e44d20fd5bcc38d2e6d9e5bb004acd";
const LONGER_PARTITION_KEY_HASH =
  "01b91ef24ee7f18313c0c7b6ef9c5712b4398b679e3855e1433399ce1b868df6cbdcc41f219ced7482818fa06d65334cd10f158182b9e0267a2def2f34edcd2a";

const TEST_PARTITION_KEY = "test-partition-key";
const PARTITION_KEY_HASH =
  "36f8f4fec52114fbec1789bb8c82ef286383f7ee48d27c76d5eaaef40f338babf0227171021804a0a8fc71d6dad325091863882ba8d98b9b3a40b472aeaa62c5";

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the same literal when input event has partition key", () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey: TEST_PARTITION_KEY,
    });
    expect(trivialKey).toBe(TEST_PARTITION_KEY);
  });

  it("Returns the literal hash key has when input event is passed as string", () => {
    const trivialKey = deterministicPartitionKey(TEST_PARTITION_KEY);
    expect(trivialKey).toBe(PARTITION_KEY_HASH);
  });

  it("Returns the literal when input event have partition key which is number", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: 123 });
    expect(trivialKey).toBe("123");
  });

  it("Returns the literal hash key when input event has partition key whose length is greater than MAX_PARTITION_KEY_LENGTH", () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey: LONGER_PARTITION_KEY_THAN_MAX_PARTITION_LENGTH,
    });
    expect(trivialKey).toBe(LONGER_PARTITION_KEY_HASH);
  });
});
