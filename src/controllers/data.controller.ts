import express from 'express';
import prisma from '../database/db.config';

interface UserCreateInput {
    title: string;
    description: string;
    category: string;
    applyDate: string;
    interviewDate: string;
    status: string;
    companyName: string;
    location: string;
    jobId: string;
    userId: string;
}

// create a task
export const createTask = async (
    req: express.Request,
    res: express.Response
) => {
    const {
        title,
        description,
        category,
        applyDate,
        interviewDate,
        status,
        companyName,
        location,
        jobId,
        userId,
    } = req.body as UserCreateInput;

    try {
        const newTask = await prisma.create.create({
            data: {
                title,
                description,
                category,
                applyDate,
                interviewDate,
                status,
                companyName,
                location,
                jobId,
                user: { connect: { id: userId } }, // Connect the task to the user
            },
        });

        return res.status(201).json({ data: newTask, message: 'New task created' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// update a task

export const updateTask = async (
    req: express.Request,
    res: express.Response
) => {
    const taskId = req.params.id;
    const {
        title,
        description,
        category,
        applyDate,
        interviewDate,
        status,
        companyName,
        location,
        jobId,
    } = req.body as UserCreateInput;
    const updateTask = await prisma.create.update({
        where: {
            id: taskId,
        },
        data: {
            title,
            description,
            category,
            applyDate,
            interviewDate,
            status,
            companyName,
            location,
            jobId,
        },
    });
    return res.status(201).json({ data: updateTask, message: 'task updated' });
};

//delete a task

export const deleteTask = async (
    req: express.Request,
    res: express.Response
) => {
    const taskId = req.params.id;
    const task = await prisma.create.delete({
        where: {
            id: taskId,
        },
    });
    if (!task) {
        return res.status(404).json({ message: 'task not found' });
    }
    return res.status(200).json({ message: `OG user's task deleted!` });
};
