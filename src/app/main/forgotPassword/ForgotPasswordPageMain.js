import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import { forgotPasswordFirebase } from 'app/auth/store/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
// import firebaseService from 'app/services/firebaseService';
// import firebase from 'firebase/app';
// import history from '@history';
// import 'firebase/auth';
// import { sendPasswordResetEmail } from "firebase/auth";

const useStyles = makeStyles(() => ({
  root: {}
}));

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email')
});

const defaultValues = {
  email: ''
};

function ForgotPasswordPageMain() {
  const classes = useStyles();
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema)
  });

  const { isValid, dirtyFields, errors } = formState;
  const dispatch = useDispatch();
<<<<<<< HEAD
  
=======

>>>>>>> f8352273cc8c837e47ac1b3d0719a78a1df9b1af
  function onSubmit(model) {
    dispatch(forgotPasswordFirebase(model));
    console.log(model, 'testemail');
    reset(defaultValues);
  }

  return (
    <div className={clsx(classes.root, 'flex flex-col flex-auto items-center justify-center p-16 sm:p-32')}>
      <div className="flex flex-col items-center justify-center w-full">
        <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="w-full max-w-384">
            <CardContent className="flex flex-col items-center justify-center p-16 sm:p-24 md:p-32">
              <img
                style={{ background: 'black', padding: '5px' }}
                className="w-70 m-32"
                src="https://www.emplosoft.com/assets/img/logo.png"
                alt="logo"
              />

              <Typography variant="h6" className="mt-16 mb-24 font-semibold text-18 sm:text-24">
                Recover your password
              </Typography>

              <form
                name="recoverForm"
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
                      fullWidth
                    />
                  )}
                />

                <Button
                  variant="contained"
                  color="primary"
                  className="w-224 mx-auto mt-16"
                  aria-label="Reset"
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                  type="submit"
                >
                  Send reset link
                </Button>
              </form>

              <div className="flex flex-col items-center justify-center pt-32 pb-24">
                <Link style={{ color: '#008900' }} className="font-normal" to="/pages/auth/login">
                  Go back to login
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default ForgotPasswordPageMain;
