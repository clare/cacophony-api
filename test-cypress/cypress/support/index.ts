// load the global Cypress types
/// <reference types="cypress" />

import "../commands/api/user";
import "../commands/api/camera";
import "../commands/api/recording";
import "../commands/api/visits";
<<<<<<< HEAD
import "../commands/api/stations";
=======
>>>>>>> 45ba91c66c9e557bb173ce07c612f6665beb107c

beforeEach(function () {
  // This runs before each test file, eg once per file.
  cy.intercept("POST", "recordings").as("addRecording");
});
