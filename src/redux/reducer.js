import { ADD_CELEB, UPDATE_CELEB, LOAD_CELEB } from './actions';
import { todos } from './states'

export let reducer = (state = todos, action) => {
    switch (action.type) {
        case ADD_CELEB:
            break;
        case UPDATE_CELEB:
            break;
        case LOAD_CELEB:
            state = [...state, ...action.payload];
            return state;
    }
    return state;
}
