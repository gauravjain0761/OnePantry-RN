import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';
import {wp} from '../../../Utils';

const useStyle = () => {
  return StyleSheet.create({
    initialContainer: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.white,
      width: 80,
      height: 80,
      marginTop: 20,
      marginBottom: 5,
      borderRadius: 40,
    },
    imageContainer: {
      alignSelf: 'center',
      marginTop: 20,
    },
    initialText: {
      color: colors.primary,
      fontSize: 25,
      fontWeight: 'bold',
    },
    camera: {
      width: 33,
      height: 33,
      bottom: 3,
      right: 0,
      position: 'absolute',
    },
    image: {
      width: 80,
      height: 80,
      marginTop: 20,
      marginBottom: 5,
      borderRadius: 40,
    },
  });
};
export default useStyle;
