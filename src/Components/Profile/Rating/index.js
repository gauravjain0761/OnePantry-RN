import React from 'react';
import {View, Text} from 'react-native';
import useStyle from './styles';

const RatingCard = props => {
  const styles = useStyle();
  const {rating = 0} = props;
  return (
    <View style={styles.mainView}>
      <View style={styles.rowContainer}>
        <Text style={styles.textTitle}>Profile Ratings</Text>
        <Text style={styles.textTitle}>{`${rating} Customer Ratings`}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.textRating}>{`${rating} out of 5`}</Text>
      </View>
    </View>
  );
};

export default RatingCard;
