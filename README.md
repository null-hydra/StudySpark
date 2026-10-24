# StudySpark — AI Study Assistant Prototype

StudySpark is a responsive study workspace prototype that turns pasted text into concise notes, key points, and revision prompts.

> **Honest scope note:** Version 1.0 does not call an AI model. It uses simple, local JavaScript text-processing heuristics. The project is an early prototype and should not be described as a production AI application yet.

## Features

- Responsive layout for desktop and mobile
- Word counter and clear-text action
- Extractive concise notes based on sentence scoring
- Key-point suggestions based on repeated terms and sentence length
- Revision prompts based on source sentence openings
- Copy generated output
- Text stays in the browser; there is no backend or analytics in this version

## Tech stack

- HTML5
- CSS3
- Vanilla JavaScript
- GitHub Pages for static hosting

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a browser.
3. Paste a paragraph and try each action.

No build tools or package installation are required.

## Repository structure

```text
studyspark/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    └── (optional screenshots and project images)
```

## How It Works

StudySpark processes user-provided text in the browser using rule-based text processing. It does not currently call an AI model or require an API key.

## Limitations

- Results depend on the input text and processing rules.
- Generated notes may not capture every important detail.
- Revision questions are generated using basic heuristics.
- No account system or cloud-based note storage is included.

## Future Improvements

- Improve text summarization and question generation
- Add the ability to save and manage notes
- Explore Python backend integration
- Integrate an AI model through a secure backend
- Add automated tests

## Learning goals

This project is intended as a learning exercise in DOM manipulation, basic text processing, responsive design, accessibility, and deployment. Contributions and improvements are welcome.


## Live Demo

https://null-hydra.github.io/StudySpark/

## Author

GitHub: https://github.com/null-hydra
