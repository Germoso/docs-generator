import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

/**
 * Generate the data
 * @param {String} prompt Prompt to generate
 * @param {Number} maxTokens Amount of Tokens
 * @returns
 */
const generateData = async (prompt, maxTokens) => {
    console.log("TOKENS AMOUNT")
    console.log(maxTokens)
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 1,
            max_tokens: maxTokens || 2500,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })
        console.log(completion)
        return {
            result: completion.data.choices[0].text,
            usage: {
                total_tokens: completion.data.usage.total_tokens,
                prompt_tokens: completion.data.usage.prompt_tokens,
                completion_tokens: completion.data.usage.completion_tokens,
            },
        }
    } catch (error) {
        if (error.response) {
            console.error(error.response.status, error.response.data)
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`)
        }
    }
}

export default generateData
