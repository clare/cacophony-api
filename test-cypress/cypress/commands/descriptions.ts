export function logTestDescription(
  message: string,
  consoleObject: any,
  log = true
) {
  if (!log) {
    return;
  }

  Cypress.log({
    name: "Test description",
    displayName: "TEST",
    message: `**${message}**`,
    consoleProps: () => consoleObject
  });
}
<<<<<<< HEAD

=======
>>>>>>> 45ba91c66c9e557bb173ce07c612f6665beb107c
