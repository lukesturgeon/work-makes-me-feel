"use server";

import { embed } from "ai";
import { openai } from "@ai-sdk/openai";
import { createClient } from "@/lib/supabase/server";

export const addUserEntry = async ({
  doing,
  feeling,
}: {
  doing: string;
  feeling: string;
}) => {
  
  // create the entry text in a useful format
  const entryText = `Doing: ${doing}\nFeeling:${feeling}`;
  
  const embedding = await getEmbedding(entryText);

  const sentiment = getSentiment(entryText);

  // connect to supabase and save all the data
  const supabase = createClient();

  const { error } = await supabase.from("entries").insert({
    doing: doing,
    feeling: feeling,
    sentiment_score: sentiment.score,
    embedding: JSON.stringify(embedding),
  });

  if (error) {
    return error.message;
  }

  return "Entry Saved.";
};

export const getUserEntries = async () => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("entries").select(`
        doing,
        feeling`);

    if (error) {
      return error.message;
    }

    return data;

  } catch (e) {
    if (e instanceof Error) {
      return "There was an error: " + e.message;
    }
  }
};

function getEmbedding(entryText: string) {
  return new Promise(async (resolve) => {
    const { embedding } = await embed({
      model: openai.embedding("text-embedding-ada-002"),
      value: entryText,
    });

    resolve(embedding);
  });
}

function getSentiment(entryText: string) {
  // strip the word 'feeling' from the text because it affects the sentiment analysis
  const strippedText = entryText.toLowerCase().replace(/feeling/g, "");

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Sentiment = require("sentiment");
  const sentiment = new Sentiment();
  const result = sentiment.analyze(strippedText);

  return result;
}
