import { Action, handleActions } from 'redux-actions';
import {
    fetchStaffsAction,
    setActiveTabAction,
    findUserAction,
    fetchRolesAction,
    // findPatientAction,
    setPaletteAction
} from './actions';

const initialState: {
    isFetched: boolean;
    roles: string[];
    count: number;
    loading: boolean;
    items: any[];
    activeTab: string;
    itemsByRoles: any;
    suggestionsResult: any;
    itemsResRoles: any;
    staffColor: any;
} = {
    loading: false,
    isFetched: false,
    count: 0,
    items: [],
    itemsByRoles: {},
    activeTab: 'staffs',
    roles: [],
    suggestionsResult: [],
    itemsResRoles: {},
    staffColor: "#000000"
};

const ACTION_HANDLERS: any = {
    [fetchStaffsAction]: {
        next: (
            state: State.Staffs,
            action: Type.ReduxAction<Pick<State.Staffs, 'roles' | 'items' | 'itemsByRoles'>>
        ): State.Staffs => ({
            ...state,
            ...action.payload,
            loading: false,
            isFetched: true
        }),
        throw: (state: State.Staffs): State.Staffs => ({
            ...state,
            loading: false,
            isFetched: false
        })
    },
    [setPaletteAction]: {
        next: (state: State.Staffs, action: Action<string>): State.Staffs => ({
            ...state,
            staffColor: action.payload
        })
    },
    [setActiveTabAction]: {
        next: (state: State.Staffs, action: Action<string>): State.Staffs => ({
            ...state,
            activeTab: action.payload
        })
    },
    [findUserAction]: {
        next: (state: State.Staffs, action: Action<any>): State.Staffs => ({
            ...state,
            suggestionsResult: action.payload
        })
    },
    // [findPatientAction]: {
    //     next: (state: State.Staffs, action: Action<any>): State.Staffs => ({
    //         ...state,
    //         suggestionsResult: action.payload
    //     })
    // },
    [fetchRolesAction]: {
        next: (
            state: State.Staffs,
            action: Type.ReduxAction<Pick<State.Staffs, 'itemsResRoles'>>
        ): State.Staffs => ({
            ...state,
            ...action.payload,
            loading: false,
            isFetched: true
        }),
        throw: (state: State.Staffs): State.Staffs => ({
            ...state,
            loading: false,
            isFetched: false
        })
    }
};

export {
    fetchStaffsAction,
    setActiveTabAction,
    findUserAction,
    fetchRolesAction,
    // findPatientAction,
    setPaletteAction
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
