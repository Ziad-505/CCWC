import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

// runCli Helper 
function runCli(args: string[], input?: string) {
    return spawnSync(
        process.execPath,
        ['dist/index.js', ...args],
        {
            encoding: 'utf8',
            input
        }
    );
}

test('counts lines from a file through the CLI', () => {
    const result = runCli(['-l', 'test.txt']);

    assert.strictEqual(result.status, 0);
    assert.strictEqual(result.stdout, '3 test.txt\n');
    assert.strictEqual(result.stderr, '');
});

test('counts lines from stdin through the CLI', () => {
    const result = runCli(
        ['-l'],
        'first\nsecond\n'
    );

    assert.strictEqual(result.status, 0);
    assert.strictEqual(result.stdout, '2\n');
    assert.strictEqual(result.stderr, '');
});

test('Default counts from a file', () => {
    const result = runCli(['test.txt']);
    
    assert.strictEqual(result.status, 0);
    assert.strictEqual(result.stdout, '3 9 59 test.txt\n');
    assert.strictEqual(result.stderr, '');
});

test('Default counts from stdin', () => {
    const result = runCli([], 'one two\nthree\n');
    
    assert.strictEqual(result.status, 0);
    assert.strictEqual(result.stdout, '2 3 14\n');
    assert.strictEqual(result.stderr, '');
});

test('Byte count from Unicode stdin', () => {
    const result = runCli(['-c'], 'A😀é');
    
    assert.strictEqual(result.status, 0);
    assert.strictEqual(result.stdout, '7\n');
    assert.strictEqual(result.stderr, '');
});

test('Word count from mixed-whitespace stdin', () => {
    const result = runCli(['-w'], 'one  two\tthree\nfour');
    
    assert.strictEqual(result.status, 0);
    assert.strictEqual(result.stdout, '4\n');
    assert.strictEqual(result.stderr, '');
});

test('Character count from Unicode stdin', () => {
    const result = runCli(['-m'], 'A😀é');
    
    assert.strictEqual(result.status, 0);
    assert.strictEqual(result.stdout, '3\n');
    assert.strictEqual(result.stderr, '');
});

// Error Behaviour
test('Unsupported option', () => {
    const result = runCli(['-x']);
    
    assert.strictEqual(result.status, 1);
    assert.strictEqual(result.stdout, '');
    assert.strictEqual(result.stderr, 'Error: -x is not a supported option\n');
});

test('Missing file', () => {
    const result = runCli(['-l', 'missing.txt']);

    assert.strictEqual(result.status, 1);
    assert.strictEqual(result.stdout, '');
    assert.match(result.stderr, /ENOENT/);
});

test('Directory instead of file', () => {
    const result = runCli(['-l', 'src']);

    assert.strictEqual(result.status, 1);
    assert.strictEqual(result.stdout, '');
    assert.strictEqual(result.stderr, 'Error: src is not a file\n');
});

test('Too many arguments', () => {
    const result = runCli(['-w', 'test.txt', 'extra']);

    assert.strictEqual(result.status, 1);
    assert.strictEqual(result.stdout, '');
    assert.match(result.stderr, /Usage: ccwc/);
});