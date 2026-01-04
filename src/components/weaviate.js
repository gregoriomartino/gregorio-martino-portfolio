
import weaviate, { ApiKey } from "weaviate-ts-client";

export const client = weaviate.client({
  scheme: "https",
  host: "pzrtittctqmxoe0xuv86uw.c0.europe-west3.gcp.weaviate.cloud",
  apiKey: new ApiKey(
    "Rmg5VDVpcVd3WERpZjUrWV9TUk4rdXR0OTBMSUFNaDBBUkxTTWJrWGl5cCtabGpLOXFraW00YzBicWI0PV92MjAw"
  ),
});
