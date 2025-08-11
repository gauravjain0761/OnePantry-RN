import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Images} from '../../../Constant';
import useStyle from './styles';

const EmptyList = props => {
  const styles = useStyle();
  const {onRefresh} = props;
  return (
    <View style={styles.container}>
      <Image
        source={Images.emptyFavorite}
        resizeMode="contain"
        style={styles.emptyFavorite}
      />
      <Text style={styles.noItems}>{'No items here'}</Text>
      <TouchableOpacity onPress={onRefresh}>
        <Image
          source={Images.refresh}
          resizeMode="contain"
          style={styles.refresh}
        />
      </TouchableOpacity>
    </View>
  );
};

export default EmptyList;
