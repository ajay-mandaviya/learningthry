export { default as apiClient, api } from './api';
export { sendOTP, verifyOTP, resendOTP } from './otpService';
export type { ApiResponse, ApiError } from './api';
export type { 
  SendOTPRequest, 
  SendOTPResponse, 
  VerifyOTPRequest, 
  VerifyOTPResponse 
} from './otpService';
