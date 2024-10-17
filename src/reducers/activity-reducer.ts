import { Activity } from "../types"

export type ActivityActions= 
{ type: 'save-activity', payload: {newActivity: Activity} } |
{ type: 'edit-activity', payload: {id: Activity['id']} }

type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}
export const initialState: ActivityState= {
    activities: [],
    activeId: ''
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
)=>{
    if(action.type==='save-activity'){
        return{
            ...state,
            activities:[...state.activities, action.payload.newActivity]
        }
    }

    if(action.type==='edit-activity'){
        return{
            ...state,
            activeId: action.payload.id
        }
    }

    return state
}