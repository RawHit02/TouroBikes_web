
export interface SignInModel {
  emailId: string;
  id: string;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  mobileNumber: string;
  name: string;
  role: string
  token: {
    token: string
  }
  username: string;
  userImage?: string | null
}

export interface InitialSignInModelState {
  signInModel: SignInModel;
  signInMessage: string;
  signInLoading: boolean;
  signInIsSuccess: boolean;
  signInError: string | undefined;
}

export interface AddSignInPayload {
  username: string;
  password: string;
}
