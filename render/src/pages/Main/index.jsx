import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { globalActions } from 'src/models/global';
import { useReduxState } from 'src/store';

function MainPage() {
  const { doutu } = useReduxState((state) => state.global);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(globalActions.fetchAllDoutuList());
  }, []);
  console.log(doutu);

  return <div>Hello World</div>;
}

export default MainPage;
