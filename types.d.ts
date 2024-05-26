import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";
declare const tables: readonly [
  {
    readonly name: "mentors";
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
        readonly name: "classRank";
        readonly type: "int";
      },
      {
        readonly name: "underGradInstitution";
        readonly type: "string";
      },
      {
        readonly name: "underGradDegree";
        readonly type: "string";
      },
      {
        readonly name: "undergraduateGPA";
        readonly type: "float";
      },
      {
        readonly name: "postGraduateInstitution";
        readonly type: "string";
      },
      {
        readonly name: "postGraduateDegree";
        readonly type: "string";
      },
      {
        readonly name: "programName";
        readonly type: "string";
      },
      {
        readonly name: "universityName";
        readonly type: "string";
      },
      {
        readonly name: "greLink";
        readonly type: "link";
        readonly link: {
          readonly table: "greScore";
        };
        readonly unique: true;
      },
      {
        readonly name: "toeflLink";
        readonly type: "link";
        readonly link: {
          readonly table: "toeflScore";
        };
        readonly unique: true;
      },
      {
        readonly name: "publicationLinks";
        readonly type: "multiple";
      },
      {
        readonly name: "experienceLinks";
        readonly type: "multiple";
      },
      {
        readonly name: "contactNumber";
        readonly type: "string";
      }
    ];
  },
  {
    readonly name: "greScore";
    readonly columns: readonly [
      {
        readonly name: "Q";
        readonly type: "int";
      },
      {
        readonly name: "V";
        readonly type: "int";
      },
      {
        readonly name: "AWA";
        readonly type: "int";
      }
    ];
    readonly revLinks: readonly [
      {
        readonly column: "greLink";
        readonly table: "mentors";
      }
    ];
  },
  {
    readonly name: "toeflScore";
    readonly columns: readonly [
      {
        readonly name: "speaking";
        readonly type: "int";
      },
      {
        readonly name: "writing";
        readonly type: "int";
      },
      {
        readonly name: "listening";
        readonly type: "int";
      },
      {
        readonly name: "reading";
        readonly type: "int";
      }
    ];
    readonly revLinks: readonly [
      {
        readonly column: "toeflLink";
        readonly table: "mentors";
      }
    ];
  },
  {
    readonly name: "publications";
    readonly columns: readonly [
      {
        readonly name: "title";
        readonly type: "string";
      },
      {
        readonly name: "journalName";
        readonly type: "string";
      },
      {
        readonly name: "link";
        readonly type: "string";
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
      },
      {
        readonly name: "description";
        readonly type: "text";
      },
      {
        readonly name: "awardsRecognition";
        readonly type: "string";
      },
      {
        readonly name: "numberOfPromotions";
        readonly type: "int";
      }
    ];
  }
];
export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;
export type Mentors = InferredTypes["mentors"];
export type MentorsRecord = Mentors & XataRecord;
export type GreScore = InferredTypes["greScore"];
export type GreScoreRecord = GreScore & XataRecord;
export type ToeflScore = InferredTypes["toeflScore"];
export type ToeflScoreRecord = ToeflScore & XataRecord;
export type Publications = InferredTypes["publications"];
export type PublicationsRecord = Publications & XataRecord;
export type ProfessionalExperiences = InferredTypes["professionalExperiences"];
export type ProfessionalExperiencesRecord = ProfessionalExperiences &
  XataRecord;
export type DatabaseSchema = {
  mentors: MentorsRecord;
  greScore: GreScoreRecord;
  toeflScore: ToeflScoreRecord;
  publications: PublicationsRecord;
  professionalExperiences: ProfessionalExperiencesRecord;
};
declare const DatabaseClient: any;
export declare class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions);
}
export declare const getXataClient: () => XataClient;
export {};
