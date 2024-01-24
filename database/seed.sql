create table ctml_schema
(
  id        int auto_increment
    primary key,
  version   int                                      not null,
  `schema`  longtext                                 not null,
  createdAt datetime(3) default CURRENT_TIMESTAMP(3) not null,
  updatedAt datetime(3)                              not null,
  constraint ctml_schema_version_key
    unique (version)
);

create index ctml_schema_version_idx
  on ctml_schema (version);

create table user
(
  id             int auto_increment
    primary key,
  email          varchar(191)                             not null,
  name           varchar(191)                             null,
  username       varchar(191)                             null,
  first_name     varchar(191)                             null,
  email_verified tinyint(1)  default 0                    not null,
  last_name      varchar(191)                             null,
  refresh_token  longtext                                 null,
  keycloak_id    varchar(191)                             null,
  createdAt      datetime(3) default CURRENT_TIMESTAMP(3) not null,
  updatedAt      datetime(3)                              not null,
  constraint user_email_key
    unique (email),
  constraint user_keycloak_id_key
    unique (keycloak_id)
);

create table trial
(
  id                     int auto_increment
    primary key,
  nct_id                 varchar(191)                                                          not null,
  nickname               varchar(191)                                                          null,
  principal_investigator varchar(191)                                                          null,
  status                 enum ('DRAFT', 'IN_REVIEW', 'COMPLETED') default 'DRAFT'              null,
  createdAt              datetime(3)                              default CURRENT_TIMESTAMP(3) not null,
  updatedAt              datetime(3)                                                           not null,
  modifiedById           int                                                                   null,
  userId                 int                                                                   null,
  constraint trial_modifiedById_fkey
    foreign key (modifiedById) references user (id)
      on update cascade on delete set null,
  constraint trial_userId_fkey
    foreign key (userId) references user (id)
      on update cascade on delete set null
);

create table _ctml_schemaTotrial
(
  A int not null,
  B int not null,
  constraint _ctml_schemaTotrial_AB_unique
    unique (A, B),
  constraint _ctml_schemaTotrial_A_fkey
    foreign key (A) references ctml_schema (id)
      on update cascade on delete cascade,
  constraint _ctml_schemaTotrial_B_fkey
    foreign key (B) references trial (id)
      on update cascade on delete cascade
);

create index _ctml_schemaTotrial_B_index
  on _ctml_schemaTotrial (B);

create table ctml_json
(
  id        int auto_increment
    primary key,
  versionId int                                      null,
  data      json                                     null,
  createdAt datetime(3) default CURRENT_TIMESTAMP(3) not null,
  updatedAt datetime(3)                              not null,
  trialId   int                                      null,
  constraint ctml_json_trialId_fkey
    foreign key (trialId) references trial (id)
      on update cascade on delete set null,
  constraint ctml_json_versionId_fkey
    foreign key (versionId) references ctml_schema (id)
      on update cascade on delete set null
);

create index user_keycloak_id_idx
  on user (keycloak_id);


INSERT INTO ctims.ctml_schema (id, version, `schema`, createdAt, updatedAt) VALUES (1, 1, '{"definitions":{"ctml_status":{"enumNames":["Draft","In Review","Complete"],"enum":["DRAFT","IN_REVIEW","COMPLETED"]}},"type":"object","properties":{"trialInformation":{"required":["trial_id"],"type":"object","properties":{"trial_id":{"type":"string","title":"Trial ID","description":"The unique identifier for the study"},"nickname":{"type":"string","title":"Nickname","description":"A unique nickname to easily identify study"},"principal_investigator":{"type":"string","title":"Principal Investigator","description":"Enter details of the overall principal investigator"},"ctml_status":{"title":"Ctml Status","description":"Categorize the status of your CTML","default":"DRAFT","$ref":"#/definitions/ctml_status"},"long_title":{"type":"string","title":"Long Title","description":"The official title of the trial"},"short_title":{"type":"string","title":"Short Title","description":"A short title for the trial"},"phase":{"type":"string","title":"Phase","description":"Phase/stage of the clinical trial studying a drug or biological product","enum":["I","II","III","IV"]},"protocol_no":{"type":"string","title":"Protocol Number","description":"Protocol number associated with the trial; Unique identifier for the study other than the NCT_ID"},"nct_purpose":{"type":"string","title":"NCT Purpose","description":"The National Clinical Trial (NCT) purpose. The purpose of the clinical trial"},"status":{"type":"string","title":"Status","enum":["Open to Accrual","Closed to Accrual","Not yet recruiting","Recruiting","Enrolling by invitation","Active, not recruiting","Suspended","Terminated","Completed","Withdrawn","Unknown status"],"description":"Status of the trial"}},"title":"Trial Information"},"prior_treatment_requirements":{"type":"array","title":"Prior treatment requirements","items":{"type":"string","title":"Prior treatment requirements"}},"age_group":{"type":"object","required":[],"properties":{"age":{"type":"string","title":"Age Group","enum":["Adult","Older Adult","Children"],"description":"The age group the study is focused on"}},"title":"Age"},"drug_list":{"type":"object","properties":{"drug":{"type":"array","items":{"type":"object","required":[],"properties":{"drug_name":{"type":"string","title":"Drug Name","description":"A list of drug names in the trial. If there is a drug combination that are to be taken at the same time, include together. Example: Nivolumab plus Ipilimumab"}}},"title":"Drug"}},"title":"Drug List"},"management_group_list":{"type":"object","properties":{"management_group":{"type":"array","items":{"type":"object","required":[],"properties":{"management_group_name":{"type":"string","title":"Management Group Name","enum":["BCCA - Vancouver Cancer Centre","Princess Margaret Cancer Centre","Cancer Centre of Southeastern Ontario at Kingston General Hospital","London Health Sciences Centre","The Ottawa Hospital Cancer Centre","Juravinski Cancer Centre at Hamilton Health Sciences","Odette Cancer Centre - Sunnybrook Health Sciences Centre","Mount Sinai Hospital","Cross Cancer Institute"],"description":"The hospital/clinic conducting the trial (study site(s)) in Canada. Please input the full name of the hospital/clinic site. If there is more than one site, please list each hospital/site"},"is_primary":{"type":"string","enum":["Y","N"],"title":"This is a primary management group"}}},"title":"Management Group"}},"title":"Management Group List"},"site_list":{"type":"object","properties":{"site":{"type":"array","items":{"type":"object","required":[],"properties":{"site_name":{"type":"string","title":"Site Name","enum":["BCCA - Vancouver Cancer Centre","Princess Margaret Cancer Centre","Cancer Centre of Southeastern Ontario at Kingston General Hospital","London Health Sciences Centre","The Ottawa Hospital Cancer Centre","Juravinski Cancer Centre at Hamilton Health Sciences","Odette Cancer Centre - Sunnybrook Health Sciences Centre","Mount Sinai Hospital","Cross Cancer Institute","The Hospital for Sick Children","McGill University Health Centre"],"description":"The hospital/clinic managing this trial. Please input the full name of the hospital/clinic site."},"site_status":{"type":"string","title":"Site Status","enum":["Open to Accrual","Closed to Accrual","Not yet recruiting","Recruiting","Enrolling by invitation","Active, not recruiting","Suspended","Terminated","Completed","Withdrawn","Unknown status"],"description":"Trial accrual status"},"coordinating_center":{"type":"string","enum":["Y","N"],"title":"This site is a coordinating center."},"uses_cancer_center_irb":{"type":"string","enum":["Y","N"],"title":"This site uses cancer center IRB."}}},"title":"Site"}},"title":"Site List"},"sponsor_list":{"type":"object","properties":{"sponsor":{"type":"array","items":{"type":"object","required":[],"properties":{"sponsor_name":{"type":"string","title":"Sponsor Name","description":"The name of the sponsor and/or collaborators."},"is_principal_sponsor":{"type":"string","enum":["Y","N"],"title":"This sponsor is a principal sponsor."}}},"title":"Sponsor"}},"title":"Sponsor List"},"staff_list":{"type":"object","properties":{"protocol_staff":{"type":"array","items":{"type":"object","required":[],"properties":{"first_name":{"type":"string","title":"First Name","description":"The first name of the overall principal investigator"},"last_name":{"type":"string","title":"Last Name","description":"The last name of the overall principal investigator"},"email_address":{"type":"string","title":"Email","description":"The email address of the overall principal investigator"},"institution_name":{"type":"string","title":"Institution Name","enum":["Princess Margaret Cancer Centre","Cancer Centre of Southeastern Ontario at Kingston General Hospital","London Health Sciences Centre","The Ottawa Hospital Cancer Centre","Juravinski Cancer Centre at Hamilton Health Sciences","Odette Cancer Centre - Sunnybrook Health Sciences Centre","Mount Sinai Hospital"],"description":"The institute the overall principal investigator is a part of"},"staff_role":{"type":"string","enum":["Overall Principal Investigator"],"title":"Staff Role","description":"The role of the listed staff"}},"title":"Protocol Staff"},"title":"Protocol Staff"}},"title":"Staff List"},"treatment_list":{"type":"object","properties":{"step":{"type":"array","items":{"type":"object","properties":{"arm":{"type":"array","items":{"type":"object","required":[],"properties":{"arm_code":{"type":"string","title":"Arm Code","description":"A group/subgroup of participants in a trial that receives a specific treatment"},"arm_description":{"type":"string","title":"Arm Description","description":"A description of an individual trial arm"},"arm_internal_id":{"type":"string","title":"Arm Internal Id","description":"Internal ID of arm"},"arm_suspended":{"type":"string","enum":["Y","N"],"title":"Arm is suspended"},"dose_level":{"type":"array","title":"Dose Level","items":{"type":"object","required":[],"properties":{"level_code":{"type":"string","title":"Level Code","description":"Dose level code; the drug name"},"level_description":{"type":"string","title":"Level Description","description":"Dose level description. The dosage details and frequency of administration"},"level_internal_id":{"type":"string","title":"Level Internal Id","description":"Internal dose ID"},"level_suspended":{"type":"string","enum":["Y","N"],"title":"This level is suspended"}}}},"match":{"type":"object","title":"","properties":{"matchingCriteriaWidget":{"type":"string","title":"Matching Criteria Widget"}}}}}}}}}},"title":"Treatment List"}}}', '2023-05-10 14:20:26.327', '2023-05-10 14:20:26.327');
