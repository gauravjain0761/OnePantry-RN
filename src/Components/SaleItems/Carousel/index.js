import Modal from "react-native-modal";
import React, { useState } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { wp } from "../../../Utils";
import useStyle from "./styles";
import { hp, SCREEN_WIDTH } from "../../Config";

const CarouselComponent = (props) => {
  const styles = useStyle();
  const { product_images = [], CategoryData } = props;
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(0);

  const renderItem = ({ item }) => {
    const imageUrl = decodeURIComponent(item) ?? null;
    return (
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => setIsVisible(true)}
      >
        {imageUrl ? (
          <Image
            style={styles.image}
            source={{ uri: imageUrl }}
            resizeMode="stretch"
          />
        ) : (
          <View style={styles.dummyImage} />
        )}
      </TouchableOpacity>
    );
  };
  const renderModalItem = ({ item }) => {
    const imageUrl = decodeURIComponent(item) ?? null;
    return (
      <View>
        {imageUrl ? (
          <Image style={styles.image} source={{ uri: imageUrl }} />
        ) : (
          <View style={styles.dummyImage} />
        )}
      </View>
    );
  };
  const pagination = () => {
    return (
      <Pagination
        dotsLength={product_images?.length}
        activeDotIndex={activeSlide}
        dotContainerStyle={styles.dotContainerStyle}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dotStyle}
        inactiveDotOpacity={0.5}
        inactiveDotScale={0.9}
        inactiveDotStyle={styles.inactiveDotStyle}
      />
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryName}>{CategoryData?.name}</Text>
      </View>
      <Carousel
        data={product_images}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveSlide(index)}
        sliderWidth={SCREEN_WIDTH}
        sliderHeight={hp(70)}
        itemHeight={hp(70)}
        itemWidth={SCREEN_WIDTH}
      />
      {pagination()}

      {/* <Modal
        visible={isVisible}
        style={styles.modalView}
        onBackdropPress={() => setIsVisible(false)}
        animationType="slid"
      >
        <View style={styles.modal}>
          <Carousel
            data={product_images}
            renderItem={renderModalItem}
            onSnapToItem={(index) => setActiveSlide(index)}
            sliderWidth={wp(35)}
            itemWidth={wp(50)}
          />
          {pagination()}
        </View>
      </Modal> */}
    </View>
  );
};
export default CarouselComponent;
