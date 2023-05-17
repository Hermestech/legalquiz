import { Configuration, OpenAIApi } from 'openai';
import { NextApiRequest, NextApiResponse } from 'next';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const baseQuestion = `Realiza las siguientes tareas: 
 1 - Acuta como si fueras un profesor de derecho 
 2 - Revisa si la respueta es correcta
 3 - Si no es correcta, da feedback para que pueda mejorar mis respuestas
 4 - Si es correcta pero podría ser una respuesta más completa dime qué debería mejorar en mi respuesta
`



const generateAction = async (req: NextApiRequest, res: NextApiResponse) => { 
    console.log(req.body);
    const { userInput, currentQuestion } = req.body;
    const prompt = `${baseQuestion} ${currentQuestion} ${userInput}`;

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        temperature: 0.8,
        max_tokens: 600,
    })

    const basePromptOutput = baseCompletion.data.choices.pop()

    res.status(200).json({ output: basePromptOutput });
} 

export default generateAction;