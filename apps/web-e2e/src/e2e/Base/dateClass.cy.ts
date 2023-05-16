class dateClass {

  currentDate() {
    const date = new Date(); // get the current date
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // add leading zero if month is less than 10
    const day = ("0" + date.getDate()).slice(-2); // add leading zero if day is less than 10
    const formattedDate = year + '-' + month + '-' + day;
    return formattedDate
  }
}
export default new dateClass()
