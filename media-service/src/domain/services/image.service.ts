import * as Sharp from 'sharp';

export async function resizeImage(
  image_buffer: Buffer,
): Promise<{ buffer: Buffer; width: number; height: number }> {
  const image = Sharp(image_buffer);
  return image.metadata().then(async (metadata) => {
    const { width, height } = getSizeByAspectRatio(
      metadata.width,
      metadata.height,
    );
    return {
      buffer: await image.resize(width, height).toBuffer(),
      width: width,
      height: height,
    };
  });
}

function getSizeByAspectRatio(width, height) {
  if (width < height) {
    width = width > 1080 ? 1080 : width;
    const h = Math.floor((width / 3) * 4);
    console.log('height', h);
    return { width: width, height: h };
  } else {
    height = height > 1440 ? 1440 : height;
    const w = Math.floor((height / 4) * 3);
    console.log('widht', w);
    return { width: w, height: height };
  }
}
