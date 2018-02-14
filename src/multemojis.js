const jimp = require('jimp');

/* Read an image
  file path or URL -> promise<img>
*/
const readImage = path => jimp.read(path);

/* scale the image in the specified fashion to the specified number of tiles
  img, str, int, int -> promise<img>
*/
const resizeImage = (img, width, height, method) =>
  img.clone()[method](
    (128 * width) || jimp.AUTO,
    (128 * height) || jimp.AUTO,
  );

/* create emoji size tiles
  img -> [img]
*/
const getSlices = (img) => {
  const { width: imgWidth, height: imgHeight } = img.bitmap;
  // determine dimensions and start point of each tile
  const slices = [];
  for (let j = 0; j < imgHeight; j += 128) {
    for (let i = 0; i < imgWidth; i += 128) {
      // [x, y, width, height]
      slices.push([
        i,
        j,
        Math.min(Math.abs(imgWidth - i), 128),
        Math.min(Math.abs(imgHeight - j), 128),
      ]);
    }
  }
  // create emoji sized slices from the image
  return slices.map(dim => img.clone().crop(...dim));
};

/* write an image or images to a specified path with a specified extension
  [img] -> Promise<[]>
*/
const writeImages = (images, out, extension) =>
  Promise.all(images.map((img, i) => img.write(`${out}${i}.${extension}`)));

module.exports = async function createTilesFromImage(path, options) {
  let img;
  let extension;
  try {
    img = await readImage(path);
    extension = img.getExtension();
  } catch (err) {
    throw new Error('bad image path error:', err);
  }
  const { width = 1, height = 1, method = 'scaleToFit' } = options;
  const out = (options.out || path).replace(/\.[jpe?g|png|bmp]+/, '');
  return writeImages(
    getSlices(resizeImage(img, width, height, method)),
    out,
    extension,
  );
};
