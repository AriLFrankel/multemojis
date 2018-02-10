#! /usr/bin/env node
const commandLineArgs = require('command-line-args');
const multemojis = require('./index');

const optionDefinitions = [
  { name: 'source', alias: 's', type: String },
  { name: 'width', alias: 'w', type: Number },
  { name: 'height', alias: 'h', type: Number },
  { name: 'out', alias: 'o', type: String },
  { name: 'method', alias: 'm', type: String }
]

const { source, ...options } = commandLineArgs(optionDefinitions);

multemojis(source, options)
  .then(() => console.log(`All done! your images can be found at ${(options.out || source).split(/\.[jpe?g|png|bmp]/)[0]}`))
  .catch(console.error)

