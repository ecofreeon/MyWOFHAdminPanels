import { useEffect } from 'react';
import {
  Route, useHistory
} from "react-router-dom";
import locale from 'antd/lib/locale-provider/ru_RU';
import { Layout } from 'antd';
import { AuthActionsThunk } from './store/Reducers/AuthReducer/authorizeReducer'
import { useDispatch } from 'react-redux';
import MainMenu from './components/MainMenu';
import './custom.css'
import { useTypedSelector } from './hooks/useTypedSelector';
import { AppRouter } from './components/AppRouter';



export const App = () => {

  const store = useTypedSelector(state => state)

  const dispatcher = useDispatch()
  const history = useHistory()
  // if(!mounted){
  //   dispatch(AuthActionsThunk.isAuthenticatedChek())
  // }

  useEffect(() => {
    dispatcher(AuthActionsThunk.isAuthenticatedChek())
    if (!store.authorize.isAuthorize) {
      history.push('/Login')
    } else {
      history.push('/Counter')
    }
  }, [store.authorize.isAuthorize])

  return (
    <div>
      <AppRouter />
    </div>
  )

}

// class App extends Component {

//   static displayName = App.name;
//   render() {
//     return (
//       <Layout>
//         <Route exact path='/' component={Login} />
//         {
//           this.props.store.authorize.isAuthorize ?
//             <div>
//               <Route path='/Registration' component={Register} />
//               <Route path='/counter' component={Counter} />
//               <Route path='/fetch-data' component={FetchData} />
//             </div>
//             : <div>
//               <Route path='/Registration' component={Register} />
//               <Route path='/counter' component={Login} />
//               <Route path='/fetch-data' component={Login} />
//             </div>

//         }
//         {/* <Route path='/Registration' component={Register}/>
//         <Route path='/counter' component={Counter} />
//         <Route path='/fetch-data' component={FetchData} /> */}
//       </Layout>
//     );
//   }
// }

// const mapStateToProps = (store) => {
//   // console.log(store); // посмотрим, что же у нас в store?
//   return {
//     store: store,
//   };
// };

