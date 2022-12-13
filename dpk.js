const crypto = require("crypto");

function createPartitionKey(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  // Return default value if no argument is passed
  if (event === undefined) {
    return TRIVIAL_PARTITION_KEY;
  }

  // Get candidate key from argument
  let candidate = event.partitionKey
    ? event.partitionKey
    : createPartitionKey(JSON.stringify(event));

  // Ensure we return a string
  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  // Truncate the result if too long
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createPartitionKey(candidate);
  }
  return candidate;
};
