import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {IMAGE} from '../Constant/Images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {wp} from './Config';
const ItemInRowComponent = ({
  Onlike,
  title,
  address,
  onpress,
  titletwo,
  titletwoValue,
  styleView,
  styleTitle,
  styleTitletwo,
  image,
  like,
}) => {
  return (
    <View style={[styles.maunView, styleView]}>
      <Text style={[styles.title, styleTitle]}>{title}</Text>
      {image ? (
        <TouchableOpacity onPress={Onlike}>
          {like == false ? (
            <Image
              style={{width: 25, height: 25, marginRight: 6}}
              source={IMAGE.Like}
            />
          ) : (
            <Image
              style={{width: 23, height: 19, marginRight: 6}}
              source={IMAGE.liked}
            />
          )}
        </TouchableOpacity>
      ) : address ? (
        <TouchableOpacity
          onPress={onpress}
          style={{
            width: wp(40),
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          {/* <Image style={{ width: 20, height: 20, marginRight: 6 }} source={IMAGE.AddGreenCircle} /> */}
          <Text style={{fontSize: 14, color: 'black'}}>{titletwoValue}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onpress}
          style={{width: wp(40), alignItems: 'flex-end'}}>
          <Text style={[styles.titletwo, styleTitletwo]}>{titletwo}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ItemInRowComponent;
const styles = StyleSheet.create({
  maunView: {
    flexDirection: 'row',
    padding: 3,
    justifyContent: 'space-between',
    width: wp(92),
    alignSelf: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    color: '#000000B2',
  },
  titletwo: {
    fontWeight: '400',
    fontSize: 10,
    color: '#808080',
  },
});
