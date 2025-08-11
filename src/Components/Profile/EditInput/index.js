import React from 'react';
import {Controller} from 'react-hook-form';
import {Text, View, TextInput} from 'react-native';
import useStyle from './styles';

const ProfileInfo = props => {
  const styles = useStyle();
  const {title = '', name, control} = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {value, onChange}}) => (
        <View style={styles.mainView}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.editView}
              onChangeText={onChange}
              value={value}
              returnKeyType="done"
            />
          </View>
        </View>
      )}
    />
  );
};
export default ProfileInfo;
