import ora from 'ora';
import chalk from 'chalk';
import * as readlineSync from 'readline-sync';

export const { log } = console;

export const terminalSpinner = ora({
  text: 'Thinking',
  color: 'green',
  spinner: 'bounce',
});

export function promptUser(prompt: string): string {
  const input: string = readlineSync.question(chalk.blue(prompt));
  return input;
}
