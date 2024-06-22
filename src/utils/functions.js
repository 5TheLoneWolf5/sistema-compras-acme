const testZero = (num) => {

    return num < 10 ? "0"+num : num;

};

export function convertToUnix(date) {

    // console.log("UNIX: " + date);
    // console.log("UNIX: " + Date.parse(Number(date)) / 1000);
    return Date.parse(date) / 1000;

}; // Used to upload to database.

export function formatDate(date) {
    
    // console.log(date);
    const unixTime = new Date(date * 1000);
    // console.log(unixTime, "!UNIX!");

    const year = unixTime.getFullYear();
    const month = testZero(unixTime.getMonth() + 1);
    const day = testZero(unixTime.getDate());
    
    const hour = testZero(unixTime.getHours());
    const minutes = testZero(unixTime.getMinutes());
    const seconds = testZero(unixTime.getSeconds());

    // return String(unixTime);
    // console.log(`${unixTime.getFullYear()}-${unixTime.getMonth() + 1}-${unixTime.getDate()} ${unixTime.getHours()}:${unixTime.getMinutes()}:${unixTime.getSeconds()}`);
    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;

}; // Used to display to end user.