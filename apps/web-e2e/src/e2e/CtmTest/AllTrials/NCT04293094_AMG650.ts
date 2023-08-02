import {Amg650Interface} from "./AMG650Interface";

export const NCT04293094_AMG650: Amg650Interface =
  {
    "age": "Adult",
    "drug_list": {
      "drug": [
        {
          "drug_name": "AMG 650"
        }
      ]
    },
    "last_updated": "July 16, 2021",
    "long_title": "A Phase 1, Multicenter, Open-label, Dose-Exploration and Dose-Expansion Study Evaluating the Safety, Tolerability, Pharmacokinetics, and Efficacy of AMG 650 in Subjects With Advanced Solid Tumors",
    "management_group_list": {
      "management_group": [
        {
          "is_primary": "Y",
          "management_group_name": "Princess Margaret Cancer Centre"
        },
        {
          "is_primary": "Y",
          "management_group_name": "Cross Cancer Institute"
        }
      ]
    },
    "match": [
      {
        "clinical": {
          "disease_status": [
            "Advanced Solid Tumors"
          ]
        }
      }
    ],
    "nct_id": "NCT04293094",
    "nct_purpose": "To evaluate the safety and tolerability of AMG 650 in adult participants and to determine the maximum tolerated dose (MTD) and/or recommended phase 2 dose (RP2D).",
    "phase": "I",
    "prior_treatment_requirements": [
      "Male and female ≥ 18 years old",
      "Triple Negative Breast Cancer participants only: Participant must have histologically or cytologically confirmed metastatic or locally recurrent estrogen receptor (ER)-negative (<1% by immunohistochemistry [IHC]), progesterone receptor (PR)-negative (<1% IHC) and human epidermal growth factor receptor 2 (Her2)-negative (either fluorescent in situ hybridisation [FISH] negative, 0 or 1+ by IHC, or IHC2+ and FISH negative per ASCO/CAP definition) breast cancer. Participant must be relapsed/refractory to at least one line of systemic chemotherapy in the metastatic setting or intolerant of existing therapy(ies) known to provide clinical benefit for their condition. Prior exposure to an immune checkpoint inhibitor is allowed.",
      "Platinum-Resistant High Grade Serous Ovarian Cancer, primary peritoneal cancer and/or fallopian-tube cancer participants only: Participant must have histologically or cytologically confirmed diagnosis of metastatic or unresectable high grade serous ovarian cancer, with platinum-resistance defined as progression during or within 6 months of a platinum-containing regimen. Prior exposure to platinum-resistant recurrence therapy is allowed.",
      "Serous Endometrial Cancer participants only (Dose Exploration only): Participant must have histologically or cytologically confirmed diagnosis of metastatic or recurrent serous endometrial cancer, and be relapsed/refractory to at least one line of systemic therapy in the metastatic/recurrent setting or intolerant of existing therapy(ies) known to provide clinical benefit for their condition.",
      "Participants with advanced or metastatic solid tumor with TP53MUT (Dose Exploration only, as assessed by local testing) that is unresectable and relapsed/refractory to at least one line of systemic chemotherapy or intolerant."
    ],
    "protocol_no": 20190131,
    "short_title": "Study of AMG 650 in Adult Participants With Advanced Solid Tumors",
    "site_list": {
      "site": [
        {
          "coordinating_center": "Y",
          "site_name": "Princess Margaret Cancer Centre",
          "site_status": "Open to Accrual",
          "uses_cancer_center_irb": "Y"
        },
        {
          "coordinating_center": "Y",
          "site_name": "Cross Cancer Institute",
          "site_status": "Open to Accrual",
          "uses_cancer_center_irb": "Y"
        }
      ]
    },
    "sponsor_list": {
      "sponsor": [
        {
          "is_principal_sponsor": "Y",
          "sponsor_name": "Amgen"
        }
      ]
    },
    "staff_list": {
      "protocol_staff": [
        {
          "email_address": "Philippe.Bedard@uhn.ca",
          "first_name": "Philippe",
          "institution_name": "Princess Margaret Cancer Centre",
          "last_name": "Bedard",
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
              "arm_code": "Dose Exploration Phase",
              "arm_description": "Participants will receive AMG 650 in 1 of 3 alternative schedules. The maximum tolerated dose (MTD) of each schedule will be estimated using isotonic regression (Ji et al, 2010). The Recommended Phase 2 Dose (RP2D) may be identified based on emerging safety, efficacy, and pharmacodynamics (PD) data prior to reaching an MTD.",
              "arm_internal_id": 1,
              "arm_suspended": "N",
              "dose_level": [
                {
                  "level_code": "AMG 650",
                  "level_description": "AMG 650 administered orally as a tablet.",
                  "level_internal_id": 1,
                  "level_suspended": "N"
                }
              ],
              "match": [
                {
                  "or": [
                    {
                      "genomic": {
                        "hugo_symbol": "TP53",
                        "variant_category": "Mutation"
                      }
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
                  "and": [
                    {
                      "or": [
                        {
                          "clinical": {
                            "age_numerical": ">=18",
                            "oncotree_primary_diagnosis": "Invasive Breast Carcinoma",
                            "her2_status": "false",
                            "er_status": "false",
                            "pr_status": "false"
                          }
                        },
                        {
                          "clinical": {
                            "age_numerical": ">=18",
                            "oncotree_primary_diagnosis": "High-Grade Serous Ovarian Cancer"
                          }
                        },
                        {
                          "clinical": {
                            "age_numerical": ">=18",
                            "oncotree_primary_diagnosis": "Uterine Serous Carcinoma/Uterine Papillary Serous Carcinoma"
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "arm_code": "Dose Expansion Phase Group 1: TNBC",
              "arm_description": "Participants with locally advanced or metastatic triple negative breast cancer (TNBC), will be administered with the preliminary RP2D identified from the dose exploration part of the study.",
              "arm_internal_id": 2,
              "arm_suspended": "N",
              "dose_level": [
                {
                  "level_code": "AMG 650",
                  "level_description": "AMG 650 administered orally as a tablet.",
                  "level_internal_id": 2,
                  "level_suspended": "N"
                }
              ],
              "match": [
                {
                  "clinical": {
                    "age_numerical": ">=18",
                    "oncotree_primary_diagnosis": "Invasive Breast Carcinoma",
                    "her2_status": "false",
                    "er_status": "false",
                    "pr_status": "false"
                  }
                }
              ]
            },
            {
              "arm_code": "Dose Expansion Phase Group 2: HGSOC",
              "arm_description": "Participants with locally advanced or metastatic high grade serous ovarian cancer (HGSOC), will be administered with the preliminary RP2D identified from the dose exploration part of the study.",
              "arm_internal_id": 3,
              "arm_suspended": "N",
              "dose_level": [
                {
                  "level_code": "AMG 650",
                  "level_description": "AMG 650 administered orally as a tablet.",
                  "level_internal_id": 3,
                  "level_suspended": "N"
                }
              ],
              "match": [
                {
                  "clinical": {
                    "age_numerical": ">=18",
                    "oncotree_primary_diagnosis": "High-Grade Serous Ovarian Cancer"
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  }
