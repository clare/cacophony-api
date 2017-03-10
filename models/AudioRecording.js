var util = require('./util/util');
var validation = require('./util/validation');

module.exports = function(sequelize, DataTypes) {
  var name = 'AudioRecording';

  var attributes = {
    // Fields for a file.
    fileKey: { // Key for S3 file storage.
      type: DataTypes.STRING,
    },
    mimeType: { // MIME of file.
      type: DataTypes.STRING,
    },
    size: { // Size of file.
      type: DataTypes.INTEGER,
    },
    // Fields for a file that is a audio recording.
    duration: { // Duration of audio recording in seconds.
      type: DataTypes.INTEGER,
    },
    recordingDateTime: { // Date of when the recording started.
      type: DataTypes.DATE,
    },
    recordingTime: { // Local time of recording.
      type: DataTypes.TIME,
    },
    // Fields for location.
    location: { // Latitude and longitude of where the datapoint was collected.
      type: DataTypes.GEOMETRY,
      set: util.geometrySetter,
      validate: { isLatLon: validation.isLatLon },
    },
    // Battery relevant fields.
    batteryLevel: { // Battery level, 1 being full.
      type: DataTypes.DOUBLE,
    },
    batteryCharging: { // Status of the battery [CHARGING, FULL..]
      type: DataTypes.STRING,
    },
    airplaneModeOn: { // If airplane mode was on at time of recording.
      type: DataTypes.BOOLEAN,
    },
    // Fields from filter functions.
    filtered: { // If the recording has been filtered.
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    filterMetadata: { // Metadata from filter function.
      type: DataTypes.JSONB,
    },
    passedFilter: { // If the recording passed the filter.
      type: DataTypes.BOOLEAN,
    },
    // Other fields.
    public: { // If this datapoint can be viewed by the public.
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    additionalMetadata: { // Random metadata can be put here.
      type: DataTypes.JSONB,
    },
    tags: { // Tagging data like animal sightings.
      type: DataTypes.JSONB,
    },
  };

  var options = {
    classMethods: {
      addAssociations: addAssociations,
      apiSettableFields: apiSettableFields,
      apiUpdateableFields: apiUpdateableFields,
      findAllWithUser: findAllWithUser,
      getFileData: getFileData,
    },
    instanceMethods: {
      getFrontendFields: getFrontendFields,
      processRecording: util.processAudio,
      saveFile: util.saveFile,
      addTags: util.addTags,
      deleteTags: util.deleteTags,
    },
  };

  return sequelize.define(name, attributes, options);
};

var apiUpdateableFields = [
  'recordingDateTime',
  'recordingTime',
  'location',
  'additionalMetadata',
];

var apiSettableFields = [
  'recordingDateTime',
  'recordingTime',
  'fileType',
  'size',
  'duration',
  'location',
  'additionalMetadata',
  'tags',
  'batteryLevel',
  'batteryCharging',
  'airplaneModeOn',
];

function addAssociations(models) {
  models.AudioRecording.belongsTo(models.Group);
}

function getFrontendFields() {
  var model = this;
  var group = null;
  if (model.dataValues.Group) {
    group = model.dataValues.Group.dataValues.groupname;
  }
  return {
    id: model.getDataValue('id'),
    recordingDateTime: model.getDataValue('recordingDateTime'),
    recordingTime: model.getDataValue('recordingTime'),
    duration: model.getDataValue('duration'),
    location: model.getDataValue('location'),
    tags: model.getDataValue('tags'),
    fileKey: model.getDataValue('fileKey'),
    batteryCharging: model.get('batteryCharging'),
    batteryLevel: model.get('batteryLevel'),
    airplaneModeOn: model.get('airplaneModeOn'),
    deviceId: model.getDataValue('DeviceId'),
    groupId: model.getDataValue('GroupId'),
    group: group
  };
}

function findAllWithUser(user, queryParams) {
  return util.findAllWithUser(this, user, queryParams);
}

function getFileData(id, user) {
  return util.getFileData(this, id, user);
}
