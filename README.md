# Rename Looney Tunes Golden Collection for Plex

All episode names come from https://www.thetvdb.com/?tab=seasonall&id=72514.

Episode name format will be: `S0E0 - Episode Name.ext`.

## Install

```
$ npm install
```

## Usage

By default the script will do a dry run. It will output to console everything that it would rename.

```
$ node main.js --library /path/to/library
```

To have the script actually rename your files, you have to pass the `--run` argument.

```
$ node main.js --library /path/to/library --run
```
