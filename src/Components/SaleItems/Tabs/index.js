import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import useStyle from './styles';

const AddItemTab = props => {
  const styles = useStyle();
  const {isSelected = 1, onPress} = props;

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => onPress(1)}
        style={[
          styles.activeButton,
          isSelected === 2 && styles.inactiveButton,
        ]}>
        <Text
          style={[styles.activeText, isSelected === 2 && styles.inActiveText]}>
          For Sale
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPress(2)}
        style={[
          styles.activeButton,
          isSelected === 1 && styles.inactiveButton,
        ]}>
        <Text
          style={[styles.activeText, isSelected === 1 && styles.inActiveText]}>
          Drafts
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddItemTab;
