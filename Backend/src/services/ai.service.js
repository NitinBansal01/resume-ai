const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")

// the purpose of this file is to provide a service that can generate an interview report for a candidate based on their resume, self-description, and job description. The service uses the Google GenAI API to generate the report and returns it in a structured format. Additionally, it can also generate a PDF version of the resume based on the provided details.
//zod is a TypeScript-first schema declaration and validation library. It allows you to define schemas for your data and validate that the data conforms to those schemas. In this code, zod is used to define the structure of the interview report and the resume PDF content, ensuring that the generated content adheres to the expected format and types.
//zodtojsonschema is a library that converts Zod schemas to JSON Schema format. JSON Schema is a standard for describing the structure and validation rules of JSON data. In this code, zodToJsonSchema is used to convert the Zod schemas for the interview report and resume PDF content into JSON Schema format, which can then be used in the Google GenAI API request to specify the expected structure of the generated content.
//why everything uses json? because the communication between the backend and frontend is done using JSON format. The backend generates the interview report and resume PDF content in JSON format, which can be easily sent to the frontend and parsed there for display or further processing. Using JSON allows for a standardized way of structuring and exchanging data between the backend and frontend components of the application.
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})


const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})
//.describe() is used to add a description to each field in the Zod schema. This description can provide additional context and information about the purpose and expected content of each field, which can be helpful for documentation and understanding the structure of the generated interview report.  
async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


    const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
`

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),

        }
    })
    // this function takes the candidate's resume, self-description, and job description as input and generates an interview report using the Google GenAI API. The prompt is constructed to provide the necessary information for generating the report. The response from the API is expected to be in JSON format, adhering to the structure defined by the interviewReportSchema. The function then parses the response text as JSON and returns it, allowing the frontend to display the interview report in a structured and user-friendly manner.
    //the things that go to ai are the resume, self description and job description. The things that come from ai are match score, technical questions, behavioral questions, skill gaps and preparation plan. The match score is a number between 0 and 100 indicating how well the candidate's profile matches the job description. The technical questions and behavioral questions are arrays of objects containing the question, the intention behind asking the question, and how to answer it. The skill gaps are an array of objects containing the skill that the candidate is lacking and its severity (low, medium, high). The preparation plan is an array of objects containing the day number, focus of that day, and a list of tasks to be done on that day for effective interview preparation.


    return JSON.parse(response.text)


}




module.exports = { generateInterviewReport }