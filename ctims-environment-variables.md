---
description: >-
  CTIMS depends on many environment variable for its configuration. They are
  stored in the .env file. The same .env file is used for both frontend and
  backend containers
---

# CTIMS Environment variables

## Environment variables for CTIMS Backend

\#Matchminer MySql database URL

DATABASE\_URL=mysql://ctims:ctims@localhost:3306/ctims

KEYCLOAK\_URL=http://localhost:4000/auth

KEYCLOAK\_CLIENT\_ID=ctims

\# Keycloak client uuid. This is different from the id above.

\# If you cannot find it in the client settings, the URL usually includes it. Example: http://localhost:8080/admin/master/console/#/ctims/clients/4565411a-\*\*\*/settings, 3813811a-\*\*\* is the uuid

KEYCLOAK\_CLIENT\_UUID=d654ed51-7032-4389-8811-4d588d3181be

\# new  realm created for CTIMS

KEYCLOAK\_REALM=Ctimsorg

\# This is the client secret that stored under the Credentials tab in the client page.

\# The realm needs to have client authentication enabled to see the Credentials tab.

KEYCLOAK\_CLIENT\_SECRET=TRlkjl987PmBPjr3wxyJcROIRCDsBFF

\# ctimsadmin client with service account enabled

\# It does not need to be a separate client. If ctims client already has service account enabled, use the same ID here.

KEYCLOAK\_ADMIN\_CLIENT\_ID=ctimsadmin

KEYCLOAK\_ADMIN\_CLIENT\_SECRET=Plkjlkj988nMwqfzZhLmqErM4LeGbVbK6

\
\# This is the keycloak endpoint to get access token.

KEYCLOAK\_TOKEN\_ENDPOINT=http://localhost:4000/auth/realms/Ctimsorg/protocol/openid-connect/token

\#if CTIMS is integrated with Matchminer then it can communicate with Matchminer API&#x20;

MM\_API\_URL=http://localhost:5001/api

MM\_API\_TOKEN=r6ufuf6g-40ce-47b9-85f5-10e99f3043b5

\#PRISMA key for saving CTML to Matchminer Mysql database

PRISMA\_FIELD\_ENCRYPTION\_KEY=k1.aesgcm256.KJHKJ989089l5OKXUYQosqNLMRK1Nc3PicRp5iWa6I7Ko=

CTIMS\_ENV=development

CTIMS\_API\_VERSION=2.1

\
\#if CTIMS is integrated with Matchminer then it can send CTMLs to Matchminer using Rabbit MQ<br>

RABBITMQ\_URL='localhost'

RABBITMQ\_PORT=5672

MATCHMINER\_SEND\_QUEUE='run\_match'

MATCHMINER\_RECEIVE\_QUEUE='match\_message'

## Environment variables for  CTIMS Frontend

\#Backend API URL

REACT\_APP\_API\_URL=http://localhost:3333/api

NEXTAUTH\_API\_URL=http://localhost:3333/api

\#Frontend URL

NEXTAUTH\_URL=http://localhost:3000

NEXT\_PUBLIC\_SIGNOUT\_REDIRECT\_URL=http://localhost:3000
