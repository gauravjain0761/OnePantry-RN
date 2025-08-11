import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import useSellerDetails from './useSellerDetails';
import useStyle from './styles';
import {colors} from '../../../Constant';

const SellerDetails = props => {
  const styles = useStyle();
  const {onPress = () => undefined} = props;
  const {isFollow, followLoading, UserData, followHandler} = useSellerDetails();

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title}>Seller Detail</Text>
      <View style={styles.infoContainer}>
        <Image
          source={{
            uri:
              UserData?.image !== ''
                ? UserData?.image
                : 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
          }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{UserData?.firstName}</Text>
          <Text style={styles.email}>{UserData?.email}</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.sendMessageContainer}>
              <Text style={styles.buttonText}>Send a Message</Text>
            </View>
            <TouchableOpacity
              onPress={() => followHandler(UserData?.id ?? '')}
              style={styles.followButton}>
              {followLoading ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <Text style={styles.buttonText}>
                  {!isFollow ? 'Follow' : 'UnFollow'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SellerDetails;
