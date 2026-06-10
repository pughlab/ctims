---
description: >-
  CTIMS Editor enables abstraction of matching criteria into a standardized,
  machine-readable file: Clinical Trial Markup Language (CTML)
---

# CTIMS Editor

Clinical trial details are organized in 9 distinct sections:

1. Trial Information&#x20;
2. Prior Treatment Requirements&#x20;
3. Age
4. Drug List
5. Management Group List
6. Site List
7. Sponsor List
8. Staff List
9. Treatment List

Each section contains fields that should be completed based on the clinical trial protocol. Mandatory fields are required to ensure CTMLs fulfil the minimum requirement to be run through the CTIMS Matcher.

{% hint style="info" %}
Tip: Use the left menu to quickly navigate to the desired section.
{% endhint %}

{% hint style="info" %}
Tip: Hover over the question mark icon for field descriptions.
{% endhint %}

### Save

Users must click the ‘Save’ button to ensure clinical trial details are not lost. &#x20;

{% hint style="info" %}
Tip: Save periodically to ensure unsaved details are not lost. &#x20;
{% endhint %}

### Matching criteria

Match criteria is built in the Trial Information section and used to build complex clinical and genomic criteria outlined in the clinical trial protocol.

Once CTMLs are completed and all mandatory fields are input into the CTIMS Editor, users can validate, export, and send CTML to Matcher (depending on the user role associated to the account).

### Export

Trial group administrators can click the ‘Export’ button to automatically convert clinical trial details into a CTML in JSON or YAML format. The file of choice will be generated and downloaded to local storage.

{% hint style="warning" %}
All mandatory fields must be complete to export CTML file. If any mandatory fields are incomplete, the Export modal will flag missing fields within a distinct section. User can export CTML only when all mandatory fields are complete.
{% endhint %}

### Validate

Trial group members can click the ‘Validate’ button to flag missing fields within a distinct section.

### Send CTML to Matcher

Trial group administrators can click the ‘Send CTML to Matcher’ button to automatically load the CTML into the CTIMS Matcher. &#x20;

Once in the CTIMS Matcher, the CTML will be run against clinical and genomic data and identify patients that match to each arm within the clinical trial. &#x20;

Match results can be found in the ‘Results’ tab. CTMLs awaiting match results will display ‘PENDING’ in the Match status column.&#x20;

{% hint style="info" %}
Tip: It is recommended that all mandatory fields are complete before sending CTML to the Match to optimize match results. &#x20;
{% endhint %}
