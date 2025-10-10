import { ApplicationStateType, ApplicationDispatch } from "./../redux/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppDispatch: () => ApplicationDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ApplicationStateType> =
  useSelector;
