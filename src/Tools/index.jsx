export const validateNationalCode = (xv) => {
    if (isNaN(xv)) {
        return false;
    } else if (xv == "") {
        return false;
    } else if (xv.length < 10) {
        return false;
    } else {
        var yy = 0;
        var yv = parseInt(yv);
        for (let i = 0; i < xv.length; i++) {
            yv = xv[i] * (xv.length - i);
            yy += yv;
        }
        var x = yy % 11;
        if (x === 0) {
            // alert("your code is valid !");
            return true;
        } else {
            // alert("your code is invalid !");
            return false;
        }
        // yy = 0;
    }
}