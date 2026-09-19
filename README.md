# CCWC

[![CI](https://github.com/Ziad-505/CCWC/actions/workflows/ci.yml/badge.svg)](https://github.com/Ziad-505/CCWC/actions/workflows/ci.yml)

CCWC is a TypeScript implementation of the Unix `wc` command. I built it as part of the [Coding Challenges](https://codingchallenges.fyi/challenges/challenge-wc) series to practice command-line development, file handling, Unicode, error handling, testing, and incremental software design.

## Features

CCWC accepts input from a file or standard input and supports the following operations:

| Option | Output |
| --- | --- |
| `-c` | Byte count |
| `-l` | Line count |
| `-w` | Word count |
| `-m` | Unicode character count |
| No option | Line, word, and byte counts |

It also reports invalid arguments and file errors through standard error and exits with a nonzero status.

## Requirements

- Node.js 24 or later
- npm

## Installation

Clone the repository and install the locked dependencies:

```bash
git clone https://github.com/Ziad-505/CCWC.git
cd CCWC
npm ci
npm run build
```

Link the package to make `ccwc` available as a command on your machine:

```bash
npm link
```

The linked command runs `dist/index.js`. Run `npm run build` again after changing the TypeScript source.

## Usage

Read from a file:

```bash
ccwc -l test.txt
ccwc -w test.txt
ccwc -c test.txt
ccwc -m unicode.txt
ccwc test.txt
```

Read from standard input:

```bash
cat test.txt | ccwc
cat test.txt | ccwc -w
```

When no option is provided, the output contains line, word, and byte counts in that order:

```text
<lines> <words> <bytes> <filename>
```

The filename is omitted when input comes from standard input.

## Architecture

The project separates input, argument parsing, counting, and process-level behavior:

```text
src/
├── cli.ts       Command-line argument parsing and validation
├── counts.ts    Pure line, word, and character counting functions
├── index.ts     Application entry point, command dispatch, output, and errors
└── input.ts     File metadata, file reading, and standard input
```

The responsibilities are kept small and explicit:

- `index.ts` coordinates the application and handles the process boundary.
- `cli.ts` converts raw arguments into a validated command.
- `input.ts` handles file system and standard input access.
- `counts.ts` contains pure functions that can be tested without file I/O.

## Testing

Run the complete local verification command:

```bash
npm run check
```

The available commands are:

```bash
npm run build       # Compile the application
npm run clean       # Remove compiled output
npm run typecheck   # Type-check application and test code
npm test            # Build and run all tests
npm run check       # Run type checks, build, and tests
```

The test suite has three levels:

- Counting tests verify the pure line, word, and character functions.
- Parser tests verify valid argument combinations and rejected input.
- End-to-end tests execute the compiled CLI as a child process and verify its output, errors, and exit status.

GitHub Actions runs the same checks for pushes to `main` and for pull requests.

## Engineering decisions

Counting functions receive text instead of file paths. This keeps the core logic independent of where the input came from and makes it straightforward to test.

Standard input is initially read as a `Buffer`. The byte count is taken from the buffer before it is decoded as UTF-8, so multibyte characters are counted correctly for `-c`.

Character counting iterates over the string by Unicode code point. This avoids treating an emoji as two characters because of JavaScript's UTF-16 representation.

The project uses synchronous I/O because it is a short-lived command-line program that handles one input at a time. This keeps control flow direct without reducing responsiveness for the current use case.

Argument parsing is separate from process execution, allowing its behavior to be tested without starting a child process.

## Current scope

CCWC follows the scope of the coding challenge. It currently:

- Processes one file at a time
- Accepts one option at a time
- Does not combine flags such as `-lw`
- Loads the complete input into memory

## License

This project is licensed under the [ISC License](LICENSE).
