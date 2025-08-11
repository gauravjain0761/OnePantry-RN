import React from 'react';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button, Dropdown, Header, TextInput} from '../../../Components';
import {CanadianProvinces, Countries, USStates} from '../../../Constant';
import useAddressForm from './useAddressForm';
import useStyle from './styles';

const AddressForm = () => {
  const styles = useStyle();
  const {
    type = '',
    control,
    country,
    isLoading,
    state,
    setState,
    onSubmitHandler,
    setCountry,
  } = useAddressForm();

  return (
    <View style={styles.container}>
      <Header text={`${type}  Address`} isEdit />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.nameInputContainer}>
          <TextInput
            label="First Name"
            name="firstName"
            placeholder="Enter first name"
            control={control}
            containerStyle={styles.inputContainer}
            labelStyles={styles.textLabel}
          />
          <TextInput
            label="last Name"
            name="lastName"
            placeholder="Enter last name"
            control={control}
            containerStyle={styles.inputContainer}
            labelStyles={styles.textLabel}
          />
        </View>
        <TextInput
          label="Address"
          name="address"
          placeholder="Address"
          control={control}
          labelStyles={styles.textLabel}
        />
        <TextInput
          label="Apartment,suite,etc."
          name="apartment"
          placeholder="Apartment,suite,etc."
          control={control}
          labelStyles={styles.textLabel}
        />
        <TextInput
          label="City"
          name="city"
          placeholder="City."
          control={control}
          labelStyles={styles.textLabel}
        />
        <Text style={styles.textLabel}>{'Country'}</Text>
        <Dropdown
          placeholder={'Select Country'}
          value={country}
          data={Countries}
          setValue={setCountry}
        />
        <Text style={styles.textLabel}>{'State'}</Text>
        <Dropdown
          placeholder={'Select State'}
          value={state}
          data={country === 'USA' ? USStates : CanadianProvinces}
          setValue={setState}
        />
        <TextInput
          label="ZIP/Postal Code"
          name="zipCode"
          placeholder="Zip Code"
          control={control}
          labelStyles={styles.textLabel}
        />
        <Button
          title="Save"
          style={styles.button}
          loader={isLoading}
          onPress={onSubmitHandler}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddressForm;
