import { accountClient } from "lib/generated-api/api-clients";
import { LoginDto, RegisterDto } from "lib/generated-api/StatCardApi";
import { UserDto } from "lib/generated-api/types";
import { executeAsync } from "./utils";

const registerUser = async (registerDto: RegisterDto) => {
  try {
    return await executeAsync<UserDto>(async () => {
      const response = await accountClient.register(registerDto);
      return response.result;
    });
  } catch (error) {
    throw error;
  }
};

const loginUser = async (loginDto: LoginDto) => {
  try {
    return await executeAsync<UserDto>(async () => {
      const response = await accountClient.login(loginDto);
      return response.result;
    });
  } catch (error) {
    throw error;
  }
};

const me = async () => {
  try {
    return await executeAsync<UserDto>(async () => {
      const response = await accountClient.me();
      return response.result;
    });
  } catch (error) {
    throw error;
  }
};

const fetchers = {
  queries: {
    me,
  },
  mutations: {
    registerUser,
    loginUser,
  },
};

export default fetchers;
