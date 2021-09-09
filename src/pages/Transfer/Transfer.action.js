const prefix = 'Transfer_'

export const changeFieldValue = (field, value) => dispatch => {
	dispatch({
		type: `${prefix}changeFieldValue`,
		field,
		value
	})
}

