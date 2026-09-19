import test from 'node:test';
import assert from 'node:assert/strict';
import { parseArguments } from '../src/cli.js';


// Parser Tests
test('parses empty arguments for default stdin input', () => {
    const args: string[] = [];

    const result = parseArguments(args);

    assert.deepStrictEqual(result, {});
});

test('parses a filename without an option', () => {
    const args = ['test.txt'];

    const result = parseArguments(args);

    assert.deepStrictEqual(result, {
        fileName: 'test.txt'
    });
});

test('parses an option without a filename', () => {
    const args = ['-l'];

    const result = parseArguments(args);

    assert.deepStrictEqual(result, {
        option: '-l'
    });
});

test('parses an option and filename', () => {
    const args = ['-w', 'test.txt'];
    const result = parseArguments(args);

    assert.deepStrictEqual(result, {
        option: '-w',
        fileName: 'test.txt'
    });
});

test('rejects an unsupported option', () => {
    const args = ['-x'];
    assert.throws(
        () => parseArguments(args),
        /-x is not a supported option/
    );
});

test('rejects an option in the filename position', () => {
    const args = ['-w', '-l'];
    assert.throws(
        () => parseArguments(args),
        /Usage: ccwc/
    );
});

test('rejects an unsupported option with a filename', () => {
    const args = ['-x', 'test.txt'];
    assert.throws(
        () => parseArguments(args),
        /-x is not a supported option/
    );
});

test('rejects extra arguments', () => {
    const args = ['-w', 'test.txt', 'extra.txt'];
    assert.throws(
        () => parseArguments(args),
        /Usage: ccwc/
    );
});

test('rejects two file names', () => {
    const args = ['first.txt', 'second.txt'];
    assert.throws(
        () => parseArguments(args),
        /Usage: ccwc/
    );
});
