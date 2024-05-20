import express from 'express';
import prisma from '../database/db.config';

// create user
export const createUser = async (
    req: express.Request,
    res: express.Response
) => {
    const { name, email, password } = req.body;

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
            password: password,
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
    const users = await prisma.user.findMany({});
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
