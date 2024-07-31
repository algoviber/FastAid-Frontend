import { onAuthStateChanged } from 'firebase/auth';
import { lazy, Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/header';
import Loader from './components/loader';
import ProtectedRoute from './components/protected-route';
import { auth } from './firebase';
import Blood from './pages/Blood';
import Contact from './pages/Contact';
import Donor from './pages/Donor';
import Helper from './pages/Helper';
import Need from './pages/Need';
import { getUser } from './redux/api/userAPI';
import { userExist, userNotExist } from './redux/reducer/userReducer';
import { UserReducerInitialState } from './types/reducer-types';




const Home = lazy(() => import('./pages/home'));
const Login = lazy(() => import('./pages/login'));
const NotFound = lazy(() => import('./pages/not-found'));



const App = () =>{

  const {user} = useSelector((state:{userReducer: UserReducerInitialState})=> state.userReducer);


  const dispatch = useDispatch();
  useEffect(() => {

    onAuthStateChanged(auth, async(user)=>{
      if(user){
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));
      }else dispatch(userNotExist());
    })
  }, []);

  return  (
    <Router>

        <Header user={user}/>
      <Suspense fallback={<Loader />}>
        <Routes>

        <Route path="/" element={<Home />} />

        {/*Not logged in*/}
        <Route path="/login" element={
          <ProtectedRoute isAuthenticated={user? false: true}>
            <Login />
          </ProtectedRoute>
        } />


          <Route path='/register/donor' element={<Donor />} />
          <Route path='/register/helper' element={<Helper />} />
          <Route path='/register/contacts' element={<Contact />} />

          <Route path='/request/blood' element={<Blood />} />
          <Route path='/request/help' element={<Need />} />
        

        

          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>

      <Toaster position='bottom-center'/>

    </Router>
  )
}

export default App;