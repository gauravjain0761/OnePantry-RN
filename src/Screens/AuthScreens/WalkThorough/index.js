import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import {StatusBar, View, Text, Image, TouchableOpacity} from 'react-native';
import {IMAGE} from '../../../Constant';
import useStyle from './styles';
import useWalkThrough from './useWalkThrough';

const WalkThrough = () => {
  const styles = useStyle();
  const {sliderRef, slides, onDone, itemHandler} = useWalkThrough();
  const renderButton = (title = '') => {
    return (
      <View style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => itemHandler(item?.key)}
          style={[
            styles.itemButton,
            item.key == 1 && styles.itemButtonSelected,
          ]}>
          {item.key !== 1 && (
            <Image
              source={IMAGE.ArrowBack}
              style={styles.itemImage}
              resizeMode="cover"
            />
          )}
        </TouchableOpacity>
        <Image
          source={item.imageOne}
          style={styles.initialImage}
          resizeMode="cover"
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.text}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={'transparent'}
      />

      <AppIntroSlider
        data={slides}
        renderItem={renderItem}
        bottomButton
        dotStyle={{backgroundColor: 'lightgrey'}}
        activeDotStyle={styles.activeDotStyle}
        dotClickEnabled={false}
        onDone={onDone}
        renderDoneButton={() => renderButton('Get Started')}
        renderNextButton={() => renderButton('Next')}
        ref={ref => (sliderRef.current = ref)}
      />
    </View>
  );
};

export default WalkThrough;
