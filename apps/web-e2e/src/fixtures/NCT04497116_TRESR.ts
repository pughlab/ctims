import {Tresr} from "../support/interfaces/TRESRInterface";

export const NCT04497116_TRESR: Tresr = {
  "age": "Adult",
  "drug_list": {
    "drug": [
      {
        "drug_name": "RP-3500"
      },
      {
        "drug_name": "Talazoparib"
      }
    ]
  },
  "last_updated": "May 13, 2021",
  "long_title": "Phase 1/2a Study of the Safety, Pharmacokinetics, Pharmacodynamics and Preliminary Clinical Activity of RP-3500 Alone or in Combination with Talazoparib in Advanced Solid Tumors with ATR inhibitor Sensitizing Mutations (TRESR Study)",
  "management_group_list": {
    "management_group": [
      {
        "is_primary": "Y",
        "management_group_name": "Princess Margaret Cancer Centre"
      }
    ]
  },
  "match": [
    {
      "clinical": {
        "disease_status": [
          "Solid Tumor"
        ]
      }
    }
  ],
  "nct_id": "NCT04497116",
  "nct_purpose": "The primary purpose of this study is to study the maximum tolerated dose (MTD) of orally-administered RP-3500 alone or in combination with talazoparib, a PARP inhibitor, in patients with advanced solid tumors with ATR inhibitor-sensitizing mutations. This study will also evaluate the safety and tolerability of RP-3500 alone or in combination with talazoparib, examine both the pharmacokinetics (PK)and pharmacodynamics (PD)and investigate its anti-tumor activity in solid tumors.",
  "phase": "I and II",
  "prior_treatment_requirements": [
    "Written informed consent, according to local guidelines, signed and dated by the patient or legal guardian prior to the performance of any study-specific procedures, sampling, or analyses.",
    "Male or female and >= 18 years-of-age at the time of signature of the ICF.",
    "Eastern Cooperative Oncology Group (ECOG) Performance Status score of 0 or 1",
    "Histologically confirmed solid tumors resistant or refractory to standard treatment and/or patients who are intolerant to standard therapy.",
    "Measurable disease as per RECIST v1.1",
    "Existing biomarker profile (tumor tissue or plasma) reported from a local test obtained in a certified lab per institutional guidelines: - Documented and confirmed by central review of local NGS reports by PODS Group, deleterious genomic alterations for at least 1 of the following genes: ATM, ATRIP, BRCA1, BRCA2, CDK12, CHTF8, FZR1, MRE11, NBN, PALB2, RAD17, RAD50, RAD51B, REV3L, RNAseH2A, RNAseH2B, SETD2 or other genes decided upon between the sponsor and investigators. - Or documented complete loss of ATM or RNase H2 protein expression by IHC.",
    "Available tumor tissue or willingness to have a biopsy performed to obtain tissue.",
    "Ability to comply with the protocol and study procedures detailed in the Schedule of Assessments.",
    "Ability to swallow and retain oral medications.",
    "Acceptable organ function at screening",
    "Acceptable blood counts at screening",
    "Negative pregnancy test (serum or urine) for women of childbearing potential at Screening and prior to first study drug. Women who are not of childbearing potential is defined as 1) adequate time with absence of menses (period) or 2) documented infertility.",
    "Male patients with female partners of childbearing potential and women of childbearing potential must follow a contraception method (oral contraceptives allowed) during their participation in the study and for at least 4 months following last dose of study drug. Male patients must also refrain from donating sperm during their participation in the study and for 4 months following last dose of study drug.",
    "Resolution of all toxicities of prior therapy or surgical procedures to baseline or Grade 1 (except for neuropathy, hypothyroidism requiring medication and alopecia which must have resolved to Grade <= 2).",
    "Life expectancy >= 12 weeks after the start of the treatment according to the investigator’s judgment."
  ],
  "protocol_no": "RP-3500-01",
  "short_title": "Study of RP-3500 in Advanced Solid Tumors",
  "site_list": {
    "site": [
      {
        "coordinating_center": "Y",
        "site_name": "Princess Margaret Cancer Centre",
        "site_status": "Open to Accrual",
        "uses_cancer_center_irb": "Y"
      }
    ]
  },
  "sponsor_list": {
    "sponsor": [
      {
        "is_principal_sponsor": "Y",
        "sponsor_name": "Repare Therapeutics"
      }
    ]
  },
  "staff_list": {
    "protocol_staff": [
      {
        "email_address": "Stephanie.Lheureux@uhn.ca",
        "first_name": "Stephanie",
        "institution_name": "Princess Margaret Cancer Centre",
        "last_name": "Lheureux",
        "staff_role": "Overall Principal Investigator"
      }
    ]
  },
  "status": "Open to Accrual",
  "treatment_list": {
    "step": [
      {
        "arm": [
          {
            "arm_code": "Module 1",
            "arm_description": "RP-3500 Single-Agent, Dose Escalation",
            "arm_internal_id": 1,
            "arm_suspended": "N",
            "dose_level": [
              {
                "level_code": "RP-3500",
                "level_description": "Module 1a: 5 days on/ 2 days off dosing schedules. Module 1b: 3 days on/ 4 days off dosing schedules. Module 1a and Module 1b will proceed in parallel. Dose escalations will continue independently until the MTD or RP2D is determined for each schedule. Eligible patients in Module 1a will initially receive RP-3500 QD at a starting dose of 5 mg, at the 5/2 dosing schedule. Module 1b starting dose will be the highest daily dose being evaluated in Module 1a but administered only for 3 days each week.",
                "level_internal_id": 1,
                "level_suspended": "N"
              }
            ],
            "match": [
              {
                "clinical": {
                  "age_numerical": ">=18",
                  "oncotree_primary_diagnosis": "_SOLID_"
                }
              }
            ]
          },
          {
            "arm_code": "Module 2: Arm 1",
            "arm_description": "RP-3500 Monotherapy to Establish Preliminary Efficacy in Patients with Tumors Carrying ATRi Sensitizing Mutations. ARM 1: Tumors with ATM loss. To determine if the mechanism of ATM loss impacts the clinical response to RP-3500, central confirmatory testing will retrospectively assign patients into 3 cohorts to meet the secondary objectives: biallelic, monoallelic, and ATM protein loss with no documented deleterious ATM alterations.",
            "arm_internal_id": 2,
            "arm_suspended": "N",
            "dose_level": [
              {
                "level_code": "RP-3500",
                "level_description": "In Module 2, RP-3500 will be administered at RP2D and recommended schedule for monotherapy with daily dosing frequencies as established in Module 1.",
                "level_internal_id": 2,
                "level_suspended": "N"
              }
            ],
            "match": [
              {
                "and": [
                  {
                    "or": [
                      {
                        "genomic": {
                          "hugo_symbol": "ATM",
                          "variant_category": "CNV",
                          "cnv_call": "Heterozygous deletion",
                          "variant_classification": "Nonsense_Mutation"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "ATM",
                          "variant_category": "CNV",
                          "cnv_call": "Homozygous deletion",
                          "variant_classification": "Nonsense_Mutation"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "ATM",
                          "variant_category": "SV",
                          "variant_classification": "Nonsense_Mutation"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "ATM",
                          "variant_category": "Mutation",
                          "variant_classification": "Frame_Shift_Del"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "ATM",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense and Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "ATM",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense_Mutation"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "ATM",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "ATM",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Site"
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "and": [
                  {
                    "clinical": {
                      "age_numerical": ">=18",
                      "oncotree_primary_diagnosis": "_SOLID_"
                    }
                  }
                ]
              }
            ]
          },
          {
            "arm_code": "Module 2: Arm 2",
            "arm_description": "RP-3500 Monotherapy to Establish Preliminary Efficacy in Patients with Tumors Carrying ATRi Sensitizing Mutations. ARM 2: Tumors with RNAseH2 loss. Patients with tumors with reported RNase H2 genomic or protein loss will be enrolled based on local NGS or IHC test results.",
            "arm_internal_id": 3,
            "arm_suspended": "N",
            "dose_level": [
              {
                "level_code": "RP-3500",
                "level_description": "In Module 2, RP-3500 will be administered at RP2D and recommended schedule for monotherapy with daily dosing frequencies as established in Module 1. ",
                "level_internal_id": 3,
                "level_suspended": "N"
              }
            ],
            "match": [
              {
                "and": [
                  {
                    "or": [
                      {
                        "genomic": {
                          "hugo_symbol": "RNAseH2A",
                          "variant_category": "CNV",
                          "cnv_call": "Heterozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RNAseH2A",
                          "variant_category": "CNV",
                          "cnv_call": "Homozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RNAseH2A",
                          "variant_category": "SV"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RNAseH2A",
                          "variant_category": "Mutation",
                          "variant_classification": "Frame_Shift_Del"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RNAseH2A",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense and Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RNAseH2A",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense_Mutation"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RNAseH2A",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RNAseH2A",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Site"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RNAseH2B",
                          "variant_category": "CNV",
                          "cnv_call": "Heterozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RNAseH2B",
                          "variant_category": "CNV",
                          "cnv_call": "Homozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RNAseH2B",
                          "variant_category": "SV"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RNAseH2B",
                          "variant_category": "Mutation",
                          "variant_classification": "Frame_Shift_Del"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RNAseH2B",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense and Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RNAseH2B",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense_Mutation"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RNAseH2B",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RNAseH2B",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Site"
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "and": [
                  {
                    "clinical": {
                      "age_numerical": ">=18",
                      "oncotree_primary_diagnosis": "_SOLID_"
                    }
                  }
                ]
              }
            ]
          },
          {
            "arm_code": "Module 2: Arm 3",
            "arm_description": "RP-3500 Monotherapy to Establish Preliminary Efficacy in Patients with Tumors Carrying ATRi Sensitizing Mutations. ARM 2: HyBAR - tumors with loss of other ATR inhibitor sensitizing mutations",
            "arm_internal_id": 4,
            "arm_suspended": "N",
            "dose_level": [
              {
                "level_code": "RP-3500",
                "level_description": "In Module 2, RP-3500 will be administered at RP2D and recommended schedule for monotherapy with daily dosing frequencies as established in Module 1.",
                "level_internal_id": 4,
                "level_suspended": "N"
              }
            ],
            "match": [
              {
                "and": [
                  {
                    "or": [
                      {
                        "genomic": {
                          "hugo_symbol": "ATRIP",
                          "variant_category": "CNV",
                          "cnv_call": "Heterozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "ATRIP",
                          "variant_category": "CNV",
                          "cnv_call": "Homozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "ATRIP",
                          "variant_category": "SV"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "ATRIP",
                          "variant_category": "Mutation",
                          "variant_classification": "Frame_Shift_Del"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "ATRIP",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense and Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "ATRIP",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense_Mutation"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "ATRIP",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "ATRIP",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Site"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "BRCA1",
                          "variant_category": "CNV",
                          "cnv_call": "Heterozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "BRCA1",
                          "variant_category": "CNV",
                          "cnv_call": "Homozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "BRCA1",
                          "variant_category": "SV"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "BRCA1",
                          "variant_category": "Mutation",
                          "variant_classification": "Frame_Shift_Del"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "BRCA1",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense and Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "BRCA1",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense_Mutation"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "BRCA1",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "BRCA1",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Site"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "BRCA2",
                          "variant_category": "CNV",
                          "cnv_call": "Heterozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "BRCA2",
                          "variant_category": "CNV",
                          "cnv_call": "Homozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "BRCA2",
                          "variant_category": "SV"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "BRCA2",
                          "variant_category": "Mutation",
                          "variant_classification": "Frame_Shift_Del"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "BRCA2",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense and Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "BRCA2",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense_Mutation"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "BRCA2",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "BRCA2",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Site"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "CDK12",
                          "variant_category": "CNV",
                          "cnv_call": "Heterozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "CDK12",
                          "variant_category": "CNV",
                          "cnv_call": "Homozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "CDK12",
                          "variant_category": "SV"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "CDK12",
                          "variant_category": "Mutation",
                          "variant_classification": "Frame_Shift_Del"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "CDK12",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense and Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "CDK12",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense_Mutation"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "CDK12",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "CDK12",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Site"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "CHTF8",
                          "variant_category": "CNV",
                          "cnv_call": "Heterozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "CHTF8",
                          "variant_category": "CNV",
                          "cnv_call": "Homozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "CHTF8",
                          "variant_category": "SV"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "CHTF8",
                          "variant_category": "Mutation",
                          "variant_classification": "Frame_Shift_Del"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "CHTF8",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense and Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "CHTF8",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense_Mutation"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "CHTF8",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "CHTF8",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Site"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "FZR1",
                          "variant_category": "CNV",
                          "cnv_call": "Heterozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "FZR1",
                          "variant_category": "CNV",
                          "cnv_call": "Homozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "FZR1",
                          "variant_category": "SV"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "FZR1",
                          "variant_category": "Mutation",
                          "variant_classification": "Frame_Shift_Del"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "FZR1",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense and Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "FZR1",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense_Mutation"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "FZR1",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "FZR1",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Site"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "MRE11A",
                          "variant_category": "CNV",
                          "cnv_call": "Heterozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "MRE11A",
                          "variant_category": "CNV",
                          "cnv_call": "Homozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "MRE11A",
                          "variant_category": "SV"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "MRE11A",
                          "variant_category": "Mutation",
                          "variant_classification": "Frame_Shift_Del"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "MRE11A",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense and Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "MRE11A",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense_Mutation"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "MRE11A",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "MRE11A",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Site"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "NBN",
                          "variant_category": "CNV",
                          "cnv_call": "Heterozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "NBN",
                          "variant_category": "CNV",
                          "cnv_call": "Homozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "NBN",
                          "variant_category": "SV"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "NBN",
                          "variant_category": "Mutation",
                          "variant_classification": "Frame_Shift_Del"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "NBN",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense and Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "NBN",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense_Mutation"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "NBN",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "NBN",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Site"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "PALB2",
                          "variant_category": "CNV",
                          "cnv_call": "Heterozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "PALB2",
                          "variant_category": "CNV",
                          "cnv_call": "Homozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "PALB2",
                          "variant_category": "SV"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "PALB2",
                          "variant_category": "Mutation",
                          "variant_classification": "Frame_Shift_Del"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "PALB2",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense and Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "PALB2",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense_Mutation"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "PALB2",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "PALB2",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Site"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RAD17",
                          "variant_category": "CNV",
                          "cnv_call": "Heterozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RAD17",
                          "variant_category": "CNV",
                          "cnv_call": "Homozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RAD17",
                          "variant_category": "SV"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RAD17",
                          "variant_category": "Mutation",
                          "variant_classification": "Frame_Shift_Del"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RAD17",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense and Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RAD17",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense_Mutation"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RAD17",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RAD17",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Site"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RAD50",
                          "variant_category": "CNV",
                          "cnv_call": "Heterozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RAD50",
                          "variant_category": "CNV",
                          "cnv_call": "Homozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RAD50",
                          "variant_category": "SV"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RAD50",
                          "variant_category": "Mutation",
                          "variant_classification": "Frame_Shift_Del"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RAD50",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense and Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RAD50",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense_Mutation"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RAD50",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RAD50",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Site"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RAD51B",
                          "variant_category": "CNV",
                          "cnv_call": "Heterozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RAD51B",
                          "variant_category": "CNV",
                          "cnv_call": "Homozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RAD51B",
                          "variant_category": "SV"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RAD51B",
                          "variant_category": "Mutation",
                          "variant_classification": "Frame_Shift_Del"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RAD51B",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense and Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RAD51B",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense_Mutation"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RAD51B",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "RAD51B",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Site"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "REV3L",
                          "variant_category": "CNV",
                          "cnv_call": "Heterozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "REV3L",
                          "variant_category": "CNV",
                          "cnv_call": "Homozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "REV3L",
                          "variant_category": "SV"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "REV3L",
                          "variant_category": "Mutation",
                          "variant_classification": "Frame_Shift_Del"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "REV3L",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense and Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "REV3L",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense_Mutation"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "REV3L",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "REV3L",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Site"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "SETD2",
                          "variant_category": "CNV",
                          "cnv_call": "Heterozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "SETD2",
                          "variant_category": "CNV",
                          "cnv_call": "Homozygous deletion"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "SETD2",
                          "variant_category": "SV"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "SETD2",
                          "variant_category": "Mutation",
                          "variant_classification": "Frame_Shift_Del"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "SETD2",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense and Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "SETD2",
                          "variant_category": "Mutation",
                          "variant_classification": "Missense_Mutation"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "SETD2",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Region"
                        }
                      },
                      {
                        "genomic": {
                          "hugo_symbol": "SETD2",
                          "variant_category": "Mutation",
                          "variant_classification": "Splice_Site"
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "and": [
                  {
                    "clinical": {
                      "age_numerical": ">=18",
                      "oncotree_primary_diagnosis": "_SOLID_"
                    }
                  }
                ]
              }
            ]
          },
          {
            "arm_code": "Module 3",
            "arm_description": "RP-3500 and Talazoparib Combination",
            "arm_internal_id": 5,
            "arm_suspended": "N",
            "dose_level": [
              {
                "level_code": "RP-3500",
                "level_description": "In Module 3, the RP-3500 starting dose will be one dose level below the highest evaluated daily dose in Module 1a and given BID for 3 days only. ",
                "level_internal_id": 5,
                "level_suspended": "N"
              },
              {
                "level_code": "Talazoparib",
                "level_description": "Patients in Module 3 will initially receive continuous talazoparib at a starting dose of 0.5 mg QD administered orally and escalating BID doses of RP-3500 on days 5, 6 and 7 of every week.",
                "level_internal_id": 6,
                "level_suspended": "N"
              }
            ],
            "match": [
              {
                "clinical": {
                  "age_numerical": ">=18",
                  "oncotree_primary_diagnosis": "_SOLID_"
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
