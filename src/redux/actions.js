export const ADD_CELEB = "ADD_CELEB"

export const UPDATE_CELEB = "UPDATE_CELEB"

export const LOAD_CELEB = "LOAD_CELEB"

export function addCeleb(todo) {
    return {
        type: ADD_CELEB,
        payload: todo
    }
}

export function updateCeleb(todo) {
    return {
        type: UPDATE_CELEB,
        payload: todo
    }
}

export function loadCeleb(todo) {
    console.log(todo);
    return {
        type: LOAD_CELEB,
        payload: todo.celeb
    }
}