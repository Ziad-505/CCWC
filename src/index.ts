#!/usr/bin/env node
import { argv, stderr } from 'node:process';
import { getFileSize, getFileInfo, readFileContent } from './file.js';
import { getLineCount, getWordCount, getCharacterCount } from './counts.js';

try {
    if(argv.length < 3 || argv.length > 4) {
        stderr.write('Usage: ccwc [-<option>] <file>\n');
        process.exit(1);
    }
    if(argv.length === 3){
        const fileName = argv[2];
        if(fileName.startsWith("-")) {
            stderr.write('Usage: ccwc [-<option>] <file>\n');
            process.exit(1);
        }
        const content = readFileContent(fileName);
        const fileInfo = getFileInfo(fileName);
        console.log(`${getLineCount(content)} ${getWordCount(content)} ${getFileSize(fileInfo)} ${fileName}`);
    }else {
        const option = argv[2];
        const fileName = argv[3];
        if(option === '-c') {
            const fileInfo = getFileInfo(fileName);
            console.log(`${getFileSize(fileInfo)} ${fileName}`);
        }else if(option === '-l'){
            const content = readFileContent(fileName);
            console.log(`${getLineCount(content)} ${fileName}`);
        }else if(option === '-w'){
            const content = readFileContent(fileName);
            console.log(`${getWordCount(content)} ${fileName}`);
        }else if(option === '-m'){
            const content = readFileContent(fileName);
            console.log(`${getCharacterCount(content)} ${fileName}`);
        }else {
            stderr.write(`Error: ${option} is not a supported option\n`);
            process.exit(1);
        }
    }
} catch (error) {
    if(error instanceof Error) {
        stderr.write("Error: " + error.message + '\n');
    }else {
        stderr.write('Error: Unknown Error occurred\n');
    }
    process.exit(1);
}