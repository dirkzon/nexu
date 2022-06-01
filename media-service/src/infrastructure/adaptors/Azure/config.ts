import { AzureStorageOptions } from '@nestjs/azure-storage';

const { SAS_KEY, CONTAINTER_NAME, ACCOUNT_NAME, BASE_URI } = process.env;

export function AzureConfig(): AzureStorageOptions {
  return {
    sasKey: "?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-09-08T18:25:41Z&st=2022-05-09T10:25:41Z&spr=https,http&sig=8oStHDrwtp84snF0p0i1oDzocjjZAjiPkzYFXjwv4Iw%3D",
    containerName: "nexu-image-container",
    accountName: "nexumedia",
    clientOptions: {
      baseUri:"BlobEndpoint=https://nexumedia.blob.core.windows.net/;QueueEndpoint=https://nexumedia.queue.core.windows.net/;FileEndpoint=https://nexumedia.file.core.windows.net/;TableEndpoint=https://nexumedia.table.core.windows.net/;SharedAccessSignature=sv=2020-08-04&ss=bfqt&srt=co&sp=rwdlacupitfx&se=2022-09-08T18:25:41Z&st=2022-05-09T10:25:41Z&spr=https,http&sig=ofFjdFGcWD3JCbFbNhi7Imli0SvDNCL%2B1j95CeavXDU%3D",
    },
  };
}
