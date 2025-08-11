import isEmpty from 'lodash/isEmpty';
import React, {useState, forwardRef, useCallback} from 'react';
import {Controller} from 'react-hook-form';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
} from 'react-native';
import {Images, colors} from '../../../Constant';
import useStyle from './styles';

const Input = forwardRef((props, ref) => {
  const {
    control,
    name,
    label = '',
    placeholder,
    isSecureTextEntry = false,
    keyboardType = 'default',
    returnKeyType = 'next',
    editable = true,
    onSubmitEditing = () => {},
    containerStyle = {},
    inputStyle = {},
    labelStyles = {},
    multiline = false,
    image,
  } = props;

  const styles = useStyle();
  const [secureTextEntry, setSecureTextEntry] = useState(isSecureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const PasswordAction = useCallback(() => {
    return (
      isSecureTextEntry && (
        <TouchableOpacity
          onPress={() => setSecureTextEntry(!secureTextEntry)}
          style={styles.passWordContainer}>
          <Image
            source={secureTextEntry ? Images.show : Images.closedEye}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )
    );
  }, [isSecureTextEntry, secureTextEntry]);

  const ErrorIndication = useCallback(
    error =>
      !isFocused &&
      error && <Text style={styles.errorText}>{error?.message}</Text>,
    [isFocused],
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {value, onBlur, onChange}, fieldState: {error}}) => (
        <View>
          {!isEmpty(label) && (
            <Text style={[styles.label, labelStyles]}>{label}</Text>
          )}
          <View style={[styles.container, containerStyle]}>
            {image && (
              <Image source={image} style={styles.image} resizeMode="contain" />
            )}
            <TextInput
              ref={ref}
              placeholder={placeholder}
              value={!isEmpty(value) ? String(value) : ''}
              style={[styles.input, multiline && styles.multiline, inputStyle]}
              placeholderTextColor={colors.lightGray}
              secureTextEntry={secureTextEntry}
              blurOnSubmit={false}
              autoCorrect={false}
              editable={editable}
              returnKeyType={returnKeyType}
              keyboardType={keyboardType}
              multiline={multiline}
              autoCapitalize="none"
              onChangeText={text => onChange(text)}
              onFocus={handleFocus}
              onBlur={() => {
                onBlur();
                handleBlur();
              }}
              onSubmitEditing={() => {
                Keyboard.dismiss();
                onSubmitEditing();
              }}
            />
            {PasswordAction()}
          </View>
          {ErrorIndication(error)}
        </View>
      )}
    />
  );
});

export default Input;
