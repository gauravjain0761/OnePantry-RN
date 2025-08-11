import {StyleSheet} from 'react-native';
const useStyle = () => {
  return StyleSheet.create({
    linearGradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      height: 170,
      width: 170,
    },
  });
};
export default useStyle;
