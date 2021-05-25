/**
 *Methods of this class provides validation functions
 * So, every time we have a new data type to validate, we add method to this class*/
class Validator {
	/**
	 * @param email string
	 * @returns True if email has passed the validation and False if not*/
	email(email: unknown) {
		if (!this.checkString(email)) return false
		return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
			email as string
		)
	}

	/**
	 * @param password password string
	 * @returns True if password's length more then 8*/
	password(password: unknown) {
		if (!this.checkString(password)) return false
		return (password as string).length >= 8
	}

	/**
	 * @param string
	 * @returns True if string is not falsy and
	 * False if string is actually falsy*/
	checkString(string: unknown) {
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
	singUp(signUpObj: Record<string, unknown>) {
		return !!(this.checkString(signUpObj.name) && this.email(signUpObj.email) && this.password(signUpObj.password))
	}

	/**
	 * @param signInObj object with data to sign in
	 * @returns True if object has passed the validation and False if have not passed*/
	signIn(signInObj: Record<string, unknown>) {
		return !!(this.email(signInObj.email) && this.password(signInObj.password))
	}

	/**
	 *
	 * @param itemObj
	 * @returns True if object has passed the validation and False if have not passed
	 */
	createItem(itemObj: Record<string, unknown>) {
		return !!this.checkString(itemObj.name) && !!this.checkString(itemObj.description) && !!this.checkString(itemObj.price)
	}

	/**
	 *
	 * @param updateObj
	 * @returns checked object ready for next work
	 */
	updateUser(updateObj: Record<string, unknown>) {
		const resObj: Record<string, unknown> = {}
		if (updateObj.password && this.password(updateObj.password)) resObj.password = updateObj.password
		if (typeof updateObj.name === 'string') resObj.name = updateObj.name
		if (typeof updateObj.street === 'string') resObj.street = updateObj.street
		if (typeof updateObj.city === 'string') resObj.city = updateObj.city
		if (typeof updateObj.country === 'string') resObj.country = updateObj.country
		if (updateObj.favorites) resObj.favorites = updateObj.favorites
		if (updateObj.orders) resObj.orders = updateObj.orders
		return resObj
	}

	/**
	 *
	 * @param orderObj
	 * @returns True if object has passed the validation and False if have not passed
	 */
	createOrder(orderObj: Record<string, unknown>) {
		return !!this.objectId(orderObj.itemId) && !!this.checkString(orderObj.size)
	}

	/**
	 *
	 * @param itemObj
	 * @returns True if object has passed the validation and False if have not passed
	 */
	updateItem(itemObj: Record<string, unknown>) {
		const resObj: Record<string, unknown> = {}
		if (typeof itemObj.name === 'string') resObj.name = itemObj.name
		if (typeof itemObj.description === 'string') resObj.description = itemObj.description
		if (typeof itemObj.sex === 'string') resObj.sex = itemObj.sex
		if (typeof itemObj.image === 'string') resObj.image = itemObj.image
		if (typeof itemObj.color === 'string') resObj.color = itemObj.color
		if (itemObj.price) resObj.price = itemObj.price
		if (itemObj.sizes) resObj.sizes = itemObj.sizes

		return resObj
	}

	/**
	 * Function performs checking for the type of id and if yes, checks if it is convertible to mongoose's ObjectId
	 * @param {unknown} id
	 * @returns boolean
	 */
	objectId(id: unknown) {
		if (typeof id === 'string') {
			return !!id.match(/^[0-9a-fA-F]{24}$/)
		} else {
			return false
		}
	}
}

//Exporting instance of class, though nobody makes lots of them
export default new Validator()
