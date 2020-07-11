const getDateNow = function() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    dd = dd < 10 ? `0${dd}` : dd;
    mm = mm < 10 ? `0${mm}` : mm;

    return `${yyyy}-${mm}-${dd}`;
}

export {
    getDateNow,
};