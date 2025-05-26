# Hangman

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.11.

# Overview

Commit #1: Initial commit

Commit #2: Create MVP hangman game's basic components; no real functionality
This commit introduces the foundational structure for the Hangman game:
- It lays out the basic directory structure and components needed for the game.
- No actual game logic is implemented yet, but the scaffolding for an MVP is in place, ready for further development.

Commit #3: Fix functionality, add welcome page, improve UI
- Welcome Page: A new landing page introduces players to the game, explains the rules, and sets the theme.
- Routing: The app now uses Angular routing to navigate between the welcome page and the main game.
- UI Improvements: The game and welcome page feature a more visually appealing interface - improved layout, backgrounds, and general styling, plus added color-coding.
- Game Logic: The core Hangman gameplay is now functional. Players can guess letters, receive feedback, and see their progress.
- State Management: The game state (guessed letters, attempts left, etc.) is managed and persisted, allowing users to resume their session unless they choose to exit.

Commit #4: Refactor hint system, fix input focus
- Hint system: Instead of an alert showing the hint, the hinted letter is now revealed directly in the word to guess. Styled distinctly from other guesses (green for correct, red for incorrect, blue for hints). This provides immediate visual feedback without interrupting the gameplay flow.
- Input focus: The letter input field now automatically regains focus after any guess or button interaction, ensuring a seamless and efficient user experience.
