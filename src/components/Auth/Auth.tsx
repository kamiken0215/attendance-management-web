// import React, { FC, useEffect, useMemo, useState } from 'react';

// import Authenticaion from '../../utils/Authentication';
// import Home from '../Home';
// import LoginForm from '../Login';
// import { UserContext, initUser } from '../../contexts/UserContext';

// import {
//   TestUser,
//   User,
// } from '../../services/attendance-management/models/TestUser';
// import EnhancedHome from '../../containers/Home/HomeCountainer';

// const getUser = async (userName: string, password: string) => {
//   const reqBody = {
//     email: userName,
//     password,
//   };

//   try {
//     const response = await fetch(`http://118.27.7.5:60800/login`, {
//       mode: 'cors',
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(reqBody),
//     });
//     if (!response.ok) {
//       throw new Error(`${response.status} Error`);
//     }

//     return response.json();
//   } catch (e) {
//     console.log(`エラー発生 ${e as string}`);
//   } finally {
//     console.log('--- Login process Completed ---');
//   }
// };

// const Auth: FC = () => {
//   console.count('Auth');
//   const isLoggedIn = Authenticaion.isLoggedIn();
//   const [user, setUser] = useState(initUser);
//   const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

//   useEffect(() => {
//     // ローカルストレージからユーザーを復元
//     if (isLoggedIn) {
//       const email = Authenticaion.Decrypt(Authenticaion.get('email') as string);
//       const password = Authenticaion.Decrypt(
//         Authenticaion.get('password') as string,
//       );
//       const fetch = async () => {
//         try {
//           //const ret = (await getUser(email, password)) as User;
//           const user = {
//             id: '999',
//             name: 'TEST',
//             email: 'TEST@gmail.com',
//             password: 'TEST',
//             status: '1',
//             token: 'TEST',
//           } as User;
//           setUser(user);
//         } catch (err) {
//           console.error(err);
//         }
//       };
//       fetch();
//     } else {
//       console.log('isloggedin is false');
//     }
//   }, [isLoggedIn]);

//   return (
//     <UserContext.Provider value={providerValue}>
//       {isLoggedIn ? <EnhancedHome /> : <LoginForm />}
//     </UserContext.Provider>
//   );
// };

// export default Auth;
