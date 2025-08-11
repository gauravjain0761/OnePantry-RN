import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Image} from 'react-native';
import {colors, Images} from '../../../Constant';
import useSplash from './useSplash';
import useStyle from './styles';

const Splash = () => {
  const styles = useStyle();
  useSplash();

  return (
    <LinearGradient
      colors={[colors.primary, colors.conifer, colors.conifer]}
      style={styles.linearGradient}>
      <Image source={Images.logo} style={styles.image} />
    </LinearGradient>
  );
};

export default Splash;
