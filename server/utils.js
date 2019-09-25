const validateSchema = async (schema, object) => {
	try {
		return await schema.validateAsync(object, { abortEarly: false });
	} catch (err) {
		const errors = err.details;
		const messages = [];
		for (let e of errors) {
			messages.push(e.message);
		}
		return { errors: messages };
	}
};

const joinSchemas = (schemaA, schemaB) => {
	if (schemaA.errors || schemaB.errors) {
		return { errors: [ ...schemaA.errors || [], ...schemaB.errors || [] ] };
	}
	return { ...schemaA, ...schemaB };
};

const on = async promise => {
	try {
		const data = await promise;
		return [ null, data ];
	} catch (error) {
		return [ error ];
	}
};

module.exports = {
	validateSchema,
	joinSchemas,
	on
};