import {loginInterface} from "../support/interfaces/loginInterface";

export const loginCredential: loginInterface = {
  "login_group": [
    {
      "username": " ",
      "password": "ctims2023"      //blank username
    },
    {
      "username": "ctims_test_user", //blank password
      "password": " "
    },
    {
      "username": " ",               //blank username & password
      "password": " "
    },
    {
      "username": "ctims_test_user", //wrong password
      "password": "wrongPassword"
    },
    {
      "username": "ctims-john",      //wrong username
      "password": "wrongPassword"
    },
    {
      "username": "ctims-john",     //wrong username & password
      "password": "2023"
    },
    {
      "username": "ctims_test_user",  //valid username
      "password": "ctims2023"
    },
  ]
}
