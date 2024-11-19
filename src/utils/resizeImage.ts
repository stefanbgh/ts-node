import sharp from "sharp";

export const resizeImage = async (
	imageBuffer: Buffer,
	width: number = 250,
	height: number = 250
): Promise<Buffer> => {
	return await sharp(imageBuffer).resize(width, height).toBuffer();
};
