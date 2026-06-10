---
description: Architecture of CTIMS
---

# Architecture

## Physical Architecture

CTIMS uses 3 docker containers for web, api and database. CTIMS integrates with Keycloak for security.

<figure><img src="https://lh7-us.googleusercontent.com/FbPAC3C12Znl0w6FEPXAdHWTxz8pNDcXmI-ygOLATbMYOOpX0xW2d3Igp0hE8im33-zeG6jmJ-x9tKWIbeJVDZNObpm7ceHnMHPt-laxsetXI2Mte3h5u6dXvAKF4Ynwf9vh971-pNo5Y0CId3aDvM8" alt=""><figcaption><p>CTIMS Architecture Diagram</p></figcaption></figure>



## Technical Architecture

CTIMS uses Nx Next Nest as a `monorepo`. The details about the frameworks are given below.

Nx, Next.js, Nest.js, React.js, Prisma, Typescript, Jest, Cypress, MySQL, Docker and keycloak



<br>

The frontend uses [https://primereact.org/](https://primereact.org/) and [https://github.com/rjsf-team/react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) for building the form based on the JSON specification.

\
<br>

Requirement are node, yarn, Java 8 or higher if using keycloak &#x20;

<figure><img src="https://lh7-us.googleusercontent.com/xr4rA6RsC6bYjouJ77hvSDvZBVfQnMGyFrnXOXcj6ML1nDchzjKjGshm97Wj5t47lOKXZ9sF_65szaTcNaxzNcL_gJJcRUyYlLE1heocUypcNZhAKmh94I-IGXJUn98AlSLhsz0uISq56LclezEiH8U" alt=""><figcaption><p>CTIMS framework diagram</p></figcaption></figure>

\
\
<br>
