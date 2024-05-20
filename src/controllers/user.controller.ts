import bcrypt from 'bcrypt';
import express from 'express';
import jwt from "jsonwebtoken";
import prisma from '../database/db.config';
// create user
export const createUser = async (
    req: express.Request,
    res: express.Response,
) => {
    const { name, email, password } = req.body;
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const findUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (findUser) {
        return res.status(400).json({
            message: 'Email already taken please use another email address',
        });
    }
    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
        },
    });
    const serializedUser = {
        ...newUser,
        created_at: newUser.created_at.toISOString(),
    };
    return res
        .status(201)
        .json({ data: serializedUser, message: 'new user created' });
};

// update a user

export const updateUser = async (
    req: express.Request,
    res: express.Response
) => {
    const userId = req.params.id;
    const { name, email, password } = req.body;
    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            name,
            email,
            password,
        },
    });
    return res
        .status(201)
        .json({ data: updateUser, message: 'user updated' });
};

// get all users

export const getAllUser = async (
    req: express.Request,
    res: express.Response
) => {
    const users = await prisma.user.findMany({
    });
    return res
        .status(200)
        .json({ message: 'All users data ', data: users });
};

// find a user

export const findAUser = async (
    req: express.Request,
    res: express.Response
) => {
    const userId = req.params.id;
    const user = await prisma.user.findFirst({
        where: {
            id: userId,
        },
        include: {
            tasks: {
                select: {
                    title: true,
                    category: true,
                    applyDate: true,
                    companyName: true,
                    description: true,
                    interviewDate: true,
                    jobId: true,
                    location: true,
                    status: true,
                    created_at: true
                }
            }
        }
    });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: "Here is an OG user", data: user });
};
//delete a user

export const deleteUser = async (
    req: express.Request,
    res: express.Response
) => {
    const userId = req.params.id;
    const user = await prisma.user.delete({
        where: {
            id: userId,
        },
    });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'OG user deleted!' });
};

//login a user
export const userLogin = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await prisma.user.findUnique({ where: { email } });

        // If user not found, return 401 Unauthorized
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.password);

        // If password is invalid, return 401 Unauthorized
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Get JWT secret from environment variable
        const jwtSecret = process.env.JWT_SECRET;

        // If JWT secret is not defined, return 500 Internal Server Error
        if (!jwtSecret) {
            console.error('JWT secret is not defined');
            return res.status(500).json({ error: 'JWT secret is not defined' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

        // Return token in response
        return res.status(200).json({ message: "user logged in successfully" });
    } catch (error) {
        console.error('Error in userLogin:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};