---
description: >-
  Improve efficiencies. Accelerate cancer research. Match patients to clinical
  trials.
---

# CTIMS User Manual

## Introduction

The CTIMS project is the winner of the 2022-23 Princess Margaret Grand Challenge. The Grand Challenge competition offers support from the CDI program in front-end and back-end development, data science, design, and project management. &#x20;

Winning projects are selected based on their alignment with CDI priorities, contribution to the PM community, feasibility, and impact.&#x20;

## Overview

Nearly 25% of patients diagnosed with cancer at Princess Margaret Cancer Center are matched to clinical trials and play an important role in scientific discovery. The process to match patients to clinical trials is highly manual, enormously time consuming, and prone to error. &#x20;

Matching patients to clinical trials is a highly manual and time consuming process – taking anywhere between 2 hours and 4 weeks to complete. This is often an iterative process and can lead to further delays.&#x20;

**CTIMS aims to**:&#x20;

* Match eligible patients to clinical trials using automation&#x20;
* Decrease the time and resources required to find eligible study patients​&#x20;
* Support complex matching criteria using all aspects of a patient’s digital fingerprint ​&#x20;
* Create a scalable and responsive system to support clinical trials​&#x20;

### Workflow:&#x20;

The CTIMS workflow comprises of 4 components: &#x20;

1. CTIMS Assembler: Prepares patient data (clinical and genomic) from UHN’s cBioPortal.&#x20;
2. CTIMS Editor: User-friendly tool to build clinical trial criteria and automatically convert into a called [Clinical Trial Markup Language (CTML)](https://matchminer.org/#ctml)&#x20;
3. CTIMS Matcher: Generates patient-trial matches using [The MatchEngine](https://matchminer.org/) &#x20;
4. CTIMS Trial Viewer: Presents match results&#x20;



<figure><img src="../../.gitbook/assets/CTIMS Workflow 0.2.png" alt=""><figcaption><p>CTMIS Workflow diagram of the four different components</p></figcaption></figure>
