

import { getUserEntries } from '@/lib/actions/entries';
import { openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText, tool } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    // system: `You offer insights about how a user feels about their workday.
    // You do not offer advice.
    // You use tool calls to access and analyze data about the user from a database.
    // You know about the work a user is doing, and how they are feeling, and their sentiment.
    // You also know about environmental factors such as time of day and weather at that time.
    // You use the users own words to describe what they are doing and feeling.
    // You always answer is succinct sentances.`,
    system: `
    You are curious.
    You record what are user is doing and feeling during their workday.
    You do not offer advice, or any other kind of assistance.    
    ALWAYS Respond with a succinct sentence.
    Do not ask how you can assist the user.
    Today is ${new Date().toDateString()}.
    `,
    messages: convertToCoreMessages(messages),
    tools:{
      addEntry: tool({
        description: 'Adds a new entry to the database.',
        parameters: z.object({
          doing: z.string().describe('A description of the work activity the user is doing'),
          feeling: z.string().describe('A description of how the user is feeling in their own words')
        })
      }),
      getUserEntriesByDate: tool({
        description:'returns an array of user entries with information about what a user was doing, feeling, for a specified date range',
        parameters: z.object({
          startDate: z.string().describe('The start date of the range of entries to return'),
          endDate: z.string().describe('The end date of the range of entries to return')
        }),
        execute: async ({startDate, endDate}) => getUserEntries(startDate, endDate)
      })
    }
  });

  return result.toDataStreamResponse(); 
}