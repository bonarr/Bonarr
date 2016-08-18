import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import classNames from 'classNames';
import Link from 'Components/Link';
import Icon from 'Components/Icon';
import SelectInput from 'Components/Form/SelectInput';
import styles from './TablePager.css';

class TablePager extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isShowingPageSelect: false
    };
  }

  //
  // Listeners

  @autobind
  onOpenPageSelectClick() {
    this.setState({ isShowingPageSelect: true });
  }

  @autobind
  onPageSelect({ value: page }) {
    this.setState({ isShowingPageSelect: false });
    this.props.onPageSelect(parseInt(page));
  }

  //
  // Render

  render() {
    const {
      page,
      totalPages,
      totalRecords,
      onFirstPagePress,
      onPreviousPagePress,
      onNextPagePress,
      onLastPagePress
    } = this.props;

    const isShowingPageSelect = this.state.isShowingPageSelect;
    const pages = Array.from(new Array(totalPages), (x, i) => {
      return {
        [i + 1]: i + 1
      };
    });

    if (!page) {
      return null;
    }

    const isFirstPage = page === 1;
    const isLastPage = page === totalPages;

    return (
      <div className={styles.pager}>
        <div>{/* I'm a placeholder so flexbox sets things where I want them */}</div>
        <div className={styles.controls}>
          <Link
            className={classNames(
              styles.pageLink,
              isFirstPage && styles.disabledPageButton
            )}
            disabled={isFirstPage}
            onPress={onFirstPagePress}
          >
            <Icon name="icon-sonarr-pager-first" />
          </Link>

          <Link
            className={classNames(
              styles.pageLink,
              isFirstPage && styles.disabledPageButton
            )}
            disabled={isFirstPage}
            onPress={onPreviousPagePress}
          >
            <Icon name="icon-sonarr-pager-previous" />
          </Link>

          <div className={styles.pageNumber}>
            {
              !isShowingPageSelect &&
                <Link
                  disabled={totalPages === 1}
                  onPress={this.onOpenPageSelectClick}
                >
                  {page} / {totalPages}
                </Link>
            }

            {
              isShowingPageSelect &&
                <SelectInput
                  name="pageSelect"
                  value={page}
                  values={pages}
                  onChange={this.onPageSelect}
                />
            }
          </div>

          <Link
            className={classNames(
              styles.pageLink,
              isLastPage && styles.disabledPageButton
            )}
            disabled={isLastPage}
            onPress={onNextPagePress}
          >
            <Icon name="icon-sonarr-pager-next" />
          </Link>

          <Link
            className={classNames(
              styles.pageLink,
              isLastPage && styles.disabledPageButton
            )}
            disabled={isLastPage}
            onPress={onLastPagePress}
          >
            <Icon name="icon-sonarr-pager-last" />
          </Link>
        </div>

        <div className={styles.records}>
          Total records: {totalRecords}
        </div>
      </div>
    );
  }

}

TablePager.propTypes = {
  page: PropTypes.number,
  totalPages: PropTypes.number,
  totalRecords: PropTypes.number,
  onFirstPagePress: PropTypes.func.isRequired,
  onPreviousPagePress: PropTypes.func.isRequired,
  onNextPagePress: PropTypes.func.isRequired,
  onLastPagePress: PropTypes.func.isRequired,
  onPageSelect: PropTypes.func.isRequired
};

export default TablePager;
