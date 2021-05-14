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
	name(username: string) {
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
	checkString(string: string) {
		return !!string
	}

	/**
	 * @param number
	 * @returns True if number is actually number and
	 * False if number is not number(NaN is number anyway :(*/
	checkNumber(number: number) {
		return !!(typeof number === 'number')
	}

	/**
	 * @param signUpObj object with data to sign up employee
	 * @returns True if object has passed the validation and False if have not passed*/
	singUp(signUpObj: any) {
		return !!(this.name(signUpObj.name) && this.email(signUpObj.email) && this.password(signUpObj.password))
	}

	/**
	 * @param signInObj object with data to sign in
	 * @returns True if object has passed the validation and False if have not passed*/
	signIn(signInObj: any) {
		return !!(this.email(signInObj.email) && this.password(signInObj.password))
	}

	createItem(item: any) {
		return !!this.checkString(item.name) && !!this.checkString(item.description) && !!this.checkString(item.price)
	}

	/**
	 *
	 * @param updateObj
	 * @returns checked object ready for next work
	 */
	updateUser(updateObj: any) {
		let resObj: any = {}
		if (typeof updateObj.password === 'string') resObj.password = updateObj.password
		if (typeof updateObj.name === 'string') resObj.name = updateObj.name
		if (typeof updateObj.street === 'string') resObj.street = updateObj.street
		if (typeof updateObj.city === 'string') resObj.city = updateObj.city
		if (typeof updateObj.country === 'string') resObj.country = updateObj.country
		if (resObj.favorites) resObj.favorites = updateObj.favorites
		if (resObj.orders) resObj.orders = updateObj.orders
		return resObj
	}

	/**
	 *
	 * @param orderObj
	 * @returns True if object has passed the validation and False if have not passed
	 */
	createOrder(orderObj: any) {
		return !!this.objectId(orderObj.itemId) && !!this.checkString(orderObj.size)
	}

	/**
	 *
	 * @param itemObj
	 * @returns True if object has passed the validation and False if have not passed
	 */
	updateItem(itemObj: any) {
		let resObj: any = {}
		if (typeof itemObj.name === 'string') resObj.name = itemObj.name
		if (typeof itemObj.description === 'string') resObj.description = itemObj.description
		if (typeof itemObj.sex === 'string') resObj.sex = itemObj.sex
		if (typeof itemObj.image === 'string') resObj.image = itemObj.image
		if (typeof itemObj.color === 'string') resObj.color = itemObj.color
		if (typeof itemObj.season === 'string') resObj.season = itemObj.season
		if (typeof itemObj.inStock === 'number') resObj.inStock = itemObj.inStock
		if (typeof itemObj.price === 'number') resObj.price = itemObj.price
		return resObj
	}
	objectId(id: string) {
		if (typeof id === 'string') {
			return !!id.match(/^[0-9a-fA-F]{24}$/)
		} else {
			return false
		}
	}
}

//Exporting instance of class, though nobody makes lots of them
export default new Validator()
