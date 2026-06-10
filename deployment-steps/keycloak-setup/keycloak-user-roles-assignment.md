# Keycloak User - Roles assignment

Before roles can be assigned, it is necessary to create the user accounts in Keycloak  for normal users and admin users for each Trial group.

Next, the user account has to be assigned  roles that were created earlier in the keycloak client “ctims”.

It is essential that a user belong to either trialgroup or trialgroup-admin role. If a user belongs to both trialgroup and trialgroup-admin role, there will be errors in CTIMS functionality.

As admin users will have more priviliges, it should be assigned with caution.

A user can be part of multiple trial groups. He requires the necessary roles in each of the trial group.

For example, A user "John" can be admin in trial group "amino" and "johncurator". He can be a regular user in trial group "paramountpharmacy".





<figure><img src="../../.gitbook/assets/Screenshot 2024-08-29 at 2.08.04 PM.png" alt=""><figcaption></figcaption></figure>
