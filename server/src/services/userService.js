const User = require("../models/User");
const { ROLE_ENUM } = require("../utils/enumSystem")
const bcrypt = require("bcrypt");
const ErrorHandler = require("../helper/errorHandler");

class UserService {

    async getUserByUsername(username) {
        const user = await User.findOne({ username });
        if (!user) {
           throw new ErrorHandler("User not found", 404);
        }
        
        return { 
            id: user._id.toString(), 
            username: user.username, 
            role: user.role 
        };
    }

    async registerUser(username, password) {
        const exists = await User.findOne({ username });

        if (exists) {
            throw new ErrorHandler("Username already exists", 400);
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            password: hashedPassword,
            role: ROLE_ENUM.USER,
            refreshToken: null
        });

        return { 
            id: newUser._id.toString(), 
            username: newUser.username, 
            role: newUser.role 
        };
    }

    async updateUserName(userId, newUsername) {
        const user = await User.findById(userId);
        if (!user) {
            throw new ErrorHandler("User not found", 404);
        }  
        
        user.username = newUsername;
        await user.save();
        
        return newUsername;
    }

    async deleteUser(userId) {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new ErrorHandler("User not found", 404);
        }
        return user.username;
    }
}

module.exports = new UserService();