import { z } from 'zod';

// TODO zod schema
export const TodoItemSchema = z.object({
    title: z.string().min(1).max(255)
})

export type TodoItem = z.infer<typeof TodoItemSchema>