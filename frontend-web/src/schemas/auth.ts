import { z } from 'zod';

// 1. Password validation mirroring backend field_validator rules
const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .refine((val) => /\d/.test(val), {
    message: 'Password must contain at least one numeric digit.',
  })
  .refine((val) => /[!@#$%^&*(),.?":{}|<>_]/.test(val), {
    message: 'Password must contain at least one special character.',
  });

// 2. Login Payload Schema (OAuth2 form format: username/password)
export const loginSchema = z.object({
  username: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

// 3. Optional User Profile Schema
export const userProfileSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  phone_number: z.string().optional(),
});

// 4. Registration Payload Schema (matches backend UserRequest)
export const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: passwordSchema,
  profile: userProfileSchema.optional(),
});

// 5. Email Verification Token Schema
export const emailVerificationSchema = z.object({
  token: z.string().min(1, { message: 'Token is required' }),
});

// Infer TypeScript types directly from Zod schemas
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type UserProfileInput = z.infer<typeof userProfileSchema>;
export type EmailVerificationInput = z.infer<typeof emailVerificationSchema>;