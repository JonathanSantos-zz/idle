import { ActionType } from './ActionType.enum';

export interface Action {
    type: ActionType,
    value: number,
    bonus: {
        action: ActionType,
        value: number
    }
}
