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
    const content = readFileContent(fileName)
    const lines = content.split("\n");
    return lines.length;
}
