import { toyService } from '../../services/toyService'


export function loadToys(filterBy) {
    return async dispatch => {
        try {
            const toys = await toyService.query(filterBy);
            dispatch({ type: 'SET_TOYS', toys })
        } catch (err) {
            console.log('err in loadToys', err);
        }

    }
}



export function updateToy(toy) {
    return async dispatch => {
        try {
            await toyService.save(toy);
            dispatch({ type: 'UPDATE_TOY', toy })
        } catch (err) {
            console.log('err in updateToy', err)

        }
    }
}

export function addToy(toy) {
    return async dispatch => {
        try {
            console.log("add",toy)
            await toyService.save(toy);
            dispatch({ type: 'ADD_TOY', toy })
        } catch (err) {
            console.log('err in addToy', err)

        }
    }
}


export function removeToy(id) {
    return async dispatch => {
        try {
            await toyService.remove(id);
            dispatch({ type: 'REMOVE_TOY', id })
        } catch (err) {
            console.log('err in removeToy', err);
        }
    }
}
