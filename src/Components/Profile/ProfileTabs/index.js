import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import useStyle from './styles';

const ProfileTabs = () => {
  const styles = useStyle();
  const [toggle, setToggle] = useState(1);

  return (
    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
      <TouchableOpacity
        onPress={() => setToggle(1)}
        style={[styles.button, toggle === 1 && styles.activeButton]}>
        <Text style={[styles.title, toggle === 1 && styles.selectedTitle]}>
          Edit Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setToggle(2)}
        style={[styles.button, toggle === 2 && styles.activeButton]}>
        <Text style={[styles.title, toggle === 2 && styles.selectedTitle]}>
          Security Credentials
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default ProfileTabs;
