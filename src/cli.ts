export type ParsedArguments = {
    option?: '-c' | '-l' | '-w' | '-m';
    fileName?: string;
};
export function parseArguments(args: string[]): ParsedArguments {
    if(args.length === 0){
        return {};
    }
    if(args.length === 1){
        const argument = args[0];
        if(!argument.startsWith('-')){
            return { fileName: argument };
        }
        if(argument === '-c' || argument === '-l' || argument === '-w' || argument === '-m'){
            return { option: argument};
        }
        throw new Error(`${argument} is not a supported option`);
    }
    if(args.length === 2){
        const option = args[0];
        const fileName = args[1];
        if(fileName.startsWith('-')) {
            throw new Error('Usage: ccwc [-<option>] <file>');
        }
        if(!option.startsWith('-')){
            throw new Error('Usage: ccwc [-<option>] <file>');
        }
        if(option === '-c' || option === '-l' || option === '-w' || option === '-m'){
            return { option, fileName};
        }
        throw new Error(`${option} is not a supported option`);
    }
    throw new Error('Usage: ccwc [-<option>] <file>');
}