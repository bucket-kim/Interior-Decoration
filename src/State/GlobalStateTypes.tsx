import { Draft } from 'immer';
import { AuthModuleTypes } from './AuthModule/AuthModuleTypes';
import { R3FModuleTypes } from './R3FModule/R3FModuleTypes';
import { UIModuleTypes } from './UIModule/UIModuleTypes';

export interface GlobalStateTypes
  extends AuthModuleTypes,
    UIModuleTypes,
    R3FModuleTypes {}

export type SetState<T extends object> = (
  partial: Partial<T> | ((state: Draft<T>) => void),
  replace?: boolean,
) => void;

export type GetState<T extends object> = () => T;

export type globalStateApiType = {
  set: SetState<GlobalStateTypes>;
  get: GetState<GlobalStateTypes>;
};
