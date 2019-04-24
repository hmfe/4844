const getTimestamp = () => {
    const formatSingleDigit = (digit) => { 
        if ( digit < 10 ) {
        return digit = '0' + digit;
        } else {
        return digit;
        }
    }

    const today = new Date();
    const yyyy = today.getFullYear();
    let dd = formatSingleDigit(today.getDate());
    let mm = formatSingleDigit(today.getMonth() + 1);
    let hh = formatSingleDigit(today.getHours());
    let ss = formatSingleDigit(today.getMinutes());

    const fullDate = `${yyyy}-${mm}-${dd} ${hh}:${ss}`;
        
    return fullDate;
}

export { getTimestamp }