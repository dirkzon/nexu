import Sharp from 'sharp';

export async function resizeImage(
  image_buffer: Buffer,
  aspect_ratio: [number, number],
): Promise<{ buffer: Buffer; width: number; height: number }> {
  const image = Sharp(image_buffer);
  return image.metadata().then(async (metadata) => {
    const { width, height } = getSizeByAspectRatio(
      metadata.width,
      metadata.height,
      aspect_ratio,
    );
    return {
      buffer: await image.resize(width, height).toBuffer(),
      width: width,
      height: height,
    };
  });
}

function getSizeByAspectRatio(width, height, aspect_ratio: [number, number]) {
  if (width < height) {
    width = width > 1080 ? 1080 : width;
    const h = Math.floor((width / aspect_ratio[0]) * aspect_ratio[1]);
    return { width: width, height: h };
  } else {
    height = height > 1440 ? 1440 : height;
    const w = Math.floor((height / aspect_ratio[1]) * aspect_ratio[0]);
    return { width: w, height: height };
  }
}

export async function getBufferFromStream(stream): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    const buff = Array<any>();
    await stream
      .on('data', (chunk) => buff.push(chunk))
      .on('end', () => {
        const b = Buffer.concat(buff);
        resolve(b);
      })
      .on('error', (e) => {
        reject(e);
      });
  });
}
