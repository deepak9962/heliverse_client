import React, { createContext, useReducer } from 'react';

export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER': {
            state.user = action.payload.user;
            action.type = 'DONE';
            return {
                ...state
            }
        }

        case 'SET_TEAM': {
            state.team = action.payload.team;
            action.type = 'DONE';
            return {
                ...state
            }
        }

        case 'SET_USER_RELOAD': {
            state.userReload = action.payload.userReload;
            action.type = 'DONE';
            return {
                ...state
            }
        }

        case 'SET_TEAM_RELOAD': {
            state.teamReload = action.payload.teamReload;
            action.type = 'DONE';
            return {
                ...state
            }
        }

        default: {
            return state;
        }
    }
}

const initialState = {
    users: null,
    team: null,
    userReload: false,
    teamReload: false,
    domains: [
        'Sales',
        'Finance',
        'Marketing',
        'IT',
        'Management',
        'UI Designing',
        'Business Development'
    ]
}

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider
            value={{
                users: state.users,
                team: state.team,
                userReload: state.userReload,
                teamReload: state.teamReload,
                domains: state.domains,
                dispatch
            }}>
            {props.children}
        </AppContext.Provider>
    )
}