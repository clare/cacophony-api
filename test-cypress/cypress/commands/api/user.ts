// load the global Cypress types
/// <reference types="cypress" />

<<<<<<< HEAD
import { getTestName } from "../names";
import { apiPath, makeAuthorizedRequest, saveCreds, v1ApiPath } from "../server";
=======
import { format as urlFormat } from "url";
import { getTestName } from "../names";
import { apiPath, getCreds, saveCreds } from "../server";
>>>>>>> 45ba91c66c9e557bb173ce07c612f6665beb107c
import { logTestDescription } from "../descriptions";

Cypress.Commands.add("apiCreateUser", (userName: string, log = true) => {
  logTestDescription(`Create user '${userName}'`, { user: userName }, log);

  const usersUrl = apiPath() + "/api/v1/users";

  const fullName = getTestName(userName);
  const password = "p" + fullName;

  const data = {
    username: fullName,
    password: password,
    email: fullName + "@api.created.com"
  };

  cy.request("POST", usersUrl, data).then((response) => {
    saveCreds(response, userName);
  });
});

Cypress.Commands.add("apiSignInAs", (userName: string) => {
  const usersUrl = apiPath() + "/authenticate_user";

  const fullName = getTestName(userName);
  const password = "p" + fullName;

  const data = {
    username: fullName,
    password: password
  };

  cy.request("POST", usersUrl, data).then((response) => {
    saveCreds(response, userName);
  });
});

Cypress.Commands.add(
  "apiCreateGroup",
  (userName: string, group: string, log = true) => {
    logTestDescription(
      `Create group '${group}' for user '${userName}'`,
      { user: userName, group: group },
      log
    );

<<<<<<< HEAD
    makeAuthorizedRequest({
      method: "POST",
      url: v1ApiPath("groups"),
      body: { groupname:  getTestName(group) }
    }, userName);
=======
    const user = getCreds(userName);
    const fullGroupName = getTestName(group);
    const groupURL = apiPath() + "/api/v1/groups";

    const data = {
      groupname: fullGroupName
    };

    cy.request({
      method: "POST",
      url: groupURL,
      headers: user.headers,
      body: data
    });
>>>>>>> 45ba91c66c9e557bb173ce07c612f6665beb107c
  }
);

Cypress.Commands.add(
  "apiCreateUserGroupAndCamera",
  (userName, group, camera) => {
    logTestDescription(
      `Create user '${userName}' with camera '${camera}' in group '${group}'`,
      { user: userName, group: group, camera: camera }
    );
    cy.apiCreateUser(userName, false);
    cy.apiCreateGroup(userName, group, false);
    cy.apiCreateCamera(camera, group, false);
  }
);

Cypress.Commands.add("apiCreateUserGroup", (userName, group) => {
  logTestDescription(`Create user '${userName}' with group '${group}'`, {
    user: userName,
    group: group
  });
  cy.apiCreateUser(userName, false);
  cy.apiCreateGroup(userName, group, false);
});
