import { globalStateApiType } from '../GlobalStateTypes.tsx';

const AuthModule = ({ set }: globalStateApiType) => {
  return {
    session: null,
    setSession: (session: null) => {
      set({ session: session });
    },
  };
};

export { AuthModule };
