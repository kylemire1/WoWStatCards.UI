import axios from "axios";
import cookie from "cookie";
import { LoginDto } from "lib/generated-api/StatCardApi";
import { UserDto } from "lib/generated-api/types";
import fetchers from "lib/react-query/fetchers/account";
import { NextApiHandler } from "next";

const loginToken: NextApiHandler<UserDto> = async (req, res) => {
  try {
    const loginDto = req.body;
    const res = await fetchers.mutations.loginUser(loginDto);
  } catch (error) {}

  const options = {
    // all necessary options for getting the refresh token
  };

  const fetchData = () =>
    axios(options)
      .then(async (response) => {
        const { refresh_token } = response.data;

        res.setHeader("Set-Cookie", [
          cookie.serialize("refreshToken", refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24,
            sameSite: "strict",
            path: "/",
          }),
        ]);

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ refresh_token }));
      })
      .catch((error) => {
        // logic for handling errors
      });

  await fetchData();
};

export default getRefreshToken;
