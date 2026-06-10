# Keycloak client CTIMS role setup

### Setting up Keycloak Roles&#x20;

In keycloak, we created the  keycloak client "ctims" for the CTIMS application. This keycloak client "ctims" has a tab called Roles as shown below.&#x20;

Each trial group has to have two Roles created. By convention, a trail group called as "johngroup" has to have two roles one called as "johngroup" and "johngroup-admin".

&#x20;For each trial group there will be a few users and admins. The permissions for the users and the admins are described in Security and User Management page.&#x20;

Briefly, users who belong to a trial group role can create, edit their own trials but not the trials of other users belonging to the same trial group. Users who belong to a trial group admin role can view the trials of all the users who belong to their trial group.

For example, in a trial group called “amino”, two roles have to be created: “amino” and “amino-admin”. The users of the role “amino” will be creating the CTMLs and they will be managed by admins who belong to the role “amino-admin”. <br>

<figure><img src="https://lh7-us.googleusercontent.com/_ZpuAodxFrxVty5SArrHcnLLHCVpf7KX28b4obf1dPa_j81dHat5DW2sEEQIUmYCE68BD45eadAw-ZFxlwV8SxQZLfEYJuGklcwwIbXjTY0CXJdw0NviOO4vfvSflztzDWVVmZjdwkHhNffZ_vZLHBM" alt=""><figcaption></figcaption></figure>

<br>
