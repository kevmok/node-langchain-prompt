import ora from 'ora';

export const { log } = console;

export const terminalSpinner = ora({
  text: 'Thinking',
  color: 'green',
  spinner: 'bounce',
});
