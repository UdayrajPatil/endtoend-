export const appReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
                user: action.user
            }
        case 'LOADER':
            return {
                ...state,
                isShowLoader: action.payload
            }
    }
    return state;
}


