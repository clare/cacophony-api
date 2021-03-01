// load the global Cypress types
/// <reference types="cypress" />

<<<<<<< HEAD

interface ComparableVisit {
  start?: Date;
  end?: Date;
  tag?: string;
  recordings?: number;
}


declare namespace Cypress {
  interface Chainable {
    /**
     * check the visits returned match the listed visits specified. Only the specified information will be checked.
     * 
     * Please note:  visits must be listed in order of oldest to newest start dates. 
     * 
=======
declare namespace Cypress {
  interface Chainable {
    /**
     * upload a single recording to for a particular camera
>>>>>>> 45ba91c66c9e557bb173ce07c612f6665beb107c
     */
    checkVisits(
      user: string,
      camera: string,
<<<<<<< HEAD
      expectedVisits: ComparableVisit[] 
    ): Chainable<Element>;

    /**
     * check the visits returned match the listed visits specified. Only the specified information will be checked.
     * 
     * Please note:  visits must be listed in order of oldest to newest start dates. 
     * 
     */
    checkVisitTags(
      user: string,
      camera: string,
      expectedTags: string[] 
    ): Chainable<Element>;

=======
      noVists: number
    ): Chainable<Element>;
>>>>>>> 45ba91c66c9e557bb173ce07c612f6665beb107c
  }
}
