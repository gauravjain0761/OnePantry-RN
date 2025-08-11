import React from 'react';
import {Button} from '../../Buttons';
import {View, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Images, ScreenNames} from '../../../Constant';
import useStyle from './styles';

const AddItemTab = props => {
  const styles = useStyle();
  const {navigate} = useNavigation();
  const {isLoading = false} = props;
  if (isLoading) return null;
  return (
    <View style={styles.addButtonContainer}>
      <Button
        title={'+'}
        style={styles.button}
        color={styles.buttonColor}
        onPress={() => navigate(ScreenNames.AddItemScreen)}
      />
      <Image
        source={Images.back}
        resizeMode="contain"
        style={styles.backImage}
      />
      <Text style={styles.addItem}>Add Items</Text>
    </View>
  );
};

export default AddItemTab;
