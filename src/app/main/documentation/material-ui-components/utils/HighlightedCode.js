import FuseHighlight from '@fuse/core/FuseHighlight/FuseHighlight';
import * as PropTypes from 'prop-types';
import { forwardRef } from 'react';

const HighlightedCode = forwardRef(function HighlightedCode(props, ref) {
  const { code, language, ...other } = props;

  return (
    <FuseHighlight component="pre" className={`language-${language || 'jsx'}`} ref={ref} {...other}>
      {code}
    </FuseHighlight>
  );
});

HighlightedCode.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired
};

export default HighlightedCode;
