import React from 'react';
import {View} from 'react-native';
import {SocialButton} from '../../Buttons';
import {colors} from '../../../Constant';
import useStyle from './styles';

const SocialButtons = props => {
  const styles = useStyle();
  const {onPressFacebook = () => undefined, onPressGoogle = () => undefined} =
    props;
  return (
    <View style={styles.container}>
      <SocialButton onPress={onPressFacebook} color={colors.azure} text={'f'} />
      <SocialButton
        onPress={onPressGoogle}
        color={colors.thunderbird}
        text={'G'}
      />
    </View>
  );
};

export default SocialButtons;
