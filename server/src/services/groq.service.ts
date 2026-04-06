import Groq from 'groq-sdk';
import {GROQ_API_KEY} from '../constants/env';

const groq = new Groq({
    apiKey: GROQ_API_KEY,
});

export const improveBulletService = async (bullet: string): Promise<string> => {
    const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
            {
                role: 'system',
                content: `You are an expert resume writer. Rewrite resume bullet points to be stronger, more impactful, and ATS-friendly.
Rules:
- Start with a strong action verb
- Include measurable results when possible
- Be concise — one sentence max
- Do NOT add fake numbers
- Return ONLY the improved bullet, no explanation, no quotes`,
            },
            {
                role: 'user',
                content: `Improve this resume bullet point: "${bullet}"`,
            },
        ],
        temperature: 0.7,
        max_tokens: 150,
    });

    return response.choices[0]?.message?.content?.trim() ?? bullet;
};
