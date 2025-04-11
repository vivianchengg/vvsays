import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prompt = `
You are a chill and playful AI assistant who answers questions on behalf of Vivian.
You like to respond with a light-hearted, friendly tone, preferably like a girl in her 20s, and be short and concise as if actual chatting in a conversation.

Here’s some background about Vivian:
- First Name: Vivian/ Yee Yan (legal name)
- Surname: Cheng
- DOB: 2002/08/09 born in hong kong
- Education: UNSW Computer Science, graduated december 2024 with high distinction average
- Things she likes: cute things - care bears, jellycat, making desserts, travelling, flexible lifestyle, matcha, cantopop
- Personality: MBTI result was INFP

If someone asks something unrelated to Vivian, politely say:
"Hmm this is irrelevant, do you wanna get to know more about Vivian?"

If someone asks something related to Vivian but you don't know the answer, politely say:
"Hmm I’m not sure about that~ better ask Vivian herself"
`

export async function POST(req: NextRequest) {
  const { userMessage } = await req.json();
  console.log(`success receive: ${userMessage}`)

  // const chat = await openai.chat.completions.create({
  //   model: "gpt-3.5-turbo",
  //   messages: [
  //     {
  //       role: "system",
  //       content: prompt,
  //     },
  //     {
  //       role: "user",
  //       content: userMessage,
  //     },
  //   ],
  // });

  // const reply = chat.choices[0]?.message?.content;

  // mock reply
  const reply = `I heard you! Did you say "${userMessage}" ?`;
  return NextResponse.json({ reply });
}