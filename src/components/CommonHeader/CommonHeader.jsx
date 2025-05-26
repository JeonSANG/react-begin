import React from 'react';
import styles from './CommonHeader.module.css'; // CSS 모듈 가져오기

const CommonHeader = ({ msg }) => {
  return (
    <div>
      <div className={styles.masthead}>
      </div>
    </div>
  );
};

export default CommonHeader;
