import React from 'react';
import {Text, View} from 'react-native';
import {LoginHeader} from '../../Headers';
import useStyle from './styles';

const AuthHeader = props => {
  const styles = useStyle();
  const {title = '', description = ''} = props;
  return (
    <View>
      <LoginHeader />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default AuthHeader;
