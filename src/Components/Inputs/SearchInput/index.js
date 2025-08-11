import React from 'react';
import {View, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import {Images} from '../../../Constant';
import useSearchInput from './useSearchInput';
import useStyle from './styles';

const SearchInput = props => {
  const styles = useStyle();
  const {navigateHandler} = useSearchInput();
  const {
    style,
    styleView,
    isSeller,
    isButton,
    onPress,
    onSubmitEditing,
    onChangeText,
  } = props;

  return (
    <View>
      <View style={[styles.mainView, styleView]}>
        {isButton ? (
          <TouchableOpacity onPress={navigateHandler} style={styles.button}>
            <Image source={Images.search} style={styles.searchImage} />
            <Text style={styles.searchText}>{'Search'}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.inputContainer}>
            <Image source={Images.search} style={styles.searchImage} />
            <TextInput
              style={[styles.inputStyle, style]}
              placeholder="Search"
              returnKeyType="search"
              onSubmitEditing={onSubmitEditing}
              onChangeText={onChangeText}
            />
          </View>
        )}
        <TouchableOpacity onPress={onPress}>
          <Image
            source={isSeller ? Images.filterSeller : Images.filter}
            resizeMode="contain"
            style={[styles.filter, isSeller && styles.filterMargin]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchInput;
