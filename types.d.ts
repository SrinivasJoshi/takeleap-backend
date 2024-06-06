import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";
declare const tables: readonly [
  {
    readonly name: "personalMentors";
    readonly columns: readonly [
      {
        readonly name: "name";
        readonly type: "string";
      },
      {
        readonly name: "gender";
        readonly type: "string";
      },
      {
        readonly name: "currentLocation";
        readonly type: "string";
      },
      {
        readonly name: "currentStatus";
        readonly type: "string";
      },
      {
        readonly name: "contactNumber";
        readonly type: "string";
      },
      {
        readonly name: "greScore";
        readonly type: "int";
      },
      {
        readonly name: "toeflScore";
        readonly type: "int";
      },
      {
        readonly name: "admitLinks";
        readonly type: "multiple";
      },
      {
        readonly name: "professionalLinks";
        readonly type: "multiple";
      },
      {
        readonly name: "mentorshipLink";
        readonly type: "link";
        readonly link: {
          readonly table: "mentorship";
        };
        readonly unique: true;
      },
      {
        readonly name: "academicLink";
        readonly type: "link";
        readonly link: {
          readonly table: "academic";
        };
        readonly unique: true;
      },
      {
        readonly name: "avatar";
        readonly type: "file[]";
        readonly "file[]": {
          readonly defaultPublicAccess: true;
        };
      }
    ];
  },
  {
    readonly name: "professionalExperiences";
    readonly columns: readonly [
      {
        readonly name: "title";
        readonly type: "string";
      },
      {
        readonly name: "endDate";
        readonly type: "string";
      },
      {
        readonly name: "startDate";
        readonly type: "string";
      },
      {
        readonly name: "companyName";
        readonly type: "string";
      }
    ];
  },
  {
    readonly name: "academic";
    readonly columns: readonly [
      {
        readonly name: "masterUni";
        readonly type: "string";
      },
      {
        readonly name: "masterProgram";
        readonly type: "string";
      },
      {
        readonly name: "gpaScore";
        readonly type: "int";
      },
      {
        readonly name: "gpaTotal";
        readonly type: "int";
      },
      {
        readonly name: "startTerm";
        readonly type: "string";
      },
      {
        readonly name: "startYear";
        readonly type: "int";
      },
      {
        readonly name: "endTerm";
        readonly type: "string";
      },
      {
        readonly name: "endYear";
        readonly type: "int";
      },
      {
        readonly name: "undergradUni";
        readonly type: "string";
      },
      {
        readonly name: "undergradProgram";
        readonly type: "string";
      },
      {
        readonly name: "undergradGpaScore";
        readonly type: "int";
      },
      {
        readonly name: "undergradGpaTotal";
        readonly type: "int";
      },
      {
        readonly name: "classRank";
        readonly type: "int";
      },
      {
        readonly name: "totalStudents";
        readonly type: "int";
      },
      {
        readonly name: "underStartYear";
        readonly type: "int";
      },
      {
        readonly name: "underEndYear";
        readonly type: "int";
      },
      {
        readonly name: "doi";
        readonly type: "multiple";
      },
      {
        readonly name: "numberOfDoi";
        readonly type: "int";
      }
    ];
    readonly revLinks: readonly [
      {
        readonly column: "academicLink";
        readonly table: "personalMentors";
      }
    ];
  },
  {
    readonly name: "admits";
    readonly columns: readonly [
      {
        readonly name: "programName";
        readonly type: "string";
      },
      {
        readonly name: "universityName";
        readonly type: "string";
      },
      {
        readonly name: "scholarshipAmount";
        readonly type: "string";
      }
    ];
  },
  {
    readonly name: "mentorship";
    readonly columns: readonly [
      {
        readonly name: "programs";
        readonly type: "multiple";
      },
      {
        readonly name: "expertise";
        readonly type: "multiple";
      },
      {
        readonly name: "studentsToMentor";
        readonly type: "int";
      },
      {
        readonly name: "reasonToMentor";
        readonly type: "multiple";
      }
    ];
    readonly revLinks: readonly [
      {
        readonly column: "mentorshipLink";
        readonly table: "personalMentors";
      }
    ];
  }
];
export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;
export type PersonalMentors = InferredTypes["personalMentors"];
export type PersonalMentorsRecord = PersonalMentors & XataRecord;
export type ProfessionalExperiences = InferredTypes["professionalExperiences"];
export type ProfessionalExperiencesRecord = ProfessionalExperiences &
  XataRecord;
export type Academic = InferredTypes["academic"];
export type AcademicRecord = Academic & XataRecord;
export type Admits = InferredTypes["admits"];
export type AdmitsRecord = Admits & XataRecord;
export type Mentorship = InferredTypes["mentorship"];
export type MentorshipRecord = Mentorship & XataRecord;
export type DatabaseSchema = {
  personalMentors: PersonalMentorsRecord;
  professionalExperiences: ProfessionalExperiencesRecord;
  academic: AcademicRecord;
  admits: AdmitsRecord;
  mentorship: MentorshipRecord;
};
declare const DatabaseClient: any;
export declare class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions);
}
export declare const getXataClient: () => XataClient;
export {};
