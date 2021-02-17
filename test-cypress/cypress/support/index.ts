
// load the global Cypress types
/// <reference types="cypress" />

import '../commands/api/user';
import '../commands/api/camera';
import '../commands/api/recording';
import '../commands/api/visits';

beforeEach(function () {
    // This runs before each test file, eg once per file.
    cy.intercept('POST', 'recordings').as('addRecording');
});