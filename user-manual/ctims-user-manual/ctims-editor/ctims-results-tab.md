# CTIMS Results Tab

CTMLs with match results can be found in the Results tab. CTMLs with match results will update to ‘MATCHED’ in the Match status column. To view match results, click the Results tab.&#x20;

## Results Dashboard

<figure><img src="../../../.gitbook/assets/Screenshot 2024-07-25 at 1.12.03 PM.png" alt=""><figcaption></figcaption></figure>



The Results table will display the following details: &#x20;

* <mark style="background-color:blue;">**ID**</mark>: Unique identifier for the trial &#x20;
* <mark style="background-color:blue;">**Nickname**</mark>: Unique name to easily identify the CTML&#x20;
* <mark style="background-color:blue;">**Principal Investigator**</mark>: Name of the trial’s principal investigator&#x20;
* <mark style="background-color:blue;">**Created on**</mark>: Date CTML was created and the account creator&#x20;
* <mark style="background-color:blue;">**Modified on**</mark>: Date CTML was last modified and the account last modified&#x20;
* <mark style="background-color:blue;">**Match Status**</mark>: Displays if CTML is pending or matched&#x20;
* <mark style="background-color:blue;">**Match Results**</mark>: Unique patient count&#x20;
* <mark style="background-color:blue;">**Match Date**</mark>: Date of the latest match result&#x20;
* <mark style="background-color:blue;">**Download**</mark>: CSV file detailing patient-trial matches&#x20;

Click the Download icon to download and explore patient-trial matches.&#x20;

## Results file

The downloaded file is a CSV file. The filename consists of the unique trial identifier provided and the date downloaded. The data within the results file are pulled from the clinical, genomic and CTML file created. If there is a value that means that was the value that was matched

The type of data contained in the match results file are the following:

* **Trial ID**: The trial identifier provided by the user when the CTML was created.
* **Nickname**: The unique name given to the clinical trial for the CTML
* **Short Title**: The short title of the clinical trial
* **Trial Match Date**: The date the trial matching was executing on
* **Step Number**: The step of the trial, an integer value
* **Arm Code**: The name of the arm
* **Arm Number**: The arm number associated with the name of the arm, an integer value
* **Study ID**: The unique identifier for the study used for matching
* **Patient ID**: The patient identifier within the study
* **Sample ID**: The sample identifier of the patient within the study
* **Vital Status**: The vital status of the patient ie Alive or Deceased
* **Gender**: The gender of the patient
* **Age**: The age of the patient
* **Diagnosis**: The oncotree cancer type diagnosis of the patient
* **HER2 Status**: Human Epidermal Growth Factor Receptor 2 (HER2) status. Values are either Negative or Positive
* **ER Status**: Estrogen Receptor (ER) status. Values are either Negative or Positive
* **PR Status**: Progesterone Receptor (PR) status. Values are either Negative or Positive
* **Prior Treatment Agent**: Drug name matched
* **Genomic Alteration**: The gene name and protein change/type of alteration ie Structural variation/ Mutation/ High level amplification
* **Hugo Symbol**: The gene symbol matched on
* **Mutation Effect**: The value from the genomic data from the mutation data ie Gain-of-function, Likely Gain-of-function, Loss-of-function, Likely Loss-of-function, Switch-of-function, Likely Switch-of-function, Neutral, Likely Neutral, Inconclusive, Unknown
* **True Variant Classification**: The variant classification matched on from the genomic data from the mutation data
* **Variant Category**: The type of alteration matched on from the genomic data collection
* **Left Partner Gene**: A partner gene in a fusion/structural variation, any valid HUGO symbol. Data from the structural variant data
* **Right Partner Gene**: A partner gene in a fusion/structural variation, any valid HUGO symbol. Data from the structural variant data
* **CNV Call**: The type of copy number variation. Terms/values (Heterozygous deletion, Homozygous deletion, Gain, High level amplification) should be matched/mapped in a configuration
* **MS Status**: Microsatellite Stability Status. Values: MSI-H, MSI-L, or MSS.
* **Match Type**: What did the patient match on. Values: prior\_treatment, gene, diagnosis
* **Patient Match Values**: A list of the fields and values the patient matched on e.g., {'oncotree\_primary\_diagnosis\_name': 'Oropharynx Squamous Cell Carcinoma', 'age': 60, 'treatment\_category': 'Medical Therapy', 'agent': 'Pembrolizumab'}
* **Oncotree Primary Diagnosis Match Value**: The oncotree cancer type name the patient matched on
* **Match Criteria**: The match criteria
* **Queries Used**: The criteria used in matching
