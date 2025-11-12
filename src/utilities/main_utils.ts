import { createHash } from "crypto";
import { CreateResponsesType, QueryFilterConverted, QueryFilterResponse, ReturnFilterError } from "../TYPES/RESPONDES_TYPE";
import prisma from "../lib/PRISMA";

// * App Main Utilities
/* HASHER*/
export function generateSHA256Hash(input:string):string{
    const hasher = createHash("sha256");
    hasher.update(input);
    return hasher.digest("hex");
}
/* LENGTH OF FULL STRING */
export function lengthOfString(input:string):number{
    return input.length
}
/* COUNT OF DISTINCT CHARACTERS IN A STRING */
export function distinct_characters(input:string):number{
    const uniqueChars = new Set(input);
    return uniqueChars.size
}
/* NUMBERS OF WORDS BY WHITESPACE */
export function count_of_words(input:string):number{
    return input.trim().split(" ").length;
}

/* PALINDROME */
export function is_palindrome(input:string):boolean{
    const lowered = input.toLowerCase();
    const reversed = lowered.split('').reverse().join('');
    return reversed === lowered
}

/* OCCURRENCE MAP */
export function occurrence_map(input:string):Map<string,number>{
    const map = new Map();
    for(const char of input){
        if(map.has(char)){
            map.set(char, map.get(char)+1)
        }else{
            map.set(char,1);
        }
    }
    return map
}

/* SENSITIZE STRING */
export function sensitize_string(input:string):string{
    return input.trim().toLowerCase();
}

// Basic 
type Check_string_value = {
    statusCode?:number,
    type:boolean,
    message?:string
}
export function check_string_value(input: unknown): Check_string_value {
  if (!input) {
    return {
      statusCode: 400,
      type: false,
      message: ` Invalid request body or missing "value" field`,
    };
  }

  if (typeof input !== "string") {
    return {
      statusCode: 422,
      type: false,
      message: ` Invalid data type for "value" (must be string)`,
    };
  }
  if (input.trim().length <= 0) {
    return {
      statusCode: 400,
      type: false,
      message: ` Invalid request body or missing "value" field`,
    };
  }
  return {
    type: true,
  };
}
// * Filter the Parameter Type
export function filter_parameter_types(
  queryParam:QueryFilterResponse
):ReturnFilterError|QueryFilterConverted {

  const err:ReturnFilterError = {
    statusCode: 400,
    type: false,
    message: `Invalid query parameter values or types`,
  }

  // check boolean for is_palindrome
  const is_palindrome =
    queryParam.is_palindrome.toLocaleLowerCase() === "true"
      ? true
      : queryParam.is_palindrome.toLocaleUpperCase() === "false"
      ? false
      : undefined;
  if (is_palindrome === undefined) {
    return err;
  }
  // check all meant to a number
  const max_length = parseInt(queryParam.max_length);
  if(isNaN(max_length)){
    return err;
  }
  const min_length = parseInt(queryParam.min_length);
  if(isNaN(min_length)){
    return err;
  }
  const word_count = parseInt(queryParam.word_count);
  if(isNaN(word_count)){
    return err;
  }

  return {
    is_palindrome,
    min_length,
    max_length,
    word_count,
    contains_character:queryParam.contains_character as string
  }

}
export function isFilterError(
  result: ReturnFilterError | QueryFilterConverted
): result is ReturnFilterError {
  return "statusCode" in result; // Check for error-specific property
}

// Structure String Data
export function structured_Data_Saved(string_value: string):CreateResponsesType {
  return {
    id: generateSHA256Hash(string_value),
    value: string_value,
    properties: {
      length: lengthOfString(string_value),
      is_palindrome: is_palindrome(string_value),
      unique_characters: distinct_characters(string_value),
      word_count: count_of_words(string_value),
      sha256_hash: generateSHA256Hash(string_value),
      character_frequency_map: Object.fromEntries(occurrence_map(string_value)),
    },
    created_at: new Date(),
  };
}