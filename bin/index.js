const jimp = require('jimp');

/* Read an image 
  file path or URL -> promise
*/
const readImage = path => jimp.read(path);

/* scale the image in the specified fashion to the specified number of tiles
  img, str, int, int -> promise
*/
const resizeImage = (img, width, height, method) =>
  img
    .clone()
    [method](
      (128 * width) || jimp.AUTO,
      (128 * height) || jimp.AUTO
    )
    

/* create emoji size slices 
  img, out-path -> promise
*/
const sliceImage = (img, path) => {
  // determine dimensions
  const slices = [];
  for( var i = 0; i < img.bitmap.width; i += 128) {
    for( var j = 0; j < img.bitmap.height; j += 128) {
      // [x, y, width, height]
      slices.push([
        i,
        j,
        Math.min(Math.abs(img.bitmap.width - i), 128),
        Math.min(Math.abs(img.bitmap.height - j), 128),
      ])
    }
  }
  return Promise.all(slices.map((dim, i) => {
    // create a clone
    const clone = img.clone();
    // to the specified dimensions
    clone.crop(...dim)
    // write it to disk at the specified path
    return clone.write(`${path
      .replace(/(\.[jpe?g|png|bmp])/, `${i}$1`)
    }`)
  }));
}

module.exports = function(path, options){
  const { width = 1, height = 1, method = 'contain', out = path } = options;
  return readImage(path)
    .then(img => resizeImage(img, width, height, method))
    .then(resized => sliceImage(resized, out));
}
