import {View, Text} from 'react-native';
import React from 'react';
import useStyle from './styles';

const DetailTextComponent = props => {
  const styles = useStyle();
  const {title, value, titleStyle, valueStyle} = props;
  return (
    <View style={{padding: 18}}>
      <Text style={[styles.text, titleStyle]}>{title}</Text>
      <Text style={[styles.value, valueStyle]}>{value}</Text>
    </View>
  );
};

export default DetailTextComponent;
