import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React, {useState} from 'react';
import {Button, Header} from '../../../Components';
import {Images} from '../../../Constant/Images';
import {ScreenNames} from '../../../Constant';
import useAddAddress from './useAddAddress';
import useStyle from './styles';

const AddAddress = () => {
  const styles = useStyle();
  const {
    type,
    address,
    isSelected,
    isLoading,
    selectAddressHandler,
    deleteHandler,
    setIsSelected,
    navigationHandler,
  } = useAddAddress();

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.checkContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsSelected(index);
            }}
            style={styles.checkButton}>
            <Image
              style={styles.checkImage}
              source={
                index == isSelected ? Images.checkbox : Images.checkBoxOff
              }
            />
          </TouchableOpacity>
          <Text style={styles.checkText}>{`Use as the ${type} address`}</Text>
        </View>
        <View style={styles.addressItemDetailContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>
                {`${item?.firstName} ${item?.lastName}`}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigationHandler(ScreenNames.EditAddress, {
                    address: item,
                    type,
                  })
                }>
                <Image
                  source={Images.editCard}
                  style={styles.buttonImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.addressText}>
            {`${item?.apartment}, ${item?.address}, ${item?.zipCode}, ${
              item?.city ?? ''
            }, ${item?.state} , ${item?.country}`}
          </Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteHandler(item?.id)}>
            <Image
              source={Images.bin}
              style={styles.buttonImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header text="Address" />
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigationHandler(ScreenNames.AddressForm, {type})}>
          <Image style={styles.image} source={Images.addGreenCircle} />
          <Text style={styles.buttonText}>
            {type !== undefined ? `Add ${type} Address` : 'Add Address'}
          </Text>
        </TouchableOpacity>
        <FlatList
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          data={address}
          contentContainerStyle={styles.contentContainerStyle}
        />
        {address.length > 0 && (
          <Button
            title="Next"
            style={styles.button}
            disabled={isSelected === -1}
            onPress={selectAddressHandler}
            loader={isLoading}
          />
        )}
      </View>
    </View>
  );
};

export default AddAddress;
