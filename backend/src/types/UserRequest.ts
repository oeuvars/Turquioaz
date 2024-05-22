import express from 'express';
import { User } from '@prisma/client';

export interface UserRequest extends express.Request {
    user?: User;
}
