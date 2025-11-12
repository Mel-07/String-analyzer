import { Request,Response,NextFunction } from "express";
import catchAsync from "../utilities/catchAsync";
import ErrorHandler from "../utilities/errorHandler";
import { sensitize_string } from "../utilities/main_utils";
import prisma from "../lib/PRISMA";
const delete_string = catchAsync(async (req: Request, res: Response,next:NextFunction) => {
    const {string_value} = req.params;
    const value = sensitize_string(string_value);

    const found = await prisma.string_value.findUnique({
      where: { value: value },
    });
    if (!found) {
        return next(
        new ErrorHandler(`String does not exist in the system`, 404)
        );
    }
    await prisma.string_value.delete({
        where:{
            value:value
        },
        include:{
            properties:true
        }
    })

    res.status(204).end("Done");
});
export default delete_string;