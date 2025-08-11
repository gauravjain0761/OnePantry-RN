import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {Images} from '../../../Constant/Images/index';
import {selectUser} from '../../../Store';
import useStyle from './styles';

const HomeHeader = () => {
  const styles = useStyle();
  const user = useSelector(selectUser);
  const {firstName = ''} = user || {};
  const {dispatch} = useNavigation();
  const toggleDrawer = () => {
    dispatch(DrawerActions.toggleDrawer());
  };
  return (
    <View>
      <View>
        <Image
          source={Images.header}
          resizeMode="cover"
          style={styles.bgImage}
        />
        <Image source={Images.logo} style={styles.logo} />
        <TouchableOpacity onPress={toggleDrawer} style={styles.toggle}>
          <Image
            source={Images.sideBar}
            resizeMode="contain"
            style={styles.sideBar}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.helloText}>
          Hello,<Text style={styles.userName}>{firstName}</Text>
        </Text>
        <Text style={styles.description}>Find Good Food For A Health Body</Text>
      </View>
    </View>
  );
};

export default HomeHeader;
