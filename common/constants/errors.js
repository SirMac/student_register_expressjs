

class ErrorConstants {
	badRequest = {
		error: 'Bad Request',
		status: 400,
	}

	unauthorized = {
		error: 'Unauthorised',
		status: 401,
	}

	forbidden = {
		error: 'Forbidden',
		status: 403,
	}

	notFound = {
		error: 'Not Found',
		status: 404,
	}

	unprocessableEntity = {
		status: 422,
		error: 'Unprocessable Entity',
	}

	internalServerError = {
		error: 'Internal Server Error',
		status: 500,
		code: 'internalServerError'
	}

	pageAccess = {
		...this.forbidden,
		code: 'pageAccessError',
		message: 'You are not authorised to view this page'
	}

	success = {
		error: '',
		status: 200,
	}

	onlyAdmin = {
        ...this.forbidden,
		message: 'Only admins are allowed to do this!',
	}

	noPermesssion = {
		error: 'Forbidden',
		status: 403,
		message: 'You do not have permission to consume this resource!',
	}

	invalidId = {
        ...this.badRequest,
		message: 'Invalid Id parameter',
	}

	invalidSearchTerm = {
        ...this.badRequest,
		message: 'Invalid search term',
	}

	missingAttr(attrs) {
		return {
            ...this.badRequest,
			message: `Attribute(s) (${attrs.join(',')}) seem(s) to be missing`,
		}
	}

	unwantedAttr(attrs) {
		return {
            ...this.badRequest,
			message: `Attribute(s) (${attrs.join(',')}) can't be updated`,
		}
	}

	uniqueAttr(attrs) {
		return {
            ...this.badRequest,
			message: `Attribute(s) [${attrs.join(',')}] must be unique`,
		}
	}

	custom(msg) {
		return {
            ...this.badRequest,
			message: msg,
		}
	}

	// REST

	addFailure() {
		return {
            ...this.badRequest,
			message: 'Item WAS NOT added',
		}
	}

	deleteFailure() {
		return {
            ...this.badRequest,
			message: 'Item WAS NOT deleted',
		}
	}

	updateFailure() {
		return {
            ...this.badRequest,
			message: 'Item WAS NOT updated',
		}
	}

	addSuccess() {
		return {
            ...this.success,
			message: 'Item added successfully',
		}
	}

	deleteSuccess() {
		return {
            ...this.success,
			message: 'Item deleted successfully',
		}
	}

	updateSuccess() {
		return {
            ...this.success,
			message: 'Item updated successfully',
		}
	}

};

module.exports = new ErrorConstants()