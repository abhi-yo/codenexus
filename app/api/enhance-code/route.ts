import Groq from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';

// Ensure the API key is being read correctly
if (!process.env.GROQ_API_KEY) {
  console.error('GROQ_API_KEY is not defined in environment variables');
  // Depending on your deployment, you might want to throw an error
  // or handle this case differently. For now, we log and proceed,
  // but the API call will fail later.
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: 'Groq API key not configured correctly.' }, { status: 500 });
    }

    const body = await req.json();
    const code = body.code as string | undefined;

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const systemPrompt = "You are an expert coding assistant. Your task is to take the user's code snippet and enhance or optimize it. Provide only the improved code, without any explanations, comments about your changes, or introductory phrases. Just return the raw, improved code.";
    // Ensure backticks within the user's code don't break the template literal
    const userPrompt = `Enhance this code:\n\n\`\`\`\n${code}\n\`\`\``;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      model: 'llama3-70b-8192', // Using llama3-70b as Deepseek-R1-Distill-Llama-70b is not listed
      temperature: 0.3,
      max_tokens: 2048,
      top_p: 1,
      stop: null,
    });

    const enhancedCode = chatCompletion.choices[0]?.message?.content || '';

    // Clean the response to ensure only code is returned
    // Removes markdown code blocks (```lang\n ... \n```) if present
    const cleanedCode = enhancedCode.replace(/```(?:[a-zA-Z]+)?\n?/g, '').replace(/\n?```$/, '').trim();

    return NextResponse.json({ enhancedCode: cleanedCode });

  } catch (error) {
    console.error('Error enhancing code:', error);
    // Provide a more specific error message if possible
    const errorMessage = error instanceof Error ? error.message : 'Failed to enhance code';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}