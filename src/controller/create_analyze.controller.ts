import { Request, Response,NextFunction} from 'express';
import catchAsync from '../utilities/catchAsync';
import { structured_Data_Saved,check_string_value, sensitize_string } from '../utilities/main_utils';
import ErrorHandler from '../utilities/errorHandler';
import { CreateResponsesType } from '../TYPES/RESPONDES_TYPE';
import prisma from '../lib/PRISMA';
const create_analyze_string = catchAsync(
  async (req: Request, res: Response,next:NextFunction) => {
    const value = req.body.value as string;
    const string_value = sensitize_string(value);
    //* Check String 
    const { message, type, statusCode } = check_string_value(string_value);
    if(type === false){
      return next(new ErrorHandler(message as string, statusCode as number))
    }
    // *Check Data Base if String Already Exist
    const present_data = await prisma.string_value.findUnique({
        where: {
          value: string_value,
        },
    });

    if(present_data){
      next(new ErrorHandler(`String already exists in the system`,409));
    } else{
      const collect_string_data: CreateResponsesType =
        structured_Data_Saved(string_value);
      //* Save TO Prisma
      const string_stored = await prisma.string_value.create({
        data:{
          id:collect_string_data.id,
          created_at: collect_string_data.created_at,
          value:collect_string_data.value,
          properties:{
            create:{
              sha256_hash:collect_string_data.properties.sha256_hash,
              is_palindrome:collect_string_data.properties.is_palindrome,
              character_frequency_map:collect_string_data.properties.character_frequency_map,
              length:collect_string_data.properties.length,
              word_count:collect_string_data.properties.word_count,
              unique_characters:collect_string_data.properties.unique_characters
            }
          }
        },
        include:{
          properties:true,
        }
      })

      const result = {
        id: string_stored.id,
        value: string_stored.value,
        properties: {
          length: string_stored.properties?.length,
          is_palindrome: string_stored.properties?.is_palindrome,
          unique_characters: string_stored.properties?.unique_characters,
          word_count: string_stored.properties?.word_count,
          sha256_hash: string_stored.properties?.sha256_hash,
          character_frequency_map:
            string_stored.properties?.character_frequency_map,
        },
        created_at: string_stored.created_at,
      }

      res.status(201).json(result)

    }
  }
);
export default create_analyze_string;