# Security & User Management

## Authentication&#x20;

CTIMS uses keycloak technology to authenticate UHN staff at sign in and leverages UHN’s active directory. Therefore, you must use an active UHN email and password to successfully sign to CTIMS. &#x20;

{% hint style="warning" %}
Please note, you must be connected UHN’s Network/VPN to access the CTIMS Sign in page.&#x20;
{% endhint %}

## System Timeouts&#x20;

After 14 minutes of inactivity, the CTIMS application will display a system timeout countdown and sign out of CTIMS at 15 minutes of inactivity. &#x20;

{% hint style="danger" %}
Please note, any unsaved CTML details will be lost at system timeout. &#x20;
{% endhint %}

## User Management

CTIMS requires all accounts to be registered. Accounts not registered to CTIMS are unauthorized and will not be able to access the application. All accounts must be registered with a trial group and user role.&#x20;

1. **Trial group**: A group that consists of multiple accounts and shares access to CTMLs created within the group. &#x20;
   * Accounts registered under the same trial group will have access to a trials table. The trials table displays all CTMLs created within the trial group. &#x20;
2. **User role**: Accounts within a trial group are assigned one of 2 types user roles: Administrator and Member.
   * Administrators can create, view, edit, save, and delete ALL CTMLs created within a trial group.&#x20;
   * Members can create and manage (edit, save, delete) CTMLs they create and view (read-only) CTMLs created by other trial group members.&#x20;

{% hint style="warning" %}
Please note: A single account can be registered to multiple trial groups with varying permissioned access. Contact the CTIMS team at cbioportal\_group@uhnresearch.ca to register your account.
{% endhint %}

See below for a list of functionalities by role:

<figure><img src="../../.gitbook/assets/User Management Table.png" alt=""><figcaption><p>CTIMS user account and roles</p></figcaption></figure>
