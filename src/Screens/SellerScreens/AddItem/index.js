import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Images} from '../../../Constant/Images';
import {Button, Header} from '../../../Components';
import useAddItem from './useAddItem';
import useStyle from './styles';

const AddItem = ({}) => {
  const styles = useStyle();
  const {toggle, setToggle, navigationHandler} = useAddItem();

  return (
    <View style={styles.container}>
      <Header text="My Items" />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setToggle(1)}
          style={[styles.activeButton, toggle === 2 && styles.inactiveButton]}>
          <Text
            style={[styles.activeText, toggle === 2 && styles.inActiveText]}>
            For Sale
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setToggle(2)}
          style={[styles.activeButton, toggle === 1 && styles.inactiveButton]}>
          <Text
            style={[styles.activeText, toggle === 1 && styles.inActiveText]}>
            Drafts
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.addButtonContainer}>
        <Button
          title={'+'}
          style={styles.button}
          color={styles.buttonColor}
          onPress={navigationHandler}
        />
        <Image
          source={Images.back}
          resizeMode="contain"
          style={styles.backImage}
        />
        <Text style={styles.addItem}>Add Items</Text>
      </View>
    </View>
  );
};

export default AddItem;
