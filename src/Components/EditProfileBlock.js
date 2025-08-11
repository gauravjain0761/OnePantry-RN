import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {hp, wp} from './Config';
import {IMAGE} from '../Constant/Images';
const EditProfileBlock = ({
  title,
  value,
  name,
  setname,
  edit,
  address,
  editaddress,
  setedit,
  editbox,
  index,
}) => {
  const [indexvalue, setindex] = useState();
  return (
    <View style={styles.mainView}>
      <Text style={[styles.textTitle, {marginBottom: edit == true ? 0 : 7}]}>
        {title}
      </Text>
      {edit !== true ? (
        <>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.textValue}>{value} </Text>
            {editbox && (
              <TouchableOpacity
                onPress={() => {
                  setindex(index), setedit(true);
                }}>
                <Image
                  source={IMAGE.EditAccount}
                  resizeMode="contain"
                  style={{width: 15, height: 15}}
                />
              </TouchableOpacity>
            )}
            {address && (
              <TouchableOpacity onPress={editaddress} style={{}}>
                <Image
                  source={IMAGE.EditAccount}
                  resizeMode="contain"
                  style={{width: 15, height: 15}}
                />
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <>
          {index === indexvalue && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TextInput
                style={styles.editView}
                onChangeText={setname}
                value={name}
              />
              {
                <TouchableOpacity onPress={() => setedit(false)}>
                  <Image
                    source={IMAGE.Delete}
                    resizeMode="contain"
                    style={{width: 15, height: 15}}
                  />
                </TouchableOpacity>
              }
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default EditProfileBlock;
const styles = StyleSheet.create({
  mainView: {
    width: wp(90),
    backgroundColor: '#fff',
    height: hp(9.4),
    alignSelf: 'center',
    borderRadius: 5,
    padding: 19,
    justifyContent: 'center',
    marginTop: 10,
    elevation: 2,
  },
  editView: {
    height: hp(5),
    width: wp(75),
    fontSize: 14,
    color: '#242424',
    fontWeight: '400',
    right: 5,
    top: 4,
    backgroundColor: '#E5E5E5',
  },
  textTitle: {
    fontWeight: '400',
    fontSize: 12,
    color: '#808080',
  },
  textValue: {
    fontWeight: '400',
    fontSize: 14,
    color: '#242424',
    width: 270,
  },
});
