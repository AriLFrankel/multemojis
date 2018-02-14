/* eslint-disable no-console */
const commandLineArgs = require('command-line-args');
const getUsage = require('command-line-usage');
const multemojis = require('./multemojis');

const optionDefinitions = [
  {
    name: 'help', description: 'Display this usage guide',
  },
  {
    name: 'source', alias: 's', type: String, defaultOption: true, description: 'The source of the image. This can be a URL or a filepath [italic]{default argument}',
  },
  {
    name: 'width', alias: 'w', type: Number, description: 'The width of the output in emoji sized tiles [italic]{default value:} 1',
  },
  {
    name: 'height', alias: 'h', type: Number, description: 'The height of the output in emoji sized tiles [italic]{default value:} 1',
  },
  {
    name: 'out', alias: 'o', type: String, description: 'The directory to which to write output. [italic]{default value:} source',
  },
  {
    name: 'method', alias: 'm', type: String, description: 'The [underline]{jimp} supported method with which to scale the source image. [italic]{default value:} scaleToFit',
  },
];

const usage = getUsage([
  {
    header: 'Options',
    optionList: optionDefinitions,
  },
  {
    content: 'Project home: [underline]{https://github.com/arilfrankel/multemojis}',
  },
]);

let args;
try {
  args = commandLineArgs(optionDefinitions);
} catch (err) {
  // invalid arguments
  console.error('\ninvalid flag or argument');
  console.log(usage);
}

if (args) {
  const { source, ...options } = args;
  if (Object.hasOwnProperty.call(options, 'help')) {
    console.log(usage);
  } else {
    multemojis(source, options)
      .then(() => console.log(`All done! your images can be found at ${(options.out || source).split(/\.[jpeg|jpg|png|bmp]/)[0]}`));
  }
}
