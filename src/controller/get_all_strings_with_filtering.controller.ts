import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utilities/catchAsync';
import prisma from '../lib/PRISMA';
import { Prisma } from '../../generated/prisma/client';
import { filter_parameter_types,isFilterError } from '../utilities/main_utils';
import ErrorHandler from '../utilities/errorHandler';
import { CreateResponsesType, QueryFilterResponse } from '../TYPES/RESPONDES_TYPE';
const get_all_strings_with_filtering = catchAsync(
  async (req: Request, res: Response,next:NextFunction) => {
    const queryParam: QueryFilterResponse = req.query as unknown as QueryFilterResponse;
    const filterResult= filter_parameter_types(queryParam);

  if (isFilterError(filterResult)) {
  return next(new ErrorHandler(filterResult.message as string, filterResult.statusCode as number));
  }

  const {is_palindrome,max_length,min_length,contains_character,word_count} = filterResult

    // * convert required values
    const filter_value_db = await prisma.string_value.findMany({
      where: {
        properties: {
          length: {
            gte: min_length,
            lte: max_length,
          },
          word_count: word_count,
          is_palindrome: is_palindrome,
          character_frequency_map: {
            path: contains_character,
            not: Prisma.JsonNull,
          },
        },
      },
      include: {
        properties: true,
      },
    });

    const result = filter_value_db.map((item:CreateResponsesType) => {

      return{
        id: item.id,
        value: item.value,
        properties:{
          length: item?.properties?.length,
          is_palindrome: item.properties?.is_palindrome,
          unique_characters: item.properties?.unique_characters,
          word_count: item.properties?.word_count,
          sha256_hash: item.properties?.sha256_hash,
          character_frequency_map: item.properties?.character_frequency_map
        },
        created_at: item.created_at
      }
    })

    res.status(200).json({
      data:result
    })
  }
);
export default get_all_strings_with_filtering;