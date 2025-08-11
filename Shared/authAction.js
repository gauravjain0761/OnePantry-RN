
import REQUEST from "./requestConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "./request";

const registerOtpVerify = createAsyncThunk('registerOtpVerify', async (payload) => {
    const response = await API.post(REQUEST.AUTH.VERIFY_REGISTER_OTP, payload)
    // payload?.onSuccess(response)
    // return response
})


const loginOtpVerify = createAsyncThunk('loginOtpVerify', async (payload) => {
    const response = await API.post(REQUEST.AUTH.VERIFY_LOGIN_OTP, payload)
    // payload?.onSuccess(response)
    // return response
})

export{
    registerOtpVerify,
    loginOtpVerify
}
