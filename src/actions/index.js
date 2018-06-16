import ADD_THING from '../constants/action-types'

const addThing = (thing) => {
	return {
		type: ADD_THING,
		payload: thing
	}
}

export default addThing
