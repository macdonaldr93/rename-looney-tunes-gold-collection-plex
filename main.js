// tvdb: https://www.thetvdb.com/?tab=seasonall&id=72514

const fs = require('fs');
const path = require('path');
const CSV = require('csv-string');
const Finder = require('fs-finder');
const chalk = require('chalk');
const argv = require('minimist')(process.argv.slice(2));

const tvdbPath = path.resolve('./tvdb.csv');
const libraryPath = path.resolve(argv.library);

if (!argv.run) {
  console.log('DRY RUN START');
}

console.log(`Loading ${libraryPath}`);
console.log(`Loading ${tvdbPath}`);
console.log('');

const files = Finder.from(libraryPath).findFiles();
const content = fs.readFileSync(tvdbPath, 'utf8');
const tvdb = CSV.parse(content);

for (const episodeRow of tvdb) {
  const year = episodeRow[0].split(' x ')[0];
  const number = episodeRow[0].split(' x ')[1];
  const name = episodeRow[1];
  const plex = `S${year}E${number} - ${name}`;

  const matchingFilePath = files.find((file) => {
    return new RegExp(name, 'i').test(file);
  });

  if (matchingFilePath) {
    const pathSegments = matchingFilePath.split('/');
    const fileName = pathSegments[pathSegments.length - 1];
    const fileExt = path.extname(fileName);
    const newFileName = `${plex}${fileExt}`;
    const newFilePath = matchingFilePath.replace(fileName, newFileName);

    if (argv.run === true) {
      console.log(`Renaming ${chalk.blue(matchingFilePath)} to ${chalk.green(newFilePath)}`);
      console.log('');
      fs.renameSync(matchingFilePath, newFilePath);
    } else {
      console.log(`Renaming ${chalk.blue(matchingFilePath)} to ${chalk.green(newFilePath)}`);
      console.log('');
    }
  }
}

if (!argv.run) {
  console.log('DRY RUN END');
}
