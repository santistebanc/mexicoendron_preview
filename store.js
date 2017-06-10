import { createStore, applyMiddleware } from "redux"

const initial = {
    videos: [],
    tags: [],
    stems: [],
    durationFilter: { min: 0, max: 180 },
    priceFilter: { min: 0, max: 100 }
}

const reducer = (state = initial, action) => {
    switch (action.type) {
        case 'SET_FETCHED_VIDEOS':
            return { ...state, ...action.payload }
        case 'CHANGE_DURATION_FILTER':
            return { ...state, durationFilter: { ...action.payload } }
        case 'CHANGE_PRICE_FILTER':
            return { ...state, priceFilter: { ...action.payload } }
        case 'SET_DURATION_VIDEO':
            const ind = state.videos.findIndex(v => v.id == action.payload.id)
            const newvideosarray = [...state.videos]
            newvideosarray[ind] = { ...newvideosarray[ind], duration: action.payload.duration }
            return { ...state, videos: newvideosarray }
        default:
            return state
    }
}

const logMiddleware = ({ getState, dispatch }) => (next) => (action) => {
    //console.log(`Action: ${action.type}`)
    next(action)
}

export const makeStore = (initialState) => {
    return createStore(reducer, initialState, applyMiddleware(logMiddleware))
}