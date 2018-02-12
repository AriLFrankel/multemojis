const commandLineArgs = require('command-line-args');
const multemojis = require('./multemojis');

const optionDefinitions = [
  {
    name: 'source', alias: 's', type: String, defaultOption: true,
  },
  { name: 'width', alias: 'w', type: Number },
  { name: 'height', alias: 'h', type: Number },
  { name: 'out', alias: 'o', type: String },
  { name: 'method', alias: 'm', type: String },
];

const { source, ...options } = commandLineArgs(optionDefinitions);
/* eslint-disable no-console */
multemojis(source, options)
  .then(() => console.log(`All done! your images can be found at ${(options.out || source).split(/\.[jpeg|jpg|png|bmp]/)[0]}`));
