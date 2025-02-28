import { Fragment, MouseEvent, useCallback, useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import supabase from '../../../context/Supabase/Supabase';
import { useGlobalState } from '../../../State/useGlobalState';
import LoginSignUp from './LoginSignUp/LoginSignUp';

const AuthPage = () => {
  const { session, setSession } = useGlobalState((state) => {
    return {
      session: state.session,
      setSession: state.setSession,
    };
  }, shallow);

  const [loginClick, setLoginClick] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) return;
      setSession(session as any);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session as any);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = useCallback(
    async (e: MouseEvent) => {
      e.preventDefault();
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Error signing out:', error);
      } else {
        console.log('User signed out successfully');
      }
    },
    [session],
  );

  if (!session) {
    return (
      <Fragment>
        <button onClick={() => setLoginClick(true)}>Log in / Sign up</button>
        {loginClick && <LoginSignUp setLoginClick={setLoginClick} />}
      </Fragment>
    );
  } else {
    return (
      <div>
        <div>Logged in!</div>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    );
  }
};

export default AuthPage;
