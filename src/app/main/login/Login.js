import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { submitLoginWithFireBase } from 'app/auth/store/loginSlice';

const useStyles = makeStyles(theme => ({
  root: {},
  leftSection: {},
  rightSection: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
      theme.palette.primary.dark,
      0.5
    )} 100%)`,
    color: theme.palette.primary.contrastText
  }
}));
const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    /* Change to 8 Later On */
    .min(3, 'Password is too short - should be 8 chars minimum.')
});

const defaultValues = {
  email: '',
  password: ''
};

function Login() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const login = useSelector(({ auth }) => auth.login);

  const { control, setValue, formState, handleSubmit, reset, trigger, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema)
  });

  const { isValid, dirtyFields, errors } = formState;

  const [showPassword, setShowPassword] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    login.errors.forEach(error => {
      setError(error.type, {
        type: 'manual',
        message: error.message
      });
    });
  }, [login.errors, setError]);

  function onSubmit(model) {
    dispatch(submitLoginWithFireBase(model));
  }

  return (
    <div
      className={clsx(classes.root, 'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24')}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
      >
        <Card
          className={clsx(classes.leftSection, 'flex flex-col w-full max-w-sm items-center justify-center shadow-0')}
          square
        >
          <CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }}>
              <div className="flex items-center mb-48">
                <div>
                  <img
                    style={{ background: 'black', padding: '5px' }}
                    className="logo-icon w-60"
                    src="https://www.emplosoft.com/assets/img/logo.png"
                    alt="logo"
                  />
                </div>

                <div className="border-l-1 mr-4 w-1 h-40" />
                <div>
                  <Typography className="text-24 font-semibold logo-text" color="inherit">
                    EMPLOSOFT
                  </Typography>
                </div>
              </div>
            </motion.div>

            <form
              name="loginForm"
              noValidate
              className="flex flex-col justify-center w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-16"
                    label="Email"
                    autoFocus
                    type="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-16"
                    label="Password"
                    type="password"
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <div className=" items-center text-center ">
                <Link className="font-normal" style={{ color: '#008900' }} to="/forgot">
                  Forgot Password?
                </Link>
              </div>
              <Button
                variant="contained"
                color="primary"
                className="w-full mx-auto mt-16"
                aria-label="LOG IN"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                type="submit"
              >
                Login
              </Button>
            </form>

            <div className="flex flex-col items-center justify-center pb-32" style={{ marginTop: '30px' }}>
              <span className="font-normal">Don't have an account?</span>
              <Link className="font-normal" style={{ color: '#008900' }} to="/register">
                Create an account
              </Link>
            </div>
          </CardContent>
        </Card>

        <div
          style={{
            backgroundImage: 'url("https://i.gifer.com/CuoX.gif")',

            backgroundSize: ' cover '
          }}
          className={clsx(classes.rightSection, 'hidden md:flex flex-1 items-center justify-center p-64')}
        >
          <div
            className="max-w-320"
            style={{
              backgroundColor: 'rgba(0,0,0, 0.5)',
              width: '60vw',
              height: ' 25vh',
              textAlign: 'center',
              borderRadius: '20px'
            }}
          >
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}>
              <Typography
                style={{ marginTop: '5rem' }}
                color="inherit"
                className="text-32 sm:text-44 font-semibold leading-tight"
              >
                EmploSoft <br />
              </Typography>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }}>
              <Typography variant="subtitle1" color="inherit" className="mt-32 font-medium">
                Fleet Management Software Platform
              </Typography>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
