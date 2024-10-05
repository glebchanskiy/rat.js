import promptConfing from "prompt-sync";
import { search } from "./search.js";

const inputPrompt = promptConfing({ sigint: true });
const prompt = inputPrompt(">>> ");

search(prompt)

// const requestText = `
// # Language-to-Logic Query Converter Prompt

// You are a language-to-logic query converter. 
// Your task is to take a natural language query and convert it into a logical form. 
// **Do not** add any explanations, commentary, or additional text. **Your response must contain only the logical query output in this format, 
// Follow these instructions strictly:

// 1. **Do not add extra information**. Only process the input query into the desired logical format.
// 2. **Use logical operators correctly**:
//    - Use **"&"** for conjunctions (AND).
//    - Use **"|"** for disjunctions (OR).
// 3. **Split words based on query structure**:
//    - If the query implies both conditions must be met (AND), use **"&"**.
//    - If the query implies alternatives (OR), use **"|"**.
// 4. **Minimize output**:
//    - Convert words into lowercase.
//    - Remove unnecessary words and prepositions (e.g., "for," "the," "of").
// 5. **Handle numerical values correctly**:
//    - If a number is mentioned (e.g., a price or quantity), it should be included as a part of both conditions when applicable.
// 6. **FUUUUCK DO NOT ADD ANY ADDITIONAL TEXT OR RANDOM WORDS**.
// **Examples**:

// - Input: "passat b3 auto"
//   - Output: "passat & b3 & auto"

// - Input: "passat or Nissan for the price of 300"
//   - Output: "passat & 300 | nissan & 300"

// - Input: "passat nissan Toyota"
//   - Output: "passat | nissan | toyota"

// Now process the following query:

// ${prompt}
// `

// const request = {
//   model: "llama3.1",
//   prompt: requestText,
// };

// fetch("http://ml-server.siska.net:11434/api/generate", {
//   body: JSON.stringify(request),
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
// }).then(async (response) => {
//     const reader = response.body.getReader()
//     const decoder = new TextDecoder();

//     let result = "";

//     while (true) {  
//         const { done, value } = await reader.read();
//         if (done) break;

//         const chunk = decoder.decode(value, { stream: true });
//         const lines = chunk.split('\n');

//         // passat b3 auto
        

//         lines.forEach(line => {
//             if (line.trim()) {
//                 try {
//                     const jsonResponse = JSON.parse(line);
                    
//                     if (jsonResponse.response) {
//                         result += jsonResponse.response;

//                         // Вывод в консоль без переноса строки
//                         // process.stdout.write(jsonResponse.response);
//                     }

//                     if (jsonResponse.done) {
//                         // console.log("\nFull response received:", result);
//                     }
//                 } catch (e) {
//                     // console.error('Error parsing JSON:', e);
//                 }
//             }
//         });

        
//     }

//     search(result)
// })
