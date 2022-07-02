import FuseUtils from '@fuse/utils';
import _ from '@lodash';

function NotificationModel(data) {
  data = data || {};

  return _.defaults(data, {
    id: FuseUtils.generateGUID(),
    message: '',
    options: {
      variant: 'default'
    }
  });
}

export default NotificationModel;
