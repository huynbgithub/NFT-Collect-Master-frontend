import sharp from "sharp"

export const splitImage = async (imageBuffer: ArrayBuffer, numRows: number, numCols: number): Promise<ArrayBuffer[]> => {
  const image = sharp(imageBuffer);
  const metadata = await image.metadata();
  const _height = metadata.height as number;
  const _width = metadata.width as number;

  const tileSizeX = Math.floor(_width / numRows);
  const tileSizeY = Math.floor(_height / numCols);

  const buffers: ArrayBuffer[] = [];

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const left = col * tileSizeX;
      const top = row * tileSizeY;

      const clone = image.clone()

      const buffer = await clone
        .extract({ left, top, width: tileSizeX, height: tileSizeY })
        .toBuffer();

      buffers.push(buffer);
    }
  }

  return buffers;
};

