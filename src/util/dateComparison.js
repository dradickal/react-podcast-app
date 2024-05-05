/**
 * The year must be evenly divisible by 4;
 * If the year can also be evenly divided by 100, it is not a leap year;
 * unless... The year is also evenly divisible by 400. Then it is a leap year
 * 
 *  @param {int} year
 *  @returns {boolean}
 * 
 */
function isLeapYear(year) {
    let isLeapYear = false;
    const byFour = (year % 4) === 0;
    const byOneHundred = (year % 100) === 0;
    const byFourHundred = (year % 400) === 0;

    if(byFourHundred || (byFour && !byOneHundred)) {
        isLeapYear = true;
    }

    return isLeapYear;
};



export function timeSincePublished(timestamp, comp) {
    const compTimestamp = comp || Date.now();
    const now = new Date(compTimestamp);
    const published = new Date(timestamp);
    const diff = now - published;
    const diffDays = diff / (1000*3600*24);
    let ageString = "new";

    console.log('diff', diff);
    console.log('diffDays', diffDays);

    if (diffDays > 1 && diffDays < 29) {
        ageString = `${Math.round(diffDays)}d`
    }
    
    if (diffDays >= 29) {
        const diffMonths = (now.getMonth()+12*now.getFullYear())-(published.getMonth()+12*published.getFullYear());
        const diffYears = now.getFullYear() - published.getFullYear();

        console.log(diffMonths);

        ageString = diffMonths < 12 ? `${diffMonths}m` : `${diffYears}y`;
    }

    return ageString;
}