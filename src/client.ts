import { config } from "dotenv";
config();

import axios from "axios";

export const client = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    "OpenAI-Organization": process.env.OPENAI_ORGANIZATION,
  },
});

export const chat = async (message: string): Promise<string | undefined> => {
  try {
    const response = await client.post("/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are playing a game of Rocket League and other players are chatting with you. Feel free to respond creatively and with comedy or Rocket League memes.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 1,
      max_tokens: 20,
    });
    console.debug(JSON.stringify(response.data, null, 2));

    return response.data.choices[0].message.content;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error(e.toJSON());
    } else {
      console.error(e);
    }
  }
};
