import { takeEvery } from 'redux-saga/effects';
import { auth, logoutUser } from './auth/authSaga';
import { loginAction, logoutAction } from './auth/authSlice';


export default function* watchDataSaga() {
    //auth
    console.log("kkkkk");
    
	yield takeEvery(loginAction.type, auth);
	yield takeEvery(logoutAction.type, logoutUser); 


}
