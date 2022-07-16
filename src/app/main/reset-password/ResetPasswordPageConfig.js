import { authRoles } from 'app/auth';
import ResetPasswordPage from './ResetPasswordPage';

const ResetPasswordPageConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false
        },
        toolbar: {
          display: false
        },
        footer: {
          display: false
        },
        leftSidePanel: {
          display: false
        },
        rightSidePanel: {
          display: false
        }
      }
    }
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: '/reset',
      component: ResetPasswordPage
    }
  ]
};

export default ResetPasswordPageConfig;





// import { lazy } from 'react';

// const ResetPasswordPageConfig = {
//   settings: {
//     layout: {
//       config: {}
//     }
//   },
//   routes: [
//     {
//       path: '/pages/auth/reset-password',
//       component: lazy(() => import('./ResetPasswordPage'))
//     }
//   ]
// };

// export default ResetPasswordPageConfig;
