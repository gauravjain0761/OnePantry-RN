import storage from '@react-native-firebase/storage';
import {ReducerPath} from '../../Constant';
import {fakeApi} from '../api.service';
import {showPopup} from '../../Utils';

export const configApi = fakeApi(ReducerPath.configApi).injectEndpoints({
  endpoints: build => ({
    updateFile: build.mutation({
      async queryFn(data) {
        try {
          const {image, path} = data;
          const {uri} = image;
          const fileUri = uri.startsWith('file://') ? uri : `file://${uri}`;
          const task = storage().ref(path).putFile(fileUri);
          await task;

          const downloadUrl = await storage().ref(path).getDownloadURL();
          return {data: downloadUrl};
        } catch (error) {
          showPopup('Failed to upload image', true);
          console.error('Failed to upload image:', error);
          return {error: error}; // Propagate error to handle in UI
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {useUpdateFileMutation} = configApi;
