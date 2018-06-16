import ADD_THING from '../constants/action-types'

const initialState = {
	things: [
		{ title: 'die' },
		{ title: 'how to die' }
	]
}

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_THING:
			return { ...state, things: [...state.things, action.payload] }
		default:
			return state
	}
}

export default rootReducer
