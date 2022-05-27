import { AzureStorageOptions } from '@nestjs/azure-storage';

const { SAS_KEY, CONTAINTER_NAME, ACCOUNT_NAME, BASE_URI } = process.env;

export function AzureConfig(): AzureStorageOptions {
  return {
    sasKey: `${SAS_KEY}`,
    containerName: `${CONTAINTER_NAME}`,
    accountName: `${ACCOUNT_NAME}`,
    clientOptions: {
      baseUri: `${BASE_URI}`,
    },
  };
}
