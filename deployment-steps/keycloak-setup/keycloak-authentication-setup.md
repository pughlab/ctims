# Keycloak authentication setup

## Keycloak authentication setup

CTIMS can use a local desktop Keycloak instance or an institutional Keycloak instance.\
Configure the keycloak as shown in the below images.<br>

### Setting up Keycloak Realm

Keycloak comes with a default realm.

It is ideal to create a new realm named after \<username> or \<institution> name.

<br>

<div align="left"><figure><img src="https://lh7-us.googleusercontent.com/hCKxs0BmlwcgaiMFk_tVv3TYuCvV34eEzVcyLPbfNCukBVx5K1a3daf9Bgzki5q71m4bIPZRCEgbN5SWACVNn8L84pUn-rNYsTrSRJdcsjlVfQiekqKjKQGmaz_yku9aE0DKj0VIaLOZzv_sG6gsQkU" alt=""><figcaption></figcaption></figure></div>

<figure><img src="https://lh7-us.googleusercontent.com/IXR9H2i37mSDVPUhjUxyPtvOPaWxaKoXXLdi2LWAbYn2LkkJAEaGbvOw7s58M09E2yiu1C9q8HGYJ7fGbrtiXkooxL7kXV961Awa5V5XmX1d-5e72t2qljlC8vWnCUz_wIXWvNcEZladpN6IdH4EDYI" alt=""><figcaption></figcaption></figure>

\
\
<br>

<figure><img src="https://lh7-us.googleusercontent.com/z354PX6bFhb2hGroFV2tzADKw524z97w7BHoGyDh_aMbiKir7h_seJ30uymAWVI-YipPxOEYk2YnKZkE8FBiQCHrx7pisXiWC5edhfUUqbcJNLQgpYD6S9m_TzHgHfQJGEnu7Ru6hzo-Wmu_p-gUhdE" alt=""><figcaption></figcaption></figure>

### Setting up Keycloak Client  called "ctims"

<br>

Setup a new client called ctims in keycloak. This is the client to be created for CTIMS application. Setup a second client called ctimsadmin in keycloak. This client requires service account permissions.

<br>

<figure><img src="https://lh7-us.googleusercontent.com/WvF0tcHY196LQQa0sd4Z2nHEDmIA5yzPqZ4_3JhM9sgNfPd7sNoYbucxeWRMYPkYiNY5ENzvo5vhDj5BXUNTqh_3H7O0KKHi4NI6nNDjD8AU-R36_XyjrL5mygCUhKActCLUiGt37ZIYWwhdbM3DGgI" alt=""><figcaption></figcaption></figure>

<br>

Setup the ctims client with various values as shown below.

\
<br>

<figure><img src="https://lh7-us.googleusercontent.com/_4rymBLa19wbiQF8ndnnIHyLPFxLC-6oIExR4ZozdmZnvsyoy26V9AcdO2nwStZ_2h1G1VJM27BuxudPJplcFLoEABaL4wi38YPAemxb-qTp8F6Non4R9mIsX1KLH1TTpn900DrEAPftDRv8tddslIQ" alt=""><figcaption></figcaption></figure>

\
\
<br>

<figure><img src="https://lh7-us.googleusercontent.com/CA-eS9qFZsv2wDt2IVVDpA_04H1OOYE6BdrUaE0jGbwWmVPHjFNUkGS1aMEgARFyN3SSPrbOQk8C2rWVgoR6EUhAGuFopXV1aZ1usw0oLPPq0UX3rg8mCx0xYDK-kOUUAcFjjnnfbcceXzBbfcv6egw" alt=""><figcaption></figcaption></figure>

<figure><img src="https://lh7-us.googleusercontent.com/sB5shKdeUMdZXjIx_avjkXQGDQvkKQAf4WWSwtnljnNE5OwQF1lJzF2OvLJqtB7BRTsPWPbeZ__2zIjiHspLMAamc-h32KocY-aHKtTVuuutmimQfSq0pKw0f0NcxrwnrQHaeaY2n7JVwx3pqNI2akM" alt=""><figcaption></figcaption></figure>

<br>

Root URL, Admin URL and policy URL have to be the keycloak URL .

Example - [http://localhost:8843/auth/\*](http://localhost:8843/auth/*)

Advanced settings for timeouts

<figure><img src="https://lh7-us.googleusercontent.com/7iKrtsqLRp4wbbkUTAA0mAJpukdE0AeNpKuIAhcxG6xo5y_XWO-c-zPq4opjBcUmEkH78bRQW94heaVPFl0cbsQKCRitz079HZayFwK3MIiftzmX8pQGXTlGMDWFYy_9XQJi_Yba_1z5Y5DghUyIlsA" alt=""><figcaption></figcaption></figure>

<br>

### Setting up Keycloak Client  called "ctimsadmin"

Setup a second client called ctimsadmin in keycloak. This client requires service account permissions.

<figure><img src="../../.gitbook/assets/Screenshot 2024-05-27 at 11.18.03 PM.png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../.gitbook/assets/Screenshot 2024-05-27 at 11.18.16 PM (1).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../.gitbook/assets/Screenshot 2024-05-27 at 11.18.26 PM.png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../.gitbook/assets/Screenshot 2024-05-27 at 11.18.48 PM.png" alt=""><figcaption></figcaption></figure>

### Adding service account roles for Keycloak client "ctimsadmin"

In Service Account Roles Tab, add realm-admin role from realm-management as shown below.

<figure><img src="https://lh7-us.googleusercontent.com/Ew1aTRX6P5zn9ffhPBSmHCINPWQm7c2nE9zy8cF4bw2mNh4Q9sIDUY2lZkniOwz4iXi346CxolegKQ9aRC1lW5sk20xhIMxNSzDISm1_KnsUBidO8nO_Mpst0RM9vF8mgKm2nsGlkQq8y5-gb8tzpDU" alt=""><figcaption></figcaption></figure>

### Saving UUID of the two clients ctims and ctimsadmin

The UUID of the two clients ctims and ctimsadmin have to be copied and retained for later use.

<figure><img src="https://lh7-us.googleusercontent.com/eZptEmcfTZNWoghZq_Nm1gufyQ5lUuWZRp89zXBrvtrknoYDJyDwOE-opr7E-Gj6ydBv9atpqE997WbRb4VhLoRNd-9371DMumXNZ1gpCtizRhMuDjtfm0sGyRLWRHZaFJfPG7PjOdAW41Wuircw4e4" alt=""><figcaption></figcaption></figure>

### Saving Client secret of the two clients ctims and ctimsadmin

The Credentials tab will show up after Client  is enabled and saved. In the Credentals tab, the client secret field will be visible.

The client secret of the two clients ctims and ctimsadmin have to be copied and retained for later use.

<figure><img src="../../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>



