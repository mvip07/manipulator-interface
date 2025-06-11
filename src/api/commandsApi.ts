import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface CommandRequest {
    originalCommand: string;
    optimizedCommand: string;
    samplesBefore: Array<{ x: number; y: number }>;
}

interface CommandResponse {
    id: string;
    success: boolean;
    timestamp: number;
    originalCommand: string;
    optimizedCommand: string;
    samplesBefore: Array<{ x: number; y: number }>;
    samplesAfter: Array<{ x: number; y: number }>;
}

export const commandsApi = createApi({
    reducerPath: 'commandsApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/commands' }),
    endpoints: (builder) => ({
        executeCommand: builder.mutation<CommandResponse, CommandRequest>({
            query: (command) => ({
                url: 'execute',
                method: 'POST',
                body: command,
            }),
        }),
        getHistory: builder.query<Array<CommandResponse>, void>({
            query: () => 'history',
        }),
    }),
});

export const { useExecuteCommandMutation, useGetHistoryQuery } = commandsApi;