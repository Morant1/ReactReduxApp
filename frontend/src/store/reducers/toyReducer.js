const initialState = {
    toys: []
}

export function toyReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TOYS':
            return {
                ...state,
                toys: action.toys
            }
        case 'UPDATE_TOY':
            return { ...state, toys: state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy) }

        case 'ADD_TOY':
            return { ...state, toys: [...state.toys, action.toy] }

        case 'REMOVE_TOY':
            const toys = state.toys.filter(toy => toy._id !== action.id)
            return { ...state, toys }
    
        default:
            return state
    }
}