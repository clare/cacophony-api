// load the global Cypress types
/// <reference types="cypress" />

<<<<<<< HEAD
import { uploadFile } from "../fileUpload";
import { v1ApiPath, DEFAULT_DATE, makeAuthorizedRequest } from "../server";
=======
import { v1ApiPath, uploadFile, DEFAULT_DATE } from "../server";
>>>>>>> 45ba91c66c9e557bb173ce07c612f6665beb107c
import { logTestDescription } from "../descriptions";

let lastUsedTime = DEFAULT_DATE;

Cypress.Commands.add(
  "uploadRecording",
<<<<<<< HEAD
  (cameraName: string, details: ThermalRecordingInfo) => {
    const data = makeRecordingDataFromDetails(details);

    logTestDescription(
      `Upload recording ${JSON.stringify(details)}  to '${cameraName}'`,
      { camera: cameraName, requestData: data }
    );
  
    const fileName = "invalid.cptv";
    const url = v1ApiPath("recordings");
    const fileType = "application/cptv";
  
    uploadFile(url, cameraName, fileName, fileType, data, "@addRecording").then((x) => {cy.wrap(x.response.body.recordingId);});
  }
);

Cypress.Commands.add(
  "userTagRecording",
  (recordingId: number, trackIndex: number, tagger: string, tag: string) => {

    logTestDescription(
      `User '${tagger}' tags recording as '${tag}'`,
      { recordingId, trackIndex, tagger, tag }
    );

    makeAuthorizedRequest({
      method: "GET",
      url: v1ApiPath(`recordings/${recordingId}/tracks`)
    }, tagger).then((response) => {
      makeAuthorizedRequest({
        method: "POST",
        url: v1ApiPath(`recordings/${recordingId}/tracks/${response.body.tracks[trackIndex].id}/replaceTag`),
        body: { what: tag, confidence: .7, automatic: false }
      }, tagger);
    });
  });

Cypress.Commands.add(
  "thenUserTagAs",
  { prevSubject: true },
  (subject, tagger: string, tag: string) => {
    cy.userTagRecording(subject, 0, tagger, tag );
  } 
);

Cypress.Commands.add(
  "uploadRecordingThenUserTag",
  (camera: string, details: ThermalRecordingInfo, tagger: string, tag: string,) => {

    cy.uploadRecording(camera, details).then((inter) => {
      cy.log(`request is ${JSON.stringify(inter.response.body)}`);
      cy.userTagRecording(inter.response.body.recordingId, 0, tagger, tag);
    });
=======
  (cameraName: string, details: ThermalRecordingInfo, log = true) => {
    const data = makeRecordingDataFromDetails(details);

    logTestDescription(
      `Upload '${JSON.stringify(details)}' recording to '${cameraName}'`,
      { camera: cameraName, requestData: data },
      log
    );

    const fileName = "invalid.cptv";
    const url = v1ApiPath("recordings");
    const fileType = "application/cptv";

    uploadFile(url, cameraName, fileName, fileType, data);
    // must wait until the upload request has completed
    cy.wait(["@addRecording"]);
>>>>>>> 45ba91c66c9e557bb173ce07c612f6665beb107c
  }
);

type IsoFormattedDateString = string;

interface TrackData {
  start_s?: number;
  end_s?: number;
  confident_tag?: string;
  confidence?: number;
}

interface AlgorithmMetadata {
  model_name?: string;
}

interface ThermalRecordingMetaData {
  algorithm?: AlgorithmMetadata;
  tracks: TrackData[];
}

interface ThermalRecordingData {
  type: "thermalRaw";
  recordingDateTime: IsoFormattedDateString;
  duration: number;
  comment?: string;
  batteryLevel?: number;
  batteryCharging?: string;
  airplaneModeOn?: boolean;
  version?: string;
  additionalMetadata?: JSON;
  metadata?: ThermalRecordingMetaData;
}

function makeRecordingDataFromDetails(
  details: ThermalRecordingInfo
): ThermalRecordingData {
  let data: ThermalRecordingData = {
    type: "thermalRaw",
    recordingDateTime: "",
    duration: 12,
    comment: "uploaded by cypress"
  };

  if (details.duration) {
    data.duration = details.duration;
  }

  data.recordingDateTime = getDateForRecordings(details).toISOString();

  if (!details.noTracks) {
    const model = details.model ? details.model : "Master";
<<<<<<< HEAD
    addTracksToRecording(data, model, details.tracks, details.tags);
=======
    addTracksToRecording(data, model, details.tracks);
>>>>>>> 45ba91c66c9e557bb173ce07c612f6665beb107c
  }

  return data;
}

function getDateForRecordings(details: ThermalRecordingInfo): Date {
  let date = lastUsedTime;
<<<<<<< HEAD
  
=======

>>>>>>> 45ba91c66c9e557bb173ce07c612f6665beb107c
  if (details.time) {
    date = details.time;
  } else if (details.minsLater || details.secsLater) {
    let secs = 0;
    if (details.minsLater) {
      secs += details.minsLater * 60;
    }
    if (details.secsLater) {
      secs += details.secsLater;
    }
    date = new Date(date.getTime() + secs * 1000);
  } else {
    // add a minute anyway so we don't get two overlapping recordings on the same camera
    const MINUTE = 60;
    date = new Date(date.getTime() + MINUTE * 1000);
  }

  lastUsedTime = date;
  return date;
}

function addTracksToRecording(
  data: ThermalRecordingData,
  model: string,
<<<<<<< HEAD
  trackDetails?: TrackInfo[], 
  tags?: string[]
=======
  trackDetails?: TrackInfo[]
>>>>>>> 45ba91c66c9e557bb173ce07c612f6665beb107c
): void {
  data.metadata = {
    algorithm: {
      model_name: model
    },
    tracks: []
  };

<<<<<<< HEAD
  if (tags && !trackDetails) {
    trackDetails = tags.map((tag) => {return {tag};});
  }

  
  if (trackDetails) {
    let count = 0;
    data.metadata.tracks = trackDetails.map((track) => {
      let tag = track.tag ? track.tag : "possum";
      return {
        start_s: track.start_s || 2 + count * 10,
        end_s: track.end_s || 8 + count * 10,
=======
  if (trackDetails) {
    data.metadata.tracks = trackDetails.map((track) => {
      let tag = track.tag ? track.tag : "possum";
      return {
        start_s: 2,
        end_s: 8,
>>>>>>> 45ba91c66c9e557bb173ce07c612f6665beb107c
        confident_tag: tag,
        confidence: 0.9
      };
    });
  } else {
    data.metadata.tracks.push({
      start_s: 2,
      end_s: 8,
      confident_tag: "possum",
      confidence: 0.5
    });
  }
}
