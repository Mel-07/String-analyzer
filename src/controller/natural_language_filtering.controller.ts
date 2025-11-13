import { Request, Response,NextFunction } from 'express';
import catchAsync from '../utilities/catchAsync';
import { parser_query, vowels } from '../utilities/wordparser';
import prisma from '../lib/PRISMA';
import ErrorHandler from '../utilities/errorHandler';
import { CreateResponsesType } from '../TYPES/RESPONDES_TYPE';
const natural_language_filtering = catchAsync(
  async (req: Request, res: Response,next:NextFunction) => {
    const {query} = req.query as unknown as {query:string};
    const string_value = query.toLowerCase().trim()
    const {palindromic,number_value,find_specific_letter,first_search_vowel,search_single,letter,all_world,assertion}= parser_query(string_value);
    // Get All Data From Database
    const getAllData = await prisma.string_value.findMany({
      include:{
        properties:true
      }
    }).then((data)=> data.map((items)=>{
      return{
        id:items.id,
        properties:{
          length:items.properties?.length,
          is_palindrome:items.properties?.is_palindrome,
          unique_characters:items.properties?.unique_characters,
          word_count:items.properties?.word_count,
          sha256_hash:items.properties?.sha256_hash,
          character_frequency_map:items.properties?.character_frequency_map
        },
        value:items.value,
        created_at:items.created_at
      }
    }));

    if(!getAllData){

    }

    if(palindromic && first_search_vowel ){
        const result = getAllData.filter((items)=> items.value[0].match(vowels) && items.properties?.is_palindrome);
        if(!result){
          return next(new ErrorHandler(` Query parsed but resulted in conflicting filters`,422));
        }
        const arrange_result = {
          data: result,
          count: result.length,
          interpreted_query: {
            original: string_value,
            parsed: {
              is_palindrome: palindromic,
              first_search_vowel,
            },
          },
        };
        res.status(200).json(arrange_result);
    }
    else if(palindromic && search_single && all_world){
        const result = getAllData.filter(
          (items) =>
            items.properties?.word_count === 1 && items.properties.is_palindrome
        );
        if (!result) {
          return next(
            new ErrorHandler(
              ` Query parsed but resulted in conflicting filters`,
              422
            )
          );
        }
        const arrange_result = {
          data: result,
          count: result.length,
          interpreted_query: {
            original: string_value,
            parsed: {
              is_palindrome: palindromic,
              search_single,
              word_count:1,
            },
          },
        };
      res.status(200).json(arrange_result);
    }
    else if(find_specific_letter && letter?.length ===1){
        const result = getAllData.filter((items)=> items.value.includes(letter!));
        const arrange_result = {
          data: result,
          count: result.length,
          interpreted_query: {
            original: string_value,
            parsed: {
              find_specific_letter,
              letter,
            },
          },
        };
        if (!result) {
          return next(
            new ErrorHandler(
              ` Query parsed but resulted in conflicting filters`,
              422
            )
          );
        }
        res.status(200).json(arrange_result);
    }
    else if(number_value && assertion){
      if(assertion === "ge"){
        const result = getAllData.filter((items)=> items.properties?.length && items.properties?.length > number_value);
        if (!result) {
          return next(
            new ErrorHandler(
              ` Query parsed but resulted in conflicting filters`,
              422
            )
          );
        }
        const arrange_result = {
          data: result,
          count: result.length,
          interpreted_query: {
            original: string_value,
            parsed: {
              number_value,
              assertion,
            },
          },
        };
        res.status(200).json(arrange_result);
      }else if(assertion === "le"){
        const result = getAllData.filter(
          (items) =>
            items.properties?.length && items.properties?.length < number_value
        );
        if (!result) {
          return next(
            new ErrorHandler(
              ` Query parsed but resulted in conflicting filters`,
              422
            )
          );
        }
        const arrange_result = {
          data: result,
          count: result.length,
          interpreted_query: {
            original: string_value,
            parsed: {
              number_value,
              assertion,
            },
          },
        };
        res.status(200).json(arrange_result);
      }else{
        return next(
          new ErrorHandler(
            ` Query parsed but resulted in conflicting filters`,
            422
          )
        );
      }

    }else{
      return next(new ErrorHandler(` Unable to parse natural language query.`,400));
    }

    
  }
);
export default natural_language_filtering;