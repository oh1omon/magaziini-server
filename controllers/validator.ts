/**
 *Methods of this class provides validation functions
 * So, every time we have a new data type to validate, we add method to this class*/
class Validator {
    /**
     * @param email string
     * @returns True if email has passed the validation and False if not*/
    email(email: string) {
        return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
            email
        )
    }

    /**
     * @param username string
     * @returns True if username is not falsy*/
    username(username: string) {
        return !!username
    }

    /**
     * @param password password string
     * @returns True if password's length more then 8*/
    password(password: string) {
        return password.length >= 8
    }
    /**
     * @param string
     * @returns True if string is not falsy and
     * False if string is actually falsy*/
    checkEmptyString(string: string) {
        return !!string
    }

    /**
     * @param signUpObj object with data to sign up employee
     * @returns True if object has passed the validation and False if have not passed*/
    singUp(signUpObj: any) {
        return !!(
            this.username(signUpObj.username) &&
            this.email(signUpObj.email) &&
            this.password(signUpObj.password)
        )
    }

    /**
     * @param signInObj object with data to sign in
     * @returns True if object has passed the validation and False if have not passed*/
    signIn(signInObj: any) {
        return !!(
            this.email(signInObj.email) && this.password(signInObj.password)
        )
    }
}

//Exporting instance of class, though nobody makes lots of them
export default new Validator()
