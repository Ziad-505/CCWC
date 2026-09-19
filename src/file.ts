import { type Stats, statSync, readFileSync } from 'node:fs';


export function getFileInfo(fileName: string){
    const fileInfo = statSync(fileName);
    if(fileInfo.isFile()) {
        return fileInfo;
    } else {
        throw new Error(`${fileName} is not a file`);
    }
}

export function readFileContent(fileName: string) {
    getFileInfo(fileName);
    return readFileSync(fileName, 'utf-8');

}

export function getFileSize(fileInfo: Stats): number {
    return fileInfo.size;
   
}

export function getLineCount(fileName: string): number {
    const content = readFileContent(fileName);
    const lines = content.split("\n");
    return lines.length - 1;
}

export function getWordCount(fileName: string): number {
    const content = readFileContent(fileName);
    const trimmedContent = content.trim();
    if(trimmedContent.length === 0){
        return 0;
    }
    const words = trimmedContent.split(/\s+/);
    return words.length;
}

export function getCharacterCount(fileName: string): number {
    const content = readFileContent(fileName);
    let count = 0;
    for (const _character of content){
        count ++;
    }
    return count;
}