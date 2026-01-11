import { contactFormSchema } from './validation';

type ValidationErrors = {
  [key: string]: string;
};

type ValidateResponse =
  | { success: true; data: { name: string; email: string; subject: string; message: string } }
  | { success: false; errors: ValidationErrors };

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function validateForm(data: unknown): Promise<ValidateResponse> {
  await delay(300);

  const result = contactFormSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: ValidationErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as string;
    if (!errors[field]) {
      errors[field] = issue.message;
    }
  }

  return { success: false, errors };
}

export async function submitForm(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ success: true }> {
  await delay(1000);
  console.log('Form submitted to server:', data);
  return { success: true };
}
