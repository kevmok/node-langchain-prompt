# Node.js TypeScript Text Input and Language Model Project

![Demo](gif/demo.gif)
This project is a simple Node.js TypeScript application that prompts the user to enter text, then uses the text as input for a language model.

## Features

- Takes user input using the `readline-sync` package
- Utilizes the `langchain` package for language model processing

## Installation

1. Clone the repository:

```bash
git clone https://github.com/kevmok/node-langchain-prompt.git
```

2. Navigate to the project directory

```bash
cd node-langchain-prompt
```

3. Install the dependencies

```bash
#npm
npm install

#yarn
yarn

#pnpm
pnpm install
```

## Usage

Before running the project, make sure to set the OPENAI_KEY environment variable to your OpenAI API key.

You can either set it in your terminal or create a .env file in the project root with the following content:

```makefile
OPENAI_KEY=your_openai_api_key_here
```

Run the project:

```
pnpm start
```

The application will prompt you to enter some text. After you provide the input, the language model will process it, and the application will display the result.
