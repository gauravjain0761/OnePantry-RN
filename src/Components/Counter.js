import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {IMAGE} from '../Constant/Images';
const Counter = ({
  style,
  styleCount,
  count,
  setcount,
  styleimg,
  sellerStyle,
}) => {
  return (
    <View
      style={
        sellerStyle ? [styles.sellerMainView, style] : [styles.mainView, style]
      }>
      <TouchableOpacity
        style={
          sellerStyle
            ? [styles.sellerFirstButton, styleimg]
            : [styles.firstButton, styleimg]
        }
        onPress={() => (count == 1 ? setcount(1) : setcount(count - 1))}>
        <Image
          style={sellerStyle ? styles.sellerRemoveButton : styles.removeButton}
          source={IMAGE.Remove}
        />
      </TouchableOpacity>
      <View
        style={
          sellerStyle
            ? [styles.sellerCountView, styleCount]
            : [styles.countView, styleCount]
        }>
        <Text
          style={sellerStyle ? styles.sellerCountButton : styles.countButton}>
          {0}
          {count}
        </Text>
      </View>
      <TouchableOpacity onPress={() => setcount(count + 1)}>
        <Image
          style={sellerStyle ? styles.sellerAddButton : styles.addButton}
          source={IMAGE.Add}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Counter;
const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 130,
    justifyContent: 'center',
    height: 75,
  },
  sellerMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 30,
    justifyContent: 'center',
    height: 25,
  },
  firstButton: {
    height: 10,
    width: 30,
    justifyContent: 'center',
  },
  sellerFirstButton: {
    height: 5,
    width: 10,
    justifyContent: 'center',
  },
  removeButton: {
    width: 20,
    height: 3.4,
    marginRight: 12,
  },
  sellerRemoveButton: {
    width: 10,
    height: 3.4,
    // marginRight: 10
  },
  countButton: {
    fontWeight: '600',
    fontSize: 19,
    color: '#000',
  },
  sellerCountButton: {
    fontWeight: '600',
    fontSize: 12,
    color: '#000',
  },
  addButton: {
    width: 20,
    height: 20,
    marginLeft: 12,
  },
  sellerAddButton: {
    width: 10,
    height: 10,
    // marginLeft: 12
  },
  countView: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sellerCountView: {
    height: 30,
    width: 30,

    // borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
