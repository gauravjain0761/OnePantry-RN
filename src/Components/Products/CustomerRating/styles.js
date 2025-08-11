import {StyleSheet} from 'react-native';

const useStyle = () => {
  return StyleSheet.create({
    customRatingBarStyle: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 10,
      marginRight: 10,
    },
    button: {
      marginRight: 5,
    },
    image: {
      width: 15,
      height: 15,
    },
  });
};
export default useStyle;
