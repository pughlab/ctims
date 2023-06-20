describe("API POST Test",{ testIsolation: false }, () => {
  let accesstoken= 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0VDVHc2dHLThzTl82NlNvX21kTnVwR2xQNHZ6QnVDcm9wMnJtb3Q2engwIn0.eyJleHAiOjE2ODcyMDgzNzAsImlhdCI6MTY4NzIwNzc3MCwianRpIjoiNDBlYjQ1ZmUtNDQ4ZS00MzQ2LWJiM2ItN2RlYWI0NWUzN2MwIiwiaXNzIjoiaHR0cHM6Ly9jYmlvcG9ydGFsLnBtZ2Vub21pY3MuY2EvbmV3YXV0aC9yZWFsbXMvVUhOIiwiYXVkIjpbImNicG1hbmFnZXIiLCJhY2NvdW50Il0sInN1YiI6ImVjYzJiZTU5LTFlNTktNDdjYy04MDVhLTFlMzkyZWEyY2IwMCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImN0aW1zIiwic2Vzc2lvbl9zdGF0ZSI6IjVjYTU5MDViLWIwNWMtNDBlZS04MGU3LWJiZWIzOTVkZDBjMSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy11aG4iLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiY3RpbXMiOnsicm9sZXMiOlsidGFwZXN0cnkiLCJ0cmlhbGdyb3VweCJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsInNpZCI6IjVjYTU5MDViLWIwNWMtNDBlZS04MGU3LWJiZWIzOTVkZDBjMSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkNUSU1TIFRlc3QiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJjdGltc190ZXN0X3VzZXIiLCJnaXZlbl9uYW1lIjoiQ1RJTVMiLCJmYW1pbHlfbmFtZSI6IlRlc3QiLCJlbWFpbCI6ImN0aW1zX3Rlc3RfdXNlckBjdGltcy5jYSJ9.F2cfKN9BUPTU3dqec4CGERrXr84WKVmnZPPQimuH5F3ekEPB9_tsidFBB9_UpCP9vXM-X3plSDf5Rn1xN44ALyzal_hbdbZN20hSxPDshbvFCKt1xw7aLyRtPaSOf9d6VZ-cBVih2yCrv8s9yKBjBZ2WE8KUkqxpI7TpxPzQuRHKdsaZ_nz6e-mL4GQ15R3OTBQ5V46pxL5XKxBbuSwnZv9GndLUKc5jyfSxcpGt6RwCx-PW63fmI0ce0isNSjsNQp1EIXKOTKX-hGRJZ6VFym2jhvnUB9jPHDbVyCNk7pONNlGAu7W8MOyDLd1o2ILATYJuxhQQTlbNaN2px1g8OQ'

  it('should validate the API POST endpoint result', () => {
   cy.request({
     method: 'POST',
     url: 'http://localhost:3333/api/auth/login',
     headers: {
       'Authorization': 'Bearer' +accesstoken
     },
     body:
    {
      "username": "ctims_test_user",
      "password": "ctims2023"
    }
   }).then((res) => {
     expect(res.status).to.eq(201)
     expect(res.body.user.id).to.eq(1)
     expect(res.body.user.username).to.eq('ctims_test_user')
   })
  });
});
