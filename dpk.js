const crypto = require("crypto");

function createHashKey(candidate) {
  return crypto.createHash("sha3-512").update(candidate).digest("hex");
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event) return TRIVIAL_PARTITION_KEY;

  // If the input contains partition key
  if (event.partitionKey) {
    let candidate = event.partitionKey;

    if (typeof candidate !== "string") candidate = JSON.stringify(candidate);

    return candidate.length > MAX_PARTITION_KEY_LENGTH
      ? createHashKey(candidate)
      : candidate;
  }

  // For all the other input cases.
  return createHashKey(JSON.stringify(event));
};
