"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXataClient = exports.XataClient = void 0;
// Generated by Xata Codegen 0.29.4. Please do not edit.
const client_1 = require("@xata.io/client");
/** @typedef { import('./types').SchemaTables } SchemaTables */
/** @type { SchemaTables } */
const tables = [
  {
    name: "personalMentors",
    columns: [
      { name: "name", type: "string" },
      { name: "gender", type: "string" },
      { name: "currentLocation", type: "string" },
      { name: "currentStatus", type: "string" },
      { name: "contactNumber", type: "string" },
      { name: "greScore", type: "int" },
      { name: "toeflScore", type: "int" },
      { name: "admitLinks", type: "multiple" },
      { name: "professionalLinks", type: "multiple" },
      {
        name: "mentorshipLink",
        type: "link",
        link: { table: "mentorship" },
        unique: true,
      },
      {
        name: "academicLink",
        type: "link",
        link: { table: "academic" },
        unique: true,
      },
      {
        name: "avatar",
        type: "file[]",
        "file[]": { defaultPublicAccess: true },
      },
    ],
  },
  {
    name: "professionalExperiences",
    columns: [
      { name: "title", type: "string" },
      { name: "endDate", type: "string" },
      { name: "startDate", type: "string" },
      { name: "companyName", type: "string" },
    ],
  },
  {
    name: "academic",
    columns: [
      { name: "masterUni", type: "string" },
      { name: "masterProgram", type: "string" },
      { name: "gpaScore", type: "int" },
      { name: "gpaTotal", type: "int" },
      { name: "startTerm", type: "string" },
      { name: "startYear", type: "int" },
      { name: "endTerm", type: "string" },
      { name: "endYear", type: "int" },
      { name: "undergradUni", type: "string" },
      { name: "undergradProgram", type: "string" },
      { name: "undergradGpaScore", type: "int" },
      { name: "undergradGpaTotal", type: "int" },
      { name: "classRank", type: "int" },
      { name: "totalStudents", type: "int" },
      { name: "underStartYear", type: "int" },
      { name: "underEndYear", type: "int" },
      { name: "doi", type: "multiple" },
      { name: "numberOfDoi", type: "int" },
    ],
    revLinks: [{ column: "academicLink", table: "personalMentors" }],
  },
  {
    name: "admits",
    columns: [
      { name: "programName", type: "string" },
      { name: "universityName", type: "string" },
      { name: "scholarshipAmount", type: "string" },
    ],
  },
  {
    name: "mentorship",
    columns: [
      { name: "programs", type: "multiple" },
      { name: "expertise", type: "multiple" },
      { name: "studentsToMentor", type: "int" },
      { name: "reasonToMentor", type: "multiple" },
    ],
    revLinks: [{ column: "mentorshipLink", table: "personalMentors" }],
  },
];
/** @type { import('@xata.io/client').ClientConstructor<{}> } */
const DatabaseClient = (0, client_1.buildClient)();
const defaultOptions = {
  databaseURL: "https://hi-s-workspace-83b85m.us-east-1.xata.sh/db/takeleap-db",
};
/** @typedef { import('./types').DatabaseSchema } DatabaseSchema */
/** @extends DatabaseClient<DatabaseSchema> */
class XataClient extends DatabaseClient {
  constructor(options) {
    super({ ...defaultOptions, ...options }, tables);
  }
}
exports.XataClient = XataClient;
let instance = undefined;
/** @type { () => XataClient } */
const getXataClient = () => {
  if (instance) return instance;
  instance = new XataClient();
  return instance;
};
exports.getXataClient = getXataClient;
