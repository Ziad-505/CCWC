#!/usr/bin/env node
import { argv, stderr } from 'node:process';
import { getFileSize, getFileInfo, readFileContent, readStandardInput } from './input.js';
import { getLineCount, getWordCount, getCharacterCount } from './counts.js';
import { parseArguments } from './cli.js';

try {
    const userArguments = argv.slice(2);
    const { option, fileName } = parseArguments(userArguments);
    let content: string;
    let byteCount: number;
    if (fileName !== undefined) {
        content = readFileContent(fileName);
        const fileInfo = getFileInfo(fileName);
        byteCount = getFileSize(fileInfo);
    } else {
        const input = readStandardInput();
        content = input.toString('utf8');
        byteCount = input.length;
    }
    const fileLabel = fileName === undefined ? '' : ` ${fileName}`;
    if (option === undefined) {
        console.log(
            `${getLineCount(content)} ${getWordCount(content)} ${byteCount}${fileLabel}`
        );
    }else if(option === '-c'){
        console.log(`${byteCount}${fileLabel}`);
    }else if(option === '-l'){
        console.log(`${getLineCount(content)}${fileLabel}`);
    }else if(option === '-w'){
        console.log(`${getWordCount(content)}${fileLabel}`);
    }else if(option === '-m'){
        console.log(`${getCharacterCount(content)}${fileLabel}`);
    }
} catch (error) {
    if(error instanceof Error) {
        stderr.write("Error: " + error.message + '\n');
    }else {
        stderr.write('Error: Unknown Error occurred\n');
    }
    process.exit(1);
}