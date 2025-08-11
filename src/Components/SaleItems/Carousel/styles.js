import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';
import {hp, wp} from '../../../Utils';

const useStyle = () => {
  return StyleSheet.create({
    carouselContainer: {
      alignItems: 'center',
      height: hp(25),
      width: wp(100),
      backgroundColor: colors.maroon,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      marginBottom: 40,
    },
    categoryContainer: {
      padding: 10,
      marginRight: 18,
      marginTop: 15,
      borderRadius: 5,
      backgroundColor: colors.geraldine,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-end',
    },
    categoryName: {
      fontWeight: '500',
      fontSize: 10,
      color: colors.congoPink,
    },
    image: {
      width: 130,
      height: 150,
    },
    dummyImage: {
      width: 130,
      height: 150,
      backgroundColor: colors.silver,
    },
    paginationContainer: {
      backgroundColor: colors.white,
      width: wp(100),
      height: hp(3),
      marginBottom: -7,
    },
    dotContainerStyle: {
      height: 5,
      width: 5,
      marginTop: -40,
    },
    dotStyle: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.primary,
    },
    inactiveDotStyle: {
      backgroundColor: colors.grey,
    },
    modalView: {
      margin: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.black80,
    },
    modal: {
      height: hp(50),
      width: wp(90),
      borderRadius: 20,
      backgroundColor: colors.monza,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
export default useStyle;
