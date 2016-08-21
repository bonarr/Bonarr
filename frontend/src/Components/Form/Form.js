import React, { PropTypes } from 'react';
import styles from './Form.css';

function Form({ children, validationErrors, validationWarnings, ...otherProps }) {
  return (
    <form {...otherProps}>
      <div>
        {
          validationErrors.map((error, index) => {
            return (
              <div
                key={index}
                className={styles.error}
              >
                {error.errorMessage}
              </div>
            );
          })
        }

        {
          validationWarnings.map((warning, index) => {
            return (
              <div
                key={index}
                className={styles.error}
              >
                {warning.errorMessage}
              </div>
            );
          })
        }
      </div>

      {children}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  validationErrors: PropTypes.arrayOf(PropTypes.object).isRequired,
  validationWarnings: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Form;
