import React from 'react';
import {View} from 'react-native';
import {AccountText} from '../../Texts';
import {colors} from '../../../Constant';
import {Button, SocialButton} from '../../Buttons';
import useAuthFooter from './useAuthFooter';
import useStyle from './styles';

const AuthFooter = props => {
  const styles = useStyle();
  const {
    loader = false,
    buttonTitle = '',
    accountPrefixText = '',
    accountPostfixText = '',
    onPress = () => undefined,
    onPressText = () => undefined,
    onPressGoogle = () => undefined,
    onPressFacebook = () => undefined,
  } = props;
  const {googleHandler} = useAuthFooter(onPressGoogle, onPressFacebook);
  return (
    <View style={styles.bottomView}>
      <Button
        title={buttonTitle}
        style={styles.button}
        onPress={onPress}
        loader={loader}
      />
      <View style={styles.socialContainer}>
        {/* <SocialButton
          onPress={onPressFacebook}
          color={colors.azure}
          text={'f'}
        /> */}
        <SocialButton
          onPress={googleHandler}
          color={colors.thunderbird}
          text={'G'}
        />
      </View>
      <AccountText
        prefixText={accountPrefixText}
        postfixText={accountPostfixText}
        onPress={onPressText}
      />
    </View>
  );
};

export default AuthFooter;
