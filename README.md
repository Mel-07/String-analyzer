# **My Solution To String Analyzer Backend Service** #
## **The Assignment Is Based On the Stage 1! Task Given By**


### _*what the service does*_
For Each Analyzed String, It COMPUTE and STORE the Following properties
-  Length: Number of characters in the string
- Is_palindrome: Boolean indicating if the string reads the same forwards and backwards (case-insensitive)
- Unique_characters: Count of distinct characters in the string
- Word_count: Number of words separated by whitespace
- Sha256_hash: SHA-256 hash of the string for unique identification
- Character_frequency_map: Object/dictionary mapping each character to its occurrence count.

## ENDPOINTS TO HIT ##
***To Test the endpoint i recommend using Postman***

1. To Create and Also Analyze String:[**https://string-analyzer-production-4a5c.up.railway.app/strings**](https://string-analyzer-production-4a5c.up.railway.app/strings). The Request Body is in Json Format.

```json
{"value":"String"}
```

2. To Get Specific String: [**https://string-analyzer-production-4a5c.up.railway.app/strings/***(string_to_get)*](https://string-analyzer-production-4a5c.up.railway.app/strings/),where **string_to_get** is the string eg->car,raid,mama.church...etc.

3. To Get All Strings with Filtering:[**https://string-analyzer-production-4a5c.up.railway.app/strings?is_palindrome=true&min_length=5&max_length=20&word_count=2&contains_character=a**](https://string-analyzer-production-4a5c.up.railway.app/strings?is_palindrome=true&min_length=5&max_length=20&word_count=2&contains_character=a),

    Query Parameters:
    - is_palindrome: boolean (true/false)
    - min_length: integer (minimum string length)
    - max_length: integer (maximum string length)
    - word_count: integer (exact word count)
    - contains_character: string (single character to search for)

4. To Use Natural Language Filtering: [**https://string-analyzer-production-4a5c.up.railway.app/strings/filter-by-natural-language?query=all single word palindromic strings**](),

    Query Parameter for **query**:
    - all single word palindromic strings
    - strings longer than 10 characters
    - palindromic strings that contain the first vowel
    - strings containing the letter z

5. To Delete String: [**https://string-analyzer-production-4a5c.up.railway.app/strings/{string_value}**](https://string-analyzer-production-4a5c.up.railway.app/strings/{string_value}),
where **string_value** is the string to delete eg->car,raid,mama.church...etc.

### RUNNING LOCALLY
Clone the Project form the Git Repo link to the git repo -> __[**Link**](https://github.com/Mel-07/String-analyzer)__

either use
```bash
git clone https://github.com/Mel-07/String-analyzer.git
```
or

**Download as a zip file directly from git -> [Download Link](https://github.com/Mel-07/String-analyzer/archive/refs/heads/main.zip)**

create a ```.env``` file the the root of the project with the following variable
```.env
PORT = '8000'
NODE_DEV = 'development'
DATABASE_URL="file:./dev.db"
```
DATABASE used in **prisma** is **sqlite**

Then run the project using
``` bash
npm run watch
```
It will run on http://localhost:8000 if the PORT is set to ***8000***, if not set it will run on PORT ***3000*** as default http://localhost:3000