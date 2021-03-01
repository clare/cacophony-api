// load the global Cypress types
/// <reference types="cypress" />

interface TrackInfo {
<<<<<<< HEAD
  start_s? : number,
  end_s? : number,
=======
  // start_s? : 10,
  // end_s? : 22.2,
>>>>>>> 45ba91c66c9e557bb173ce07c612f6665beb107c
  tag?: string;
  // confidence?: number,
}

interface ThermalRecordingInfo {
  time?: Date;
  duration?: number;
  model?: string;
  tracks?: TrackInfo[];
  noTracks?: boolean; // by default there will normally be one track, set to true if you don't want tracks
  minsLater?: number; // minutes that later that the recording is taken
  secsLater?: number; // minutes that later that the recording is taken
<<<<<<< HEAD
  tags?: string[]; // short cut for defining tags for each track
=======
>>>>>>> 45ba91c66c9e557bb173ce07c612f6665beb107c
}

declare namespace Cypress {
  interface Chainable {
    /**
     * upload a single recording to for a particular camera
     */
    uploadRecording(
      cameraName: string,
<<<<<<< HEAD
      details: ThermalRecordingInfo
    ): Cypress.Chainable<Interception>;

    uploadRecordingThenUserTag(
      cameraName: string,
      details: ThermalRecordingInfo,
      tagger: string,
      tag: string
    );

    userTagRecording(
      recordingId: number,
      recordingIndex: number,
      tagger: string,
      tag: string
    );

    thenUserTagAs(tagger: string, tag: string);
=======
      details: ThermalRecordingInfo,
      log?: boolean
    ): Chainable<Element>;
>>>>>>> 45ba91c66c9e557bb173ce07c612f6665beb107c
  }
}
