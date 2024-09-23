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

export const getUserEntries = async (startDateStr: string, endDateStr: string) => {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  endDate.setHours(23, 59, 59, 999);

  try {
    const supabase = createClient();

    // Get the logged in user with the current existing session
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("No user found");

    // Get this user’s entries
    const { data, error } = await supabase
      .from("entries")
      .select(
        `doing, feeling, created_at, sentiment_score`
      )
      .eq("user_id", user.id)
      .gte("created_at", startDate.toISOString())
      .lte("created_at", endDate.toISOString())
      .order("created_at", { ascending: false });

    if (error) {
      console.error('error', error);      
      return error.message;
    }    

    return data;
  } catch (e: unknown) {
    return "There was an error: " + (e as Error).message;
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
