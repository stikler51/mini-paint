import React from 'react';
import Loader from 'react-loader-spinner';
import { useAppSelector } from '../../../store/hooks';
import styles from './loader.module.scss';

const LoadingIndicator = () => {
  const isLoading = useAppSelector<boolean>((state) => state.loading.value);
  if (isLoading) {
    return (
      <div className={styles.loader}>
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={10000}
        />
      </div>
    );
  }
  return <></>;
};

export default LoadingIndicator;
