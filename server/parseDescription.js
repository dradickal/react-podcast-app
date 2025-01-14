import { parse } from 'node-html-parser';
import fs from 'fs/promises';
import util from 'util';
import { NodeHtmlMarkdown} from 'node-html-markdown';

async function readDescription(filename) {
    return fs.readFile(filename, { encoding: 'utf8', flag: 'r' }, function (err, data) {
        if (err) {
            return console.error(err);
        }
        return data;
    });
}

async function writeParsedData(filename, data) {
    return fs.writeFile(filename, data, 'utf8');
}

const replacers = [
    [ /<p><br \/><\/p>/, ' '],
    [ /<br \/><br \/>/, ' '],
    [ /\/n/, ' '],
];

const description = await readDescription('./server/description-test.txt');

const root = parse(description);
const md = NodeHtmlMarkdown.translate(description, {textReplace: replacers });

await writeParsedData('./server/output.txt', util.inspect(root, { depth: null }));
await writeParsedData('./server/output-md.txt', md);

console.log('output saved!');