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
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import _ from '@lodash';
import * as yup from 'yup';
import { addressData } from './VehicleAddress';

import {
  removeContact,
  updateContact,
  addContact,
  closeNewContactDialog,
  closeEditContactDialog
} from './store/contactsSlice';

const avatars = [
  'https://avatarfiles.alphacoders.com/821/thumb-82113.jpg',
  'https://avatarfiles.alphacoders.com/170/170744.jpg',
  'https://www.aalgse.com.au/wp-content/uploads/2018/05/Photo2-003-3.png',
  'https://s3-ap-southeast-2.amazonaws.com/imotor-cms/images_cms/513d8ff1-5a40-4d66-a74c-f64702fa453a.jpg',
  'https://www.ecotruckwash.com/wp-content/uploads/2019/10/EcoTruckWash-1058907888-600x600.jpg',
  'https://imotor-cms-uploads.s3.ap-southeast-2.amazonaws.com/qzevjK8Awyt3Kw8AfcfFXvDZ',
  'https://www.velocitytruckcentres.com.au/storage/app/media/Newcastle%20Recent%20Deliveries%20Images/92542aaa-9a37-45f4-ba97-7be5b43e4133.jpg'
];

function randomAvatars() {
  return avatars[Math.floor(Math.random() * avatars.length)];
}

const defaultValues = {
  id: '',
  brand: '',
  model: '',
  plateNumber: '',
  isAssigned: '',
  vehicleStatus: '',
  mileageCost: '',
  fuelCost: '',
  mileage: ''
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  brand: yup.string().required('You must enter a name')
});

function ContactDialog(data) {
  const dispatch = useDispatch();
  const contactDialog = useSelector(({ contactsApp }) => contactsApp.contacts.contactDialog);
  const [location, setLocation] = useState(addressData[0]);

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema)
  });

  const { isValid, dirtyFields, errors } = formState;

  const id = watch('id');
  const brand = watch('brand');
  const model = watch('model');

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
      const random = Math.floor(Math.random() * addressData.length);
      setLocation(addressData[random]);
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
  function onSubmit() {
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
    console.log(data.id, 'id');
    dispatch(removeContact(id));
    closeComposeDialog();
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
          <Typography variant="subtitle" color="inherit">
            {contactDialog.type === 'new' ? 'New Contact' : 'Edit Contact'}
          </Typography>
        </Toolbar>
        <div className="flex flex-col items-center justify-center pb-24">
          <Avatar className="w-96 h-96" alt="contact avatar" src={randomAvatars()} />
          {contactDialog.type === 'edit' && (
            <Typography style={{ fontSize: '2rem' }} variant="subtitle" color="inherit" className="pt-8">
              {brand} {model}
            </Typography>
          )}
        </div>
      </AppBar>
      <div className="flex items-start">
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          style={{ flexBasis: '50%' }}
          className="flex flex-col md:overflow-hidden"
        >
          <DialogContent classes={{ root: 'p-24' }}>
            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">directions_car</Icon>
              </div>
              <Controller
                control={control}
                name="brand"
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
                <span className="material-icons" style={{ color: 'grey' }}>
                  extension
                </span>
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
                name="plateNumber"
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
                <span className="material-icons" style={{ color: 'grey' }}>
                  article
                </span>
              </div>
              <Controller
                control={control}
                name="isAssigned"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Assigned Status"
                    id="status"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </div>

            <div className="flex">
              <div className="min-w-48 pt-20">
                <span className="material-icons" style={{ color: 'grey' }}>
                  local_shipping{' '}
                </span>
              </div>
              <Controller
                control={control}
                name="vehicleStatus"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Vehicle Status"
                    id="vehicle-status"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </div>

            <div className="flex">
              <div className="min-w-48 pt-20">
                <span className="material-icons" style={{ color: 'grey' }}>
                  attach_money
                </span>
              </div>
              <Controller
                control={control}
                name="mileageCost"
                render={({ field }) => (
                  <TextField {...field} className="mb-24" label="Mileage Cost" id="cost" variant="outlined" fullWidth />
                )}
              />
            </div>
            <div className="flex">
              <div className="min-w-48 pt-20">
                <span className="material-icons" style={{ color: 'grey' }}>
                  attach_money
                </span>
              </div>
              <Controller
                control={control}
                name="fuelCost"
                render={({ field }) => (
                  // eslint-disable-next-line prettier/prettier
                  <TextField {...field} className="mb-24" label="Fuel Cost" id="fuelCost" variant="outlined" fullWidth />
                )}
              />
            </div>

            <div className="flex">
              <div className="min-w-48 pt-20">
                <span className="material-icons" style={{ color: 'grey' }}>
                  add_road
                </span>
              </div>
              <Controller
                control={control}
                name="mileage"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-1"
                    label="Mileage"
                    id="mileage"
                    name="mileage"
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
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                >
                  Add
                </Button>
              </div>
            </DialogActions>
          ) : (
            <DialogActions className="justify-between p-4 pb-16">
              <div className="px-16">
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                >
                  Save
                </Button>
              </div>
              <IconButton
                onClick={ev => {
                  ev.stopPropagation();
                  dispatch(removeContact(id));
                  console.log('ID ===> ', id);
                }}
              >
                <Icon>delete</Icon>
              </IconButton>
            </DialogActions>
          )}
        </form>
        <iframe
          style={{ width: '400px', height: '400px', margin: 'auto' }}
          src={location}
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          title="iframe"
        />
      </div>
    </Dialog>
  );
}

export default ContactDialog;
