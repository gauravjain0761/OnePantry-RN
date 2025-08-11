import React from 'react';
import {Text, Image, TouchableOpacity, View} from 'react-native';
import {Images} from '../../../Constant';
import useStyle from './styles';

const ProfileInfo = props => {
  const styles = useStyle();
  const {
    title = '',
    value = '',
    isEdit = false,
    onPress = () => undefined,
  } = props;
  return (
    <View style={styles.mainView}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      {isEdit && (
        <TouchableOpacity onPress={onPress}>
          <Image
            source={Images.editAccount}
            resizeMode="contain"
            style={styles.editImage}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default ProfileInfo;
