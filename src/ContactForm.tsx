import { useForm } from 'react-hook-form';
import { validateForm, submitForm } from './api';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    const validationResponse = await validateForm(data);

    if (!validationResponse.success) {
      for (const [field, message] of Object.entries(validationResponse.errors)) {
        setError(field as keyof ContactFormData, { type: 'server', message });
      }
      return;
    }

    await submitForm(validationResponse.data);
    alert('Message sent successfully!');
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-8 bg-gray-300 rounded-lg shadow-lg"
      noValidate
    >
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          {...register('name')}
        />
        {errors.name && (
          <span className="block mt-2 text-sm text-red-600">{errors.name.message}</span>
        )}
      </div>

      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          {...register('email')}
        />
        {errors.email && (
          <span className="block mt-2 text-sm text-red-600">{errors.email.message}</span>
        )}
      </div>

      <div className="mb-5">
        <label htmlFor="subject" className="block mb-2 font-medium text-gray-700">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          {...register('subject')}
        />
        {errors.subject && (
          <span className="block mt-2 text-sm text-red-600">{errors.subject.message}</span>
        )}
      </div>

      <div className="mb-5">
        <label htmlFor="message" className="block mb-2 font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded resize-y focus:outline-none focus:border-indigo-500"
          {...register('message')}
        />
        {errors.message && (
          <span className="block mt-2 text-sm text-red-600">{errors.message.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 font-medium text-white bg-indigo-500 rounded hover:bg-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
