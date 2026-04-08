import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const chatMessageSchema = z.object({
  conversationId: z.string().optional(),
  message: z.string().min(1).max(2000),
});

export const dispensarySearchSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  radiusMiles: z.number().min(1).max(50).default(10),
  strainId: z.string().optional(),
});

export const userPreferencesSchema = z.object({
  toleranceLevel: z.enum(['low', 'medium', 'high']).nullable(),
  preferredTypes: z.array(z.enum(['sativa', 'indica', 'hybrid'])),
  medicalConditions: z.array(z.string()),
});
