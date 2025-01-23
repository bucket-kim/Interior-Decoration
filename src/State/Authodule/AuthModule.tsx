import { globalStateApiType } from '../GlobalStateTypes';
import { UsersType } from './AuthModuleTypes';

const AuthModule = ({ set }: globalStateApiType) => {
  return {
    formData: {},
    setFormData: (formData: UsersType) => {
      set({ formData: formData });
    },
  };
};

export { AuthModule };
