import React, {useContext} from 'react';
import {isEmpty} from 'lodash';
import {View, ScrollView} from 'react-native';
import {
  Avatar,
  Header,
  ProfileButton,
  ProfileInfo,
  ProfileTabs,
  Rating,
  ResetPassword,
  EditInput,
  Button,
} from '../../Components';
import {AuthContext} from '../../Providers/AuthProvider';
import {ScreenNames} from '../../Constant';
import useProfile from './useProfileScreen';
import useStyle from './styles';

const Profile = () => {
  const styles = useStyle();
  const {
    user,
    modalRef,
    control,
    isDirty,
    loading,
    image,
    setImage,
    navigationHandler,
    onSubmitHandler,
  } = useProfile();
  const {
    userName = '',
    walletBalance = 0,
    rating = 0,
    followers = [],
    email = '',
    address = {},
  } = user ?? {};
  const {userDetail} = useContext(AuthContext);

  const addressValue = !isEmpty(address)
    ? userDetail?.result?.addressDetail?.apt_suite +
      ' , ' +
      userDetail?.result?.addressDetail?.name +
      '  ' +
      userDetail?.result?.addressDetail?.street +
      ' ,' +
      userDetail?.result?.addressDetail?.city +
      ' ' +
      userDetail?.result?.addressDetail?.state?.name +
      ' ,' +
      userDetail?.result?.addressDetail?.country?.name
    : 'No Address Detail Added';

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <Header text={userName ?? ''} />
        <ProfileTabs />
        <Avatar image={image} onPress={img => setImage(img)} />
        <EditInput control={control} name="firstName" title="First name" />
        <EditInput control={control} name="lastName" title="Last name" />
        <ProfileInfo value={email} title={'Email ID'} />
        <ProfileInfo
          value={addressValue}
          title={'Address'}
          isEdit={!isEmpty(address)}
          onPress={() =>
            navigationHandler(
              ScreenNames.EditAddress,
              userDetail?.result?.addressDetail,
            )
          }
        />
        <ProfileInfo value={followers.length} title={'Number of followers'} />
        <Rating rating={rating} />
        <ProfileInfo value={`$${walletBalance}`} title={'Balance Credit'} />
        <View>
          <ProfileButton
            title={'Bank Information'}
            isBank={true}
            onPress={() => navigationHandler(ScreenNames.AddBankDetails)}
          />
          <ProfileButton title={'Followers'} />
          <ProfileButton
            title={'Shipping Address'}
            onPress={() =>
              navigationHandler(ScreenNames.AddAddress, {type: 'shipping'})
            }
          />
          <ProfileButton
            title={'Billing Address'}
            onPress={() =>
              navigationHandler(ScreenNames.AddAddress, {type: 'billing'})
            }
          />
          <ProfileButton title={'Past Order'} />
          <ProfileButton title={'Reviews'} />
          <ProfileButton
            title={'Reset Password'}
            onPress={() => modalRef?.current?.show()}
          />
        </View>
        {isDirty && (
          <Button
            title="Save"
            style={styles.button}
            loader={loading}
            onPress={onSubmitHandler}
          />
        )}
        <ResetPassword ref={modalRef} />
      </ScrollView>
    </View>
  );
};

export default Profile;
