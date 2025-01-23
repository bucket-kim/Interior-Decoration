import { AuthModuleTypes } from './Authodule/AuthModuleTypes';
import { R3FModuleTypes } from './R3FModule/R3FModuleTypes';
import { UIModuleTypes } from './UIModule/UIModuleTypes';

export interface GlobalStateTypes
  extends UIModuleTypes,
    R3FModuleTypes,
    AuthModuleTypes {}

export type SetState<T extends object> = (
  partial: Partial<T> | ((state: T) => void),
  replace?: boolean,
) => void;

export type GetState<T extends object> = () => T;

export type globalStateApiType = {
  set: SetState<GlobalStateTypes>;
  get: GetState<GlobalStateTypes>;
};
