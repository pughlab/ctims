function keycloak_disabled_comfig(role: string) {

    const envUsername = adminStatus(role) ? process.env.KD_USERNAME_ADMIN : process.env.KD_USERNAME;
    const envTrialGroup = adminStatus(role) ? process.env.KD_TRIALGROUP_ADMIN : process.env.KD_TRIALGROUP;
    const envKeycloakId = adminStatus(role) ? process.env.KD_KEYCLOAK_ID_ADMIN : process.env.KD_KEYCLOAK_ID;
    const envEmail = adminStatus(role) ? process.env.KD_EMAIL_ADMIN : process.env.KD_EMAIL
    const envFullName = adminStatus(role) ? process.env.KD_FULLNAME_ADMIN : process.env.KD_FULLNAME;
    const roles = envTrialGroup;
    const userId = adminStatus(role) ? 100 : 99;

    const user = {
        id: userId,
        email: envEmail,
        name: envFullName,
        username: envUsername,
        first_name: envUsername,
        email_verified: true,
        last_name: '',
        keycloak_id: envKeycloakId,
        createdAt: "",
        updatedAt: "",
        roles: [roles]
    }
    return user;
}
function keycloak_disabled_fetch_by_KeycloakId(role: string) {

    const envUsername = adminStatus(role) ? process.env.KD_USERNAME_ADMIN : process.env.KD_USERNAME;
    const envTrialGroup = adminStatus(role) ? process.env.KD_TRIALGROUP_ADMIN : process.env.KD_TRIALGROUP;
    const envKeycloakId = adminStatus(role) ? process.env.KD_KEYCLOAK_ID_ADMIN : process.env.KD_KEYCLOAK_ID;
    const envEmail = adminStatus(role) ? process.env.KD_EMAIL_ADMIN : process.env.KD_EMAIL
    const envFullName = adminStatus(role) ? process.env.KD_FULLNAME_ADMIN : process.env.KD_FULLNAME;
    const roles = envTrialGroup;

    const user = {
        id: envKeycloakId,
        email: envEmail,
        name: envFullName,
        username: envUsername,
        first_name: envUsername,
        email_verified: true,
        last_name: '',
        keycloak_id: envKeycloakId,
        createdAt: "",
        updatedAt: "",
        roles: [roles]
    }
    return user;
}
function adminStatus(role: string){
    return (role=="admin") ? true : false;
}
export { keycloak_disabled_comfig, keycloak_disabled_fetch_by_KeycloakId, adminStatus};

