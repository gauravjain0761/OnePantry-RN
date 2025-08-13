import auth from "@react-native-firebase/auth";
import {
  createAccountError,
  ReducerPath,
  Collections,
  getEmailFilters,
} from "../../Constant";
import { store } from "../../Store";
import { showPopup } from "../../Utils";
import { fakeApi, api } from "../api.service";
import { addDocument, getDocument, updateDocument } from "../fireStoreMethods";

export const authApi = fakeApi(ReducerPath.authApi).injectEndpoints({
  endpoints: (build) => ({
    createAccount: build.mutation({
      async queryFn(data) {
        try {
          const { password, ...rest } = data?.payload;
          const email = data?.payload?.email;
          await auth().createUserWithEmailAndPassword(email, password);
          const docRef = await addDocument(Collections.users, rest);
          const userData = { id: docRef.id, ...rest };
          console.log("userData", userData);

          return { data: userData };
        } catch (error) {
          const errorMessage = createAccountError(error.code);
          showPopup(errorMessage, true);
          return { error: errorMessage };
        }
      },
    }),
    login: build.mutation({
      async queryFn(data) {
        try {
          const { password, email } = data;
          await auth().signInWithEmailAndPassword(email, password);
          const response = await getDocument(
            Collections.users,
            getEmailFilters(email)
          );
          return { data: response };
        } catch (error) {
          showPopup(error.code, true);
          return { error: error.code };
        }
      },
    }),
    forgotPassword: build.mutation({
      async queryFn(email) {
        try {
          await auth().sendPasswordResetEmail(email);
          return { data: { success: true } }; // Return the user credential on success
        } catch (error) {
          showPopup(error.code, true);
          return { error: error.code };
        }
      },
    }),
    googleAuth: build.mutation({
      async queryFn(data) {
        const { payload, isLogin } = data;
        const { idToken = "", ...rest } = payload ?? {};
        try {
          if (isLogin) {
            // Ensure you pass the email from data
            const response = await getDocument(
              Collections.users,
              getEmailFilters(payload?.email)
            );
            console.log("response", response);

            // Check if response is valid and return it
            if (!response) {
              return { error: "User not found." }; // Handle case where user does not exist
            }
            const userData = { ...response, token: idToken };
            return { data: userData }; // Return user data on successful login
          } else {
            const docRef = await addDocument(Collections.users, rest);
            const userData = { id: docRef.id, ...rest, token: idToken };
            return { data: userData }; // Return user data on successful account creation
          }
        } catch (error) {
          // Handle errors and show a popup if necessary
          showPopup(error.code, true);
          return { error: error.code || "Something went wrong" }; // Return error in expected shape
        }
      },
    }),
    updateUser: build.mutation({
      async queryFn(data) {
        try {
          const docID = store.getState().user?.user?.id ?? "";
          await updateDocument(Collections.users, docID, data);
          return { data };
        } catch (error) {
          showPopup(error.code, true);
          return { error: error.code || "Something went wrong" }; // Return error in expected shape
        }
      },
    }),
    resetPassword: build.mutation({
      async queryFn(data) {
        try {
          const { password, newPassword, email } = data;
          const credential = auth.EmailAuthProvider.credential(email, password);
          const user = auth().currentUser;
          if (!user) {
            throw new Error("No user is signed in.");
          }
          await user.reauthenticateWithCredential(credential);
          await user.updatePassword(newPassword);
          return { data: { success: true } };
        } catch (error) {
          showPopup(error.message || "Failed to update password", true);
          return {
            error: {
              message: error.message || "Failed to update password",
              code: error.code || "unknown",
            },
          };
        }
      },
    }),
  }),
  overrideExisting: false,
});
export const verifyApi = api(ReducerPath.verifyApi).injectEndpoints({
  endpoints: (build) => ({
    sendOtp: build.mutation({
      query: (body) => {
        return {
          url: "https://sendotp-te2qfbt72a-uc.a.run.app",
          method: "POST",
          body,
        };
      },
    }),
    verifyOtp: build.mutation({
      query: (body) => {
        return {
          url: "https://us-central1-onepantry-us.cloudfunctions.net/verifyOTP",
          method: "POST",
          body,
        };
      },
    }),
    getUserData: build.query({
      query: (id) => {
        console.log(id, "as");
        return {
          url: `https://us-central1-onepantry-us.cloudfunctions.net/backend/api/v1/user?id=${id}`,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateAccountMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useGoogleAuthMutation,
  useUpdateUserMutation,
  useResetPasswordMutation,
} = authApi;
export const { useSendOtpMutation, useVerifyOtpMutation, useGetUserDataQuery } =
  verifyApi;
