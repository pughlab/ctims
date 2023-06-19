/*
describe("DB Test", () => {
  it('should ', () => {
    cy.task(
      "queryDb",
      `SELECT e.id        AS event_id,
              t.id        AS trial_id,
              t.nct_id    AS trial_nct_id,
              u.username  AS user_name,
              t.userId    AS trial_user,
              e.type      AS event_type,
              e.timestamp AS event_timestamp,
              e.metadata  AS event_metadata
       FROM event e
              JOIN trial t ON t.id = e.trialId
              JOIN user u ON u.id = t.userId
       WHERE type = 'TrialRead'`
    ).then(count => {
      expect(count).to.have.lengthOf(1);
    });
  })
})
*/
describe("DB Test",{ testIsolation: false }, () => {
  it('should validate the query result', () => {
   // cy.task("queryDb", "SELECT * FROM user WHERE id = 1").then((results: any[]) => {
    cy.task("queryDb", "SELECT email, first_name, last_name FROM user WHERE id = 1;").then((results: any[]) => {
      cy.log(JSON.stringify(results))
      results.forEach((row) => {
        cy.log(JSON.stringify(row));
      });
    })

  });
});

/*cy.task("queryDb", { query }).then(result => {
      expect(result).to.have.lengthOf(1);
       })*/
/*cy.request({
  url: 'https://localhost:3000/api/users',
  rejectUnauthorized: false}).then((res) => {
  cy.task("getDBDataSync").then((resArr) => {
    expect(res.body.user.length).to.eq(resArr)
  })
})*/
 /* const query = `SELECT * from user`;

    cy.task("queryDb", { query }).then(result => {
      //expect(result).to.have.lengthOf(1);*/
   // });

