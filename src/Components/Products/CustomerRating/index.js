import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Images} from '../../../Constant';
import useStyle from './styles';

const CustomerRating = props => {
  const styles = useStyle();
  const {rating = 5, setDefaultRating} = props;
  const array = Array.from({length: rating}, (_, index) => index + 1);
  return (
    <View style={styles.customRatingBarStyle}>
      {array.map(item => {
        return (
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            key={item}
            onPress={() => setDefaultRating(item)}>
            <Image style={styles.image} source={Images.rating} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomerRating;
