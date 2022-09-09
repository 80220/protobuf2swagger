const path = require('path');
const glob = require("glob");

const convert = require('../lib/convert');

const findAllProtoFiles = (rootDir) => {
  let files = glob.sync(path.resolve(__dirname, rootDir) + '/**/*');
  return files.filter((f)=>f.endsWith('.proto'));
}

describe('dup', () => {
  test('duplicated defs', async () => {
    const files = findAllProtoFiles('__fixtures__/duplicated_defs');
    console.log(files);
    const converted = await convert({
      files,
      customSchema: {
        swagger: '2.0',
      },
    });
    expect(converted).toMatchSnapshot();
  });
});


