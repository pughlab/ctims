# Trials and Trial Groups

{% hint style="info" %}
A <mark style="color:blue;">Trial</mark> refers to a clinical trial. As defined in clinicaltrials.gov, clinical trials are research studies in which researchers assign participants to get one or more interventions to test what happens in people.&#x20;
{% endhint %}

In CTIMS, a trial's eligibility criteria can be represented using the Clinical Trial Markup Language a.k.a. CTML format and saved in two different formats, yaml or JSON format.



{% hint style="info" %}
CTIMS defines a "<mark style="color:orange;">Trial Group</mark>" as a bunch of trials that are grouped together. They can be grouped based on the Principal Investigator (PI), the Pharma company, the curator, or any grouping to manage trials.
{% endhint %}

* &#x20;Example Trial Groups names:
  * “DrSmithgroup”
  * “ParamountPharmaGroup”
  * “JohnCuratorGroup” &#x20;

The trial group names used in CTIMS aides in trial management along with user management through Keycloak, as described in the [Security and User management](../security-and-user-management.md) section.
