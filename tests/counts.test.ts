import test from "node:test";
import assert from "node:assert/strict";
import { getLineCount, getCharacterCount, getWordCount } from "../src/file.js";


// Line Count Tests
test('returns zero lines for empty content', () => {
    const content = '';
    const result = getLineCount(content);
    assert.strictEqual(result, 0);
});


test('returns two lines for content with two newline characters', () => {
    const content = 'first\nsecond\n';
    const result = getLineCount(content);
    assert.strictEqual(result, 2);
});

test('counts newline characters', () => {
    const content = 'first\nsecond';
    const result = getLineCount(content);
    assert.strictEqual(result, 1);
});


//Word Count Tests
test('returns zero words for whitespace-only content', () => {
    const content = '   \n\t  ';
    const result = getWordCount(content);
    assert.strictEqual(result, 0);
});

test('counts words separated by mixed whitespace', () => {
    const content = 'one  two\tthree\nfour';
    const result = getWordCount(content);
    assert.strictEqual(result, 4);
});

//Character Count Tests
test('returns zero characters for empty content', () => {
    const content = '';
    const result = getCharacterCount(content);
    assert.strictEqual(result, 0);
});

test('counts an emoji as one Unicode character', () => {
    const content = 'A@😀b';
    const result = getCharacterCount(content);
    assert.strictEqual(result, 4);
});