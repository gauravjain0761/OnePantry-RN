import React from 'react';
import {View} from 'react-native';
import useStyle from './styles';

const CustomerDetails = props => {
  const styles = useStyle();
  const {seller = {}} = props;

  return <View style={styles.carouselContainer}></View>;
};
export default CustomerDetails;
