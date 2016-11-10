import React, { PropTypes } from 'react';
import { kinds } from 'Helpers/Props';
import SpinnerButton from 'Components/SpinnerButton';
import styles from './CaptchaInput.css';

function OAuthInput(props) {
  const {
    authorizing,
    onPress
  } = props;

  return (
    <div>
      <div className={styles.oAuthContainer}>
        <SpinnerButton
          kind={kinds.PRIMARY}
          isSpinning={authorizing}
          onPress={onPress}
        >
          Start OAuth
        </SpinnerButton>
      </div>
    </div>
  );
}

OAuthInput.propTypes = {
  authorizing: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
};

export default OAuthInput;
