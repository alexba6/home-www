import {RootState} from "../index";
import { User } from "./UserReducer";

/**
 * @param store
 */
export const userSelectInfo = (store: RootState): User | undefined => store.user.user
