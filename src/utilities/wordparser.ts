
export const parser_query = (input:string)=>{
    let palindromic:boolean
    if(input.includes("palindromic")){
        palindromic = true;
    }else{
        palindromic = false;
    }
    const single_world = /single\sword/i;
    let search_single:boolean
    if(input.match(single_world)){
        search_single = true;
    }else{
        search_single = false;
    }
    const all = /all/i;
    let all_world:boolean
    if(input.match(all)){
        all_world = true;
    }else{
        all_world = false;
    }

    let to_check:{number_value:number|null,assertion:'ge'|'le'|null} ={
        number_value :0,
        assertion:'le'
    };
    if (input.includes("longer than") || input.includes('greater than')|| input.match(/longer\sthan/i)){
        to_check.assertion = "ge";
    }else if (input.includes("shorter than") || input.includes("lesser than")|| input.match(/shorter\sthan/)) {
        to_check.assertion = "le";
    }else{
        to_check.assertion = null;
    }

    if (input.match(/\d+/) && input.match(/\d+/) !== null) {
        let digit = parseInt(input.match(/\d+/)?.[0] as string);
        if (digit === null || isNaN(digit) || digit <= 0) {
        to_check.number_value = null;
        }
        to_check.number_value = digit;
    }
    // Vowel search
    let first_search_vowel:boolean
    if(input.includes("first vowel")|| input.match(/first\svowel/i)){
        first_search_vowel = true;
    }else{
        first_search_vowel = false;
    }

    let find_specific_letter:boolean
    if (
      input.includes("containing the letter") ||
      input.match(/containing\sthe\sletter/i) ||
      input.includes("contains the letter") ||
      input.match(/contains\sthe\sletter/i)
    ) {
      find_specific_letter = true;
    } else {
      find_specific_letter = false;
    }
    let letter:string|null
    if(find_specific_letter){
       letter = input.trim()[input.length -1];
    }else{
        letter = null
    }

    let result_not_filtered ={
        palindromic,
        search_single,
        all_world,
        first_search_vowel,
        find_specific_letter,
        letter
    }
    let first_result_check = Object.fromEntries(Object.entries(result_not_filtered).filter(([key,v])=> v !== false && v !== null ));
    // check to_check
    let new_result: Partial<{
      palindromic: boolean;
      search_single: boolean;
      all_world: boolean;
      first_search_vowel: boolean;
      find_specific_letter: boolean;
      letter: string | null;
      number_value: number|null;
      assertion: "ge" | "le"|null;
    }>;
    if(to_check.number_value !== null && to_check.number_value > 0 && to_check.assertion !== null){
        new_result = {...first_result_check,number_value:to_check.number_value,assertion:to_check.assertion}
    }else{
        new_result = {...first_result_check}
    }
    return new_result;

}

export const vowels = /a|e|i|o|u/i;