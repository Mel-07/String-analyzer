import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utilities/catchAsync'; 
import prisma from '../lib/PRISMA';
import ErrorHandler from '../utilities/errorHandler';
import { sensitize_string } from '../utilities/main_utils';
const get_specific_string = catchAsync(
  async (req: Request, res: Response,next:NextFunction) => {
    const {string_value} = req.params;
    const value = sensitize_string(string_value)
    // * Check Database for String
    const present_value = await prisma.string_value.findUnique({
      where:{
        value:value
      },
      include:{
        properties:true
      }
    });
    if(!present_value){
      return next(new ErrorHandler(`String does not exist in the system`, 404));
    }
    const result = {
      id:present_value.id,
      value:present_value.value,
      properties:{
        length:present_value?.properties?.length,
        is_palindrome:present_value?.properties?.is_palindrome,
        unique_characters:present_value?.properties?.unique_characters,
        word_count:present_value?.properties?.word_count,
        sha256_hash:present_value?.properties?.sha256_hash,
        character_frequency_map:present_value?.properties?.character_frequency_map
      },
      created_at:present_value.created_at
    }
    // * Send String Details
    res.status(200).json(result);
  }
);
export default get_specific_string;