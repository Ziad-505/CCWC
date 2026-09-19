#!/usr/bin/env node
import { argv, stderr } from 'node:process';
import { getFileSize, getFileInfo, getLineCount, getWordCount, getCharacterCount } from './file.js';

try {
    if(argv.length !== 4) {
        stderr.write('Usage: ccwc -<option> <file>\n');
        process.exit(1);
    }

    const option = argv[2];
    const fileName = argv[3];

    if(option === '-c') {
        const fileInfo = getFileInfo(fileName)
        console.log(`${getFileSize(fileInfo)} ${fileName}`);
    }else if(option === '-l'){
        console.log(`${getLineCount(fileName)} ${fileName}`);  
    }else if(option === '-w'){
        console.log(`${getWordCount(fileName)} ${fileName}`);  
    }else if(option === '-m'){
        console.log(`${getCharacterCount(fileName)} ${fileName}`);  
    }else {
        stderr.write(`Error: ${option} is not a supported option\n`);
        process.exit(1);    
    }

} catch (error) {

    if(error instanceof Error) {
        stderr.write("Error: " + error.message + '\n');
    }else {
        stderr.write('Error: Unknown Error occurred\n');
    }

    process.exit(1);
}
