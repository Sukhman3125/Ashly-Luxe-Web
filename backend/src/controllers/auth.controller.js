import * as authService from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import {
    accessTokenOptions,
    refreshTokenOptions,
} from "../utils/cookieOptions.js";
import * as config from "../config/config.js";

const signup = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if(username === config.ADMIN_USERNAME) {
        throw new ApiError(400, "Username/Email already exists");
    }

    await authService.signup({
        username,
        email,
        password,
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                null,
                "Otp sent successfully"
            )
        );
});

const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    const { user, refreshToken, accessToken } = await authService.verifyOtp({
        email,
        otp
    });

    return res
        .status(200)
        .cookie("accessToken", accessToken, accessTokenOptions)
        .cookie("refreshToken", refreshToken, refreshTokenOptions)
        .json(
            new ApiResponse(
                200,
                user,
                "User registered successfully"
            )
        );
});

const login = asyncHandler(async (req, res) => {
    const { emailOrUsername, password } = req.body;
    if(emailOrUsername === config.ADMIN_USERNAME && password === config.ADMIN_PASSWORD) {
        return res
            .status(200)
            .cookie("accessToken", adminToken(), accessTokenOptions)
            .json(
                new ApiResponse(
                    200,
                    {
                        username: config.ADMIN_USERNAME,
                        admin: true
                    },
                    "Admin registered successfully"
                )
            );
    }
    const { user, accessToken, refreshToken } =
        await authService.login({
            emailOrUsername,
            password,
        });

    return res
        .status(200)
        .cookie("accessToken", accessToken, accessTokenOptions)
        .cookie("refreshToken", refreshToken, refreshTokenOptions)
        .json(
            new ApiResponse(
                200,
                user,
                "User logged in successfully"
            )
        );
});

const adminToken = () => {
    const token = jwt.sign(
        {
            username: config.ADMIN_USERNAME,
            admin: true
        },
        config.ACCESS_TOKEN_SECRET,
        {
            expiresIn: config.ACCESS_TOKEN_EXPIRY
        }
    );
    return token;
}

const logout = asyncHandler(async (req, res) => {
    if(!req.user?.admin) {
        await authService.logout(req.user._id);
    }

    return res
        .status(200)
        .clearCookie("accessToken", accessTokenOptions)
        .clearCookie("refreshToken", refreshTokenOptions)
        .json(
            new ApiResponse(
                200,
                {},
                "Logged out successfully"
            )
        );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies.refreshToken ||
        req.body.refreshToken;

    const { accessToken, refreshToken } =
        await authService.refreshAccessToken(
            incomingRefreshToken
        );

    return res
        .status(200)
        .cookie("accessToken", accessToken, accessTokenOptions)
        .cookie("refreshToken", refreshToken, refreshTokenOptions)
        .json(new ApiResponse(200, {}, "Access token refreshed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await authService.getCurrentUser(req.user);
    return res.status(200).json(
        new ApiResponse(
            200,
            user,
            "Current user fetched successfully"
        )
    );
});

const googleLogin = asyncHandler(async (req, res) => {
    const { idToken } = req.body;
    const {
        user,
        accessToken,
        refreshToken,
    } = await authService.googleLogin({ idToken });

    return res
        .status(200)
        .cookie("accessToken", accessToken, accessTokenOptions)
        .cookie("refreshToken", refreshToken, refreshTokenOptions)
        .json(
            new ApiResponse(
                200,
                user,
                "User logged in successfully"
            )
        );
});

export {
    signup,
    verifyOtp,
    login,
    logout,
    refreshAccessToken,
    getCurrentUser,
    googleLogin
};