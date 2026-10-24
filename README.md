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

## Current limitations

- The summary and key-point extraction are heuristic, not semantic AI.
- Revision questions are simple prompts, not validated comprehension questions.
- Results may be inaccurate or unhelpful for short, technical, or non-English passages.
- This version does not persist notes after refreshing the page.

## Roadmap

- [ ] Improve sentence scoring and add test cases
- [ ] Add saved notes using browser local storage
- [ ] Add a Python backend (for example, Flask or FastAPI)
- [ ] Integrate a language model through a server-side API endpoint
- [ ] Add loading, error, and rate-limit states for AI requests
- [ ] Never expose API keys in frontend JavaScript or a public repository
- [ ] Add screenshots and a short demo GIF to this README

## Learning goals

This project is intended as a learning exercise in DOM manipulation, basic text processing, responsive design, accessibility, and deployment. Contributions and improvements are welcome.
