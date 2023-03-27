export function validateUsername(username) {
    let mediumRegex = new RegExp("^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$");
    return mediumRegex.test(username) ? undefined : "The Identifier does not exist";

    // ^ - The caret symbol matches the start of the string.

    // (?=[a-zA-Z0-9._]{8,20}$) - Positive lookahead assertion that ensures the string contains only the allowed characters (letters, numbers, underscore, and period) and is between 8 and 20 characters long.

    // (?!.*[_.]{2}) - Negative lookahead assertion that ensures the string does not contain two consecutive periods or underscores.

    // [^_.].*[^_.]$ - Matches any character except period and underscore at the beginning and end of the string, and matches any number of characters in between.

    // Taken together, this regular expression matches a string that:

    // Starts with a character that is not a period or an underscore.
    // Contains only allowed characters (letters, numbers, period, and underscore) and is between 8 and 20 characters long.
    // Does not contain two consecutive periods or underscores.
    // Ends with a character that is not a period or an underscore.
}

export function validatePassword(password) {
    let errors = [];

    let lengthRegex = new RegExp("(?=.{6,})");
    let alphabetCharRegex = new RegExp("^(?=.*[a-zA-Z]).+$");
    let digitCharRegex = new RegExp("^(?=.*[0-9]).+$");
    // let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    // return mediumRegex.test(password) ?  undefined : "At least 6 characters, at least a alphabet, at least a digit";

    if ( !alphabetCharRegex.test(password))
        errors.push("Contain at least 1 alphabet character");
    if (!digitCharRegex.test(password))
        errors.push("Contain at least 1 digit")
    if ( !lengthRegex.test(password))
        errors.push("Contain at least 6 length characters");

    return errors.length ? errors : undefined;

    // ^ - The caret symbol matches the start of the string.

    // ( - Start of a capturing group.

    // ((?=.*[a-z])(?=.*[A-Z])) - Positive lookahead assertions that match if the string contains at least one lowercase letter and one uppercase letter.

    // | - Alternation operator that matches either the preceding or the following group.

    // ((?=.*[a-z])(?=.*[0-9])) - Positive lookahead assertions that match if the string contains at least one lowercase letter and one digit.

    // | - Alternation operator that matches either the preceding or the following group.

    // ((?=.*[A-Z])(?=.*[0-9])) - Positive lookahead assertions that match if the string contains at least one uppercase letter and one digit.

    // ) - End of the capturing group.

    // (?=.{6,}) - Positive lookahead assertion that matches if the string contains at least 6 characters.

    // Taken together, this regular expression matches a string that:

    // Starts at the beginning of the string.
    // Contains at least one of the following:
    // One lowercase letter and one uppercase letter
    // One lowercase letter and one digit
    // One uppercase letter and one digit
    // Contains at least 6 characters.
}

function checkUsername(username) {
    let mediumRegex = new RegExp("^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$");
    return mediumRegex.test(username) ? undefined : "The Identifier does not exist";
}

function checkPassword(password) {
    let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    return mediumRegex.test(password) ?  undefined : "The password is incorrect";
}

export function authenticate(id, password) {
    let checkID = checkUsername(id);
    if (checkID)
        return {
            name: "id",
            error: checkID,
        }
    
    let checkPass = checkPassword(password);
    return checkPass ? {name: "password", error: checkPass} : undefined;
}