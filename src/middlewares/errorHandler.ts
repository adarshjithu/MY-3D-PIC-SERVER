import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ZodError } from "zod";

export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    let statusCode = 500;
    let message = "Internal Server Error";
    console.log(statusCode==500?err:'')

    // Mongoose validation error
    if (err instanceof mongoose.Error.ValidationError) {
        statusCode = 400;
        message = Object.values(err.errors)
            .map((error) => `${error.path}: Required`)
            .join(", ");
    }

    // Mongoose cast error (invalid ObjectId)
    else if (err instanceof mongoose.Error.CastError) {
        statusCode = 400;
        message = `${err.path}: Required`;
    }

    // MongoDB duplicate key error
    else if (isMongoDuplicateError(err)) {
        const field = Object.keys(err.keyValue)[0];
        statusCode = 400;
        message = `${field}: Already exists`;
    }

    // Zod validation error - formatted exactly like the example
    else if (err instanceof ZodError) {
        statusCode = 400;
        message = err.issues
            .map((issue) => {
                // Format all validation errors as "field: Required"
                return `${issue.path.join('.')}: Required`;
            })
            .join(", ");
    }

    // Custom error with status and message
    else if (isErrorWithStatusAndMessage(err)) {
        statusCode = err.status;
        message = err.message;
    }

    console.error(`\x1b[31m${message}\x1b[0m`);

    res.status(statusCode).json({
        success: false,
        message, // Formatted exactly like the example
    });
};

// Type guards remain the same
function isMongoDuplicateError(error: unknown): error is { code: number; keyValue: Record<string, unknown> } {
    return typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 11000 && 'keyValue' in error;
}

function isErrorWithStatusAndMessage(error: unknown): error is { status: number; message: string } {
    return typeof error === 'object' && error !== null && 'status' in error && 'message' in error;
}