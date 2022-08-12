/* eslint-disable import/named */
import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useMemo, useEffect, useState } from 'react';
import FuseMessage from '@fuse/core/FuseMessage';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import { DialogContentText, DialogTitle } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import ContactsMultiSelectMenu from './ContactsMultiSelectMenu';
import ContactsTable from './ContactsTable';
import { openEditContactDialog, removeContact, toggleStarredContact, selectContacts } from './store/contactsSlice';
import { addNotification } from 'app/fuse-layouts/shared-components/notificationPanel/store/dataSlice';
import NotificationModel from 'app/fuse-layouts/shared-components/notificationPanel/model/NotificationModel';
import NotificationPanel from 'app/fuse-layouts/shared-components/notificationPanel/NotificationPanel';

const formatData = vehicles =>
  vehicles.map(vehicle => {
    const totalCost = `$${(vehicle.fuelHistory.cost + vehicle.serviceHistory.cost).toLocaleString()}`;
    return {
      ...vehicle,
      isAssigned: vehicle.isAssigned ? 'YES' : 'NO',
      totalCost,
      millage: vehicle.mileageHistory.mileage.toLocaleString()
    };
  });

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

const choseAvatar = brand => {
  switch (brand) {
    case 'TOYOTA':
      return avatars[0];
    case 'AUDI':
      return avatars[1];
    case 'BMW':
      return avatars[2];
    case 'HONDA':
      return avatars[3];
    case 'LEXUS':
      return avatars[4];
    case 'MERCEDES':
      return avatars[5];
    default:
      return avatars[6];
  }
};

function ContactsList(props) {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const searchText = useSelector(({ contactsApp }) => contactsApp.contacts.searchText);
  const user = useSelector(({ contactsApp }) => contactsApp.user);

  const [filteredData, setFilteredData] = useState(null);

  const columns = useMemo(
    () => [
      {
        Header: ({ selectedFlatRows }) => {
          const selectedRowIds = selectedFlatRows.map(row => row.original._id);

          return selectedFlatRows.length > 0 && <ContactsMultiSelectMenu selectedContactIds={selectedRowIds} />;
        },
        accessor: 'avatar',
        Cell: ({ row }) => {
          return <Avatar className="mx-8" alt={row.original.name} src={choseAvatar(row.original.brand)} />;
        },
        className: 'justify-center',
        width: 64,
        sortable: false
      },
      {
        Header: 'Brand',
        accessor: 'brand',
        className: 'font-medium',
        sortable: true
      },
      {
        Header: 'Model',
        accessor: 'model',
        className: 'font-medium',
        sortable: true
      },
      // TODO: add Production Year
      // {
      //   Header: 'Production Year',
      //   accessor: 'year',
      //   sortable: true
      // },
      {
        Header: 'Plate Number',
        accessor: 'plateNumber',
        sortable: true
      },
      {
        Header: 'Assigned Status',
        accessor: 'isAssigned',
        sortable: true
      },
      {
        Header: 'Vehicle Status',
        accessor: 'vehicleStatus',
        sortable: true
      },
      {
        Header: 'Total Cost',
        accessor: 'totalCost',
        sortable: true
      },
      {
        Header: 'Millage',
        accessor: 'millage',
        sortable: true
      },

      {
        id: 'action',
        width: 128,
        sortable: false,
        Cell: ({ row }) => (
          <div className="flex items-center">
            <IconButton
              onClick={ev => {
                ev.stopPropagation();
                dispatch(toggleStarredContact(row.original._id));
              }}
            >
              {/* {user.starred && user.starred.includes(row.original._id) ? ( */}
              {row.original.__v ? <Icon className="text-yellow-700">star</Icon> : <Icon>star_border</Icon>}
            </IconButton>
            <NotificationPanel/>
            <IconButton
              onClick={ev => {
                ev.stopPropagation();
                dispatch(
                  openDialog({
                    children: (
                      <>
                        <DialogTitle id="alert-dialog-title">Do you want to delete?</DialogTitle>
                        <DialogActions>
                          <Button
                            onClick={() => {
                              dispatch(removeContact(row.original._id));
                              dispatch(closeDialog());
                            }}
                            color="primary"
                          >
                            Yes
                          </Button>
                          <Button onClick={() => dispatch(closeDialog())} color="primary" autoFocus>
                            No
                          </Button>
                        </DialogActions>
                      </>
                    )
                  })
                );
              }}
              variant="contained"
              color="secondary"
            >
              <Icon>delete</Icon>
            </IconButton>
          </div>
        )
      }
    ],

    [dispatch]
  );

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return contacts;
      }
      return FuseUtils.filterArrayByString(contacts, _searchText);
    }

    if (contacts) {
      setFilteredData(getFilteredArray(contacts, searchText));
    }
  }, [contacts, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no contacts!
        </Typography>
      </div>
    );
  }

  const formattedData = formatData(filteredData);

  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}>
      <ContactsTable
        columns={columns}
        data={formattedData}
        onRowClick={(ev, row) => {
          console.log(row.original);
          if (row) {
            dispatch(openEditContactDialog(row.original));
          }
        }}
      />
    </motion.div>
  );
}

export default ContactsList;
