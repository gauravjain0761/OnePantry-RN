import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../../Constant/Images/index';
import useStyle from './styles';
import {ShowAlert} from '../../../Utils';

const Header = props => {
  const styles = useStyle();
  const {text, image, onPress, imageStyle, isEdit = false} = props;
  const {goBack} = useNavigation();
  const backHandler = () => {
    if (isEdit) {
      const alertObject = {
        title: 'Hold on!',
        message: 'Are you sure you want to go back?',
        okText: 'Yes',
        onPressOk: goBack,
      };
      ShowAlert(alertObject);
    } else {
      goBack();
    }
  };

  return (
    <View style={styles.mainView}>
      <TouchableOpacity onPress={backHandler}>
        <Image source={Images.back} resizeMode="contain" style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.textView}>
        <Text style={[styles.text]}>{text}</Text>
      </View>
      {image && (
        <TouchableOpacity onPress={onPress}>
          <Image
            source={image}
            resizeMode="contain"
            style={[styles.icon, imageStyle]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
