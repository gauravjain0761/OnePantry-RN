import React from 'react';
import {View, Text, Pressable} from 'react-native';
import useStyle from './styles';

const AccountText = props => {
  const styles = useStyle();
  const {
    prefixText = '',
    postfixText = '',
    containerStyle = {},
    onPress = () => undefined,
  } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.prefixText}>{prefixText}</Text>
      <Pressable onPress={onPress}>
        <Text style={styles.postfixText}> {postfixText}</Text>
      </Pressable>
    </View>
  );
};

export default AccountText;
