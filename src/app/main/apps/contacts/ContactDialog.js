import FuseUtils from '@fuse/utils/FuseUtils';
import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useCallback, useEffect,useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {addressData} from './VehicleAddress';


import _ from '@lodash';
import * as yup from 'yup';

import {
  removeContact,
  updateContact,
  addContact,
  closeNewContactDialog,
  closeEditContactDialog
} from './store/contactsSlice';

const defaultValues = {
  id: '',
  name: '',
  lastName: '',
  avatar: 'assets/images/avatars/profile.jpg',
  nickname: '',
  company: '',
  jobTitle: '',
  email: '',
  phone: '',
  address: '',
  birthday: '',
  notes: ''
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required('You must enter a name')
});

function ContactDialog(props) {
  const dispatch = useDispatch();
  const contactDialog = useSelector(({ contactsApp }) => contactsApp.contacts.contactDialog);
  const [location, setLocation]=useState(addressData[0])

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema)
  });

  const { isValid, dirtyFields, errors } = formState;

  const id = watch('id');
  const name = watch('name');
  const avatar = watch('avatar');

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (contactDialog.type === 'edit' && contactDialog.data) {
      reset({ ...contactDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (contactDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...contactDialog.data,
        id: FuseUtils.generateGUID()
      });
    }
  }, [contactDialog.data, contactDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (contactDialog.props.open) {
      initDialog();
      let random=Math.floor(Math.random()*addressData.length)
      setLocation(addressData[random])
    }
  }, [contactDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return contactDialog.type === 'edit' ? dispatch(closeEditContactDialog()) : dispatch(closeNewContactDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    if (contactDialog.type === 'new') {
      dispatch(addContact(data));
    } else {
      dispatch(updateContact({ ...contactDialog.data, ...data }));
    }
    closeComposeDialog();
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removeContact(id));
    closeComposeDialog();
    console.log(id, 'id');
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24'
      }}
      {...contactDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="md"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {contactDialog.type === 'new' ? 'New Contact' : 'Edit Contact'}
          </Typography>
        </Toolbar>
        <div className="flex flex-col items-center justify-center pb-24">
          <Avatar className="w-96 h-96" alt="contact avatar" src='https://i.pinimg.com/originals/58/c5/0e/58c50eaea4d172efb4f2f9fd72f5471b.jpg' />
          {contactDialog.type === 'edit' && (
            <Typography variant="h6" color="inherit" className="pt-8">
              {name}
            </Typography>
          )}
        </div>
      </AppBar>
      <div className='flex items-start'>
      <form noValidate onSubmit={handleSubmit(onSubmit)} style={{flexBasis:'50%'}} className="flex flex-col md:overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">directions_car</Icon>
            </div>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Brand"
                  id="name"
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
            <span class='material-icons' style={{color:'grey'}}>extension</span>
            </div>
            <Controller
              control={control}
              name="model"
              render={({ field }) => (
                <TextField {...field} className="mb-24" label="Model" id="model" variant="outlined" fullWidth />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">credit_card</Icon>
            </div>
            <Controller
              control={control}
              name="nickname"
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  className="mb-24"
                  label="Plate Number"
                  id="nickname"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <span className="material-icons" style={{color:'grey'}}>article</span>
            </div>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <TextField {...field} className="mb-24" label="Assigned Status" id="status" variant="outlined" fullWidth />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
            <span class="material-icons" style={{color:'grey'}}>local_shipping </span>
            </div>
            <Controller
              control={control}
              name="vehicle-status"
              render={({ field }) => (
                <TextField {...field} className="mb-24" label="Vehicle Status" id="vehicle-status" variant="outlined" fullWidth />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
            <span class="material-icons" style={{color:'grey'}}>attach_money</span>
            </div>
            <Controller
              control={control}
              name="cost"
              render={({ field }) => (
                <TextField {...field} className="mb-24" label="Total Cost" id="cost" variant="outlined" fullWidth />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
            <span class='material-icons' style={{color:'grey'}}>add_road</span>
            </div>
            <Controller
              control={control}
              name="millage"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Millage"
                  id="millage"
                  name="millage"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
        </DialogContent>

        {contactDialog.type === 'new' ? (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button variant="contained" color="secondary" type="submit" disabled={_.isEmpty(dirtyFields) || !isValid}>
                Add
              </Button>
            </div>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button variant="contained" color="secondary" type="submit" disabled={_.isEmpty(dirtyFields) || !isValid}>
                Save
              </Button>
            </div>
            <IconButton onClick={handleRemove}>
              <Icon>delete</Icon>
            </IconButton>
          </DialogActions>
        )}
      </form>
      <iframe style={{width:'500px', height:'500px', margin:'auto'}} src={location} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
     
      </div>
    </Dialog>
  );
}

export default ContactDialog;
