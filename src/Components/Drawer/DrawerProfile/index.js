import React from 'react';
import {isEmpty} from 'lodash';
import {View, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {Avatar} from '../../Images';
import {Images} from '../../../Constant';
import {selectUser} from '../../../Store';
import useStyle from './styles';

const DrawerProfile = () => {
  const user = useSelector(selectUser);
  const {firstName = '', email = '', image} = user || {};
  const styles = useStyle();
  return (
    <View>
      <Image style={styles.image} source={Images.header} />

      {isEmpty(image) ? (
        <Avatar
          containerStyle={styles.manImage}
          disabled={true}
          image={image}
          imageStyle={styles.imageStyle}
        />
      ) : (
        <Image style={styles.manImage} source={{uri: image}} />
      )}
      <Text style={styles.firstName}>{firstName}</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  );
};
export default DrawerProfile;
