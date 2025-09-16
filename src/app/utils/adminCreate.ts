import { NextFunction, Request, Response } from "express";
import { UserWallet } from "../modules/user/registration/user.model";
import { envVars } from "../config/env";
import bcryptjs from 'bcryptjs'
import { IsActive, Role } from "../modules/user/registration/user.interface";

const adminCreate = async () => {
    try {
        const isAdminExist = await UserWallet.findOne({phone: envVars.ADMIN_NUMBER, role: Role.ADMIN});

        if (isAdminExist) {
            console.log("Admin Already Exist");
            return
        }

        console.log("Admin Creating...");

        const hashPassword = await bcryptjs.hash(envVars.ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUNDS));

        const payload = {
            name: "My Cash Admin",
            phone: envVars.ADMIN_NUMBER,
            password: hashPassword,
            role: "ADMIN",
            isActive: IsActive.ACTIVE,
            isVerified: true,
        };

        const admin = await UserWallet.create(payload);
        console.log("Admin created successfully")
        console.log(admin)

    } catch (error) {
        console.log(error);
    }
};

export default adminCreate;