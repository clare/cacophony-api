// load the global Cypress types
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * create user and save api credentials further use
     */
<<<<<<< HEAD
    apiCreateUser(userName: string, log?: boolean): Chainable<Element>;
=======
    apiCreateUser(userName: string, log: boolean): Chainable<Element>;
>>>>>>> 45ba91c66c9e557bb173ce07c612f6665beb107c

    /**
     * user sign in and stored with api credentials for further in the test
     */
    apiSignInAs(userName: string): Chainable<Element>;

    /**
     * create a group for the given user (who has already been referenced in the test
     */
    apiCreateGroup(
      userName: string,
      groupName: string,
<<<<<<< HEAD
      log?: boolean
=======
      log: boolean
>>>>>>> 45ba91c66c9e557bb173ce07c612f6665beb107c
    ): Chainable<Element>;

    /**
     * create user group and camera at the same time
     */
    apiCreateUserGroupAndCamera(
      userName: string,
      group: string,
      camera: string
    ): Chainable<Element>;

    /**
     * create user group and camera at the same time
     */
    apiCreateUserGroup(userName: string, group: string): Chainable<Element>;
  }
}
