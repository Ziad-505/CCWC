export function getLineCount(content: string): number {
    const lines = content.split('\n');
    return lines.length - 1;
}
export function getWordCount(content: string): number {
    const trimmedContent = content.trim();
    if(trimmedContent.length === 0){
        return 0;
    }
    const words = trimmedContent.split(/\s+/);
    return words.length;
}
export function getCharacterCount(content: string): number {
    let count = 0;
    for (const _character of content){
        count ++;
    }
    return count;
}