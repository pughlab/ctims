class dateClass {

  currentDate() {
    const date = new Date(); // get the current date
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // add leading zero if month is less than 10
    const day = ("0" + date.getDate()).slice(-2); // add leading zero if day is less than 10
    const formattedDate = year + '-' + month + '-' + day;
    return formattedDate
    /*date = new Date();
    //const options = {month: 'short', day: 'numeric', year: 'numeric'} //didn't use time, since test fails in 1 sec
    // difference when uploaded
    const options = {month: 'short', day: 'numeric', year: 'numeric'} //didn't use time, since test fails in 1 sec difference when uploaded

    //{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'short' };
    // @ts-ignore
    //RDS_May 4,2023.zip
    //NCT02503722_2023-05-12.json
    const formattedDate = new Intl.DateTimeFormat('en-CA', options).format(date);
    cy.log(formattedDate)
    return formattedDate*/
  }
}
export default new dateClass()
