import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {
  useFollowUnFollowMutation,
  useGetUserDataQuery,
} from '../../../Services';
import {selectUser} from '../../../Store';

export default () => {
  const user = useSelector(selectUser);
  const route = useRoute();
  const productDetails = route?.params?.item ?? {};
  const [isFollow, setIsFollow] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const {id = ''} = user ?? {};
  const {user_id = ''} = productDetails;
  const {data, refetch} = useGetUserDataQuery(user_id);
  const UserData = data?.data ?? {};
  const [followUnFollow, {isLoading}] = useFollowUnFollowMutation();
  const followHandler = useCallback(
    async userId => {
      const payload = {
        userId: id,
        userIdToFollow: userId,
      };
      setFollowLoading(true);
      const response = await followUnFollow(payload);
      if (response?.data) {
        await refetch();
        setIsFollow(!isFollow);
      }
      setFollowLoading(false);
    },
    [id, isFollow],
  );
  useEffect(() => {
    if (UserData) {
      const {followers = []} = UserData;
      const isFollower = followers.some(item => item === user?.id);
      setIsFollow(isFollower);
    }
  }, [UserData]);
  return {isLoading, isFollow, UserData, followLoading, followHandler};
};
