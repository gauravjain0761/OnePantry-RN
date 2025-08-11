import React from 'react';
import {View, Image} from 'react-native';
import {IMAGE} from '../../../Constant';
import useStyle from './styles';

const LoginHeader = () => {
  const styles = useStyle();
  return (
    <View>
      <Image source={IMAGE.loginBG} style={styles.image} />
      <View style={styles.container}>
        <Image source={IMAGE.Logo} style={styles.logo} />
      </View>
    </View>
  );
};

export default LoginHeader;
