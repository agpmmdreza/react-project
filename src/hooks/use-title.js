import { useContext } from 'react';
import { useEffect } from 'react';
import AuthContext from '../store/auth-context';

const useTitle = (title) => {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    authCtx.changeTitle(title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);
};

export default useTitle;
