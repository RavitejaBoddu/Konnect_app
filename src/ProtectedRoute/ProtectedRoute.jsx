import { Redirect } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const ProtectedRoute = ({children}) => {

    const {user} = UserAuth();
    if(!user){
        return <Redirect to='/' />
    }
  return children;
}

export default ProtectedRoute