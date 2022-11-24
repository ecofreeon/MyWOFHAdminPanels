import { TypedUseSelectorHook, useSelector } from "react-redux";
import { appStateType } from "../store/rootReduser";


export const useTypedSelector:TypedUseSelectorHook<appStateType> = useSelector