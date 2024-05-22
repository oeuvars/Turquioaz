import express from 'express';
import { Admin } from '@prisma/client';

export interface AdminRequest extends express.Request {
    admin?: Admin;
}
