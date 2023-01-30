import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const generateData = async (prompt) => {
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 1,
            max_tokens: 3800,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })
        return { result: completion.data.choices[0].text }
    } catch (error) {
        if (error.response) {
            console.error(error.response.status, error.response.data)
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`)
        }
    }
}

export default generateData
