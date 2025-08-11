import React from 'react';
import Modal from 'react-native-modal';
import {ActivityIndicator} from 'react-native';
import {colors} from '../../../Constant';
import useStyle from './styles';

const Loader = props => {
  const {isVisible = false} = props;
  const styles = useStyle();
  return (
    <Modal isVisible={isVisible} swipeDirection="down" style={styles.modal}>
      <ActivityIndicator size={'large'} color={colors.primary} />
    </Modal>
  );
};
export default Loader;
