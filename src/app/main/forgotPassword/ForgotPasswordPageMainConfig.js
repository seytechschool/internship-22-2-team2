import { authRoles } from 'app/auth';
import ForgotPasswordPageMain from './ForgotPasswordPageMain';

const ForgotPasswordPageMainConfig = {
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
      path: '/forgot',
      component: ForgotPasswordPageMain
    }
  ]
};

export default ForgotPasswordPageMainConfig;
