"use server";

import { embed } from "ai";
import { openai } from "@ai-sdk/openai";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const addUserEntry = async ({
  doing,
  feeling,
}: {
  doing: string;
  feeling: string;
}) => {
  const { userId } = auth();

  if (!userId) {
    console.log("no user id");
    return "No user found";
  }

  // create the entry text in a useful format
  const entryText = `Doing: ${doing}\nFeeling:${feeling}`;

  const embedding = (await getEmbedding(entryText)) as number[];

  const sentiment = getSentiment(entryText);

  try {
    await prisma.entries.create({
      data: {
        doing: doing,
        feeling: feeling,
        sentiment_score: sentiment.score as number,
        embedding: embedding,
        created_at: new Date(),
        user_id: userId,
      },
    });

    return "Entry Saved.";
  } catch (e: unknown) {
    return "There was an error: " + (e as Error).message;
  }
};

export const getUserEntries = async (
  userId: string,
  startDateStr: string,
  endDateStr: string
) => {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  endDate.setHours(23, 59, 59, 999);

  console.log(
    `getUserEntries for ${userId} between ${startDateStr} and ${endDateStr}`
  );

  try {
    const entries = await prisma.entries.findMany({
      select: {
        doing: true,
        feeling: true,
        created_at: true,
        sentiment_score: true,
      },
      where: {
        user_id: userId,
        created_at: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return entries;
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
