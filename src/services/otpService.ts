import { api } from './api';

// OTP API Types
export interface SendOTPRequest {
  mobile: string;
}

export interface SendOTPResponse {
  success: boolean;
  message: string;
  otpId?: string;
  expiresIn?: number;
}

export interface VerifyOTPRequest {
  mobile: string;
  otp: string;
  otpId?: string;
}

export interface VerifyOTPResponse {
  status: number;
  message: string;
  data?: {
    token: string;
    user: {
      id: number;
      mobile: string;
      name: string;
    };
  };
}

/**
 * Send OTP to mobile number
 * @param mobile - Mobile number without country code
 * @returns Promise<SendOTPResponse>
 */
export const sendOTP = async (mobile: string): Promise<SendOTPResponse> => {
  try {
    const response = await api.post<SendOTPResponse>('/utility/send-otp-mobile', {
      mobile: mobile,
    });
    console.log('Send OTP Response:', response);

    const responseData = response.data.data || response.data;
    return responseData as SendOTPResponse;
  } catch (error: any) {
    console.error('Send OTP Error:', error);
    
    // Handle specific error cases
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error('Failed to send OTP. Please try again.');
    }
  }
};

/**
 * Verify OTP
 * @param mobile - Mobile number
 * @param otp - 6-digit OTP code
 * @param otpId - Optional OTP ID from send response
 * @returns Promise<VerifyOTPResponse>
 */
export const verifyOTP = async (mobile: string, otp: string, type: number): Promise<VerifyOTPResponse> => {
  try {
    const response = await api.post<VerifyOTPResponse>('/auth/login-otp-mobile', {
      mobile: mobile,
      otp,
      type,
    });

    const responseData = response.data.data || response.data;
    return responseData as VerifyOTPResponse;
  } catch (error: any) {
    console.error('Verify OTP Error:', error);
    
    // Handle specific error cases
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error('Failed to verify OTP. Please try again.');
    }
  }
};

/**
 * Resend OTP
 * @param mobile - Mobile number
 * @returns Promise<SendOTPResponse>
 */
export const resendOTP = async (mobile: string): Promise<SendOTPResponse> => {
  try {
    const response = await api.post<SendOTPResponse>('/utility/resend-otp-mobile', {
      mobile: mobile.replace(/\D+/g, ''),
    });

    const responseData = response.data.data || response.data;
    return responseData as SendOTPResponse;
  } catch (error: any) {
    console.error('Resend OTP Error:', error);
    
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error('Failed to resend OTP. Please try again.');
    }
  }
};