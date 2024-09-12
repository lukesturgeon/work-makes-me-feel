"use server";

import { embed } from "ai";
import { openai } from "@ai-sdk/openai";
import { createClient } from "@/lib/supabase/server";

export const addUserEntry = async ({
  doing,
  feeling,
  weather,
}: {
  doing: string;
  feeling: string;
  weather: string | null;
}) => {
  // get vector embedding from OpenAI
  const entryText = `Doing: ${doing}\nFeeling:${feeling}`;

  const { embedding } = await embed({
    model: openai.embedding("text-embedding-ada-002"),
    value: entryText,
  });

  // connect to supabase and save all the data
  const supabase = createClient();

  const { error } = await supabase.from("entries").insert({
    doing: doing,
    feeling: feeling,
    weather: weather,
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
        feeling,
        weather`);

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
