import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email'),
  model: z.string().min(1, 'Select a model'),
  date: z.string().min(1, 'Select a date'),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log(data);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-8">Reserve Your Experience</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <input
                {...register('fullName')}
                type="text"
                placeholder="Full Name"
                className="w-full bg-[#0f1117] border border-[#1e2330] rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
              />
              {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>}
            </div>
            <div>
              <input
                {...register('email')}
                type="email"
                placeholder="Email Address"
                className="w-full bg-[#0f1117] border border-[#1e2330] rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <select
                {...register('model')}
                className="w-full bg-[#0f1117] border border-[#1e2330] rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
              >
                <option value="">Select Vehicle Model</option>
                <option value="X1">SYPHEX X1</option>
                <option value="V7">SYPHEX V7</option>
                <option value="GT-R">SYPHEX GT-R</option>
              </select>
              {errors.model && <p className="text-red-400 text-sm mt-1">{errors.model.message}</p>}
            </div>
            <div>
              <input
                {...register('date')}
                type="date"
                className="w-full bg-[#0f1117] border border-[#1e2330] rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
              />
              {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date.message}</p>}
            </div>
            <div>
              <textarea
                {...register('message')}
                placeholder="Message (optional)"
                rows={4}
                className="w-full bg-[#0f1117] border border-[#1e2330] rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#3b82f6] text-white py-4 rounded-lg font-medium hover:bg-[#2563eb] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : 'Submit Reservation'}
            </button>
          </form>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center"
            >
              ✓ Reservation confirmed! We'll be in touch shortly.
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default BookingForm;