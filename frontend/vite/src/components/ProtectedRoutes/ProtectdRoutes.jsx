// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// function ProtectedRoutes({ component: Component, ...rest }) {
//     const isAuthenticated = localStorage.getItem('Token') !== null;

//     return (
//         <Route
//             {...rest}
//             render={(props) =>
//                 isAuthenticated ? (
//                     <Component {...props} />
//                 ) : (
//                     <Redirect
//                         to={{
//                             pathname: '/login',
//                             state: { from: props.location },
//                         }}
//                     />
//                 )
//             }
//         />
//     );
// }

// export default ProtectedRoutes;