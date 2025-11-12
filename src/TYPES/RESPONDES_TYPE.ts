export interface CreateResponsesType {
  id: string;
  value: string;
  properties: String_Properties;
  created_at: Date;
}

interface String_Properties {
  length: number;
  is_palindrome: boolean;
  unique_characters: number;
  word_count: number;
  sha256_hash: string;
  character_frequency_map: Character_Frequency_Map;
}

export interface Character_Frequency_Map {
  [key: string]: number;
}

export interface ReturnFilterError {
  statusCode?: number;
  type: boolean;
  message?: string;
}

export interface QueryFilterResponse {
  is_palindrome: string;
  max_length: string;
  min_length: string;
  word_count: string;
  contains_character: string;
}

export interface QueryFilterConverted {
  is_palindrome: boolean;
  max_length: number;
  min_length: number;
  word_count: number;
  contains_character: string;
}
