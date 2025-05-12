'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

// Validation schema
const ContactSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name is too short')
        .max(50, 'Name is too long')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    subject: Yup.string()
        .min(5, 'Subject is too short')
        .max(100, 'Subject is too long')
        .required('Subject is required'),
    message: Yup.string()
        .min(10, 'Message is too short')
        .max(1000, 'Message is too long')
        .required('Message is required'),
});

export default function Contact() {
    const { colors } = useTheme();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        success: boolean;
        message: string;
    } | null>(null);

    const handleSubmit = async (values: any, { resetForm }: any) => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            console.log('Form submitted:', values);
            setSubmitStatus({
                success: true,
                message: 'Thank you for your message! We will get back to you soon.',
            });
            resetForm();
        } catch (error) {
            setSubmitStatus({
                success: false,
                message: 'There was an error submitting your form. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`min-h-screen ${colors.background}`}>
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className={`text-4xl font-extrabold ${colors.text} sm:text-5xl`}>
                        Contact Us
                    </h1>
                    <p className={`mt-4 text-xl ${colors.textSecondary}`}>
                        Have a question or want to work together? We'd love to hear from you.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Contact Information */}
                    <div className={`${colors.cardBg} rounded-lg ${colors.shadow} p-8`}>
                        <h2 className={`text-2xl font-bold ${colors.text} mb-6`}>
                            Get in Touch
                        </h2>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className={`flex-shrink-0 h-10 w-10 rounded-full ${colors.primary} bg-opacity-10 flex items-center justify-center`}>
                                    <svg className={`h-5 w-5 ${colors.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className={`text-lg font-medium ${colors.text}`}>Email</h3>
                                    <p className={`mt-1 ${colors.textSecondary}`}>contact@webdevco.com</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className={`flex-shrink-0 h-10 w-10 rounded-full ${colors.primary} bg-opacity-10 flex items-center justify-center`}>
                                    <svg className={`h-5 w-5 ${colors.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className={`text-lg font-medium ${colors.text}`}>Phone</h3>
                                    <p className={`mt-1 ${colors.textSecondary}`}>+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className={`flex-shrink-0 h-10 w-10 rounded-full ${colors.primary} bg-opacity-10 flex items-center justify-center`}>
                                    <svg className={`h-5 w-5 ${colors.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className={`text-lg font-medium ${colors.text}`}>Address</h3>
                                    <p className={`mt-1 ${colors.textSecondary}`}>123 Business Street, City, Country</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className={`${colors.cardBg} rounded-lg ${colors.shadow} p-8`}>
                        <h2 className={`text-2xl font-bold ${colors.text} mb-6`}>
                            Send Us a Message
                        </h2>

                        {submitStatus && (
                            <div className={`mb-6 p-4 rounded-md ${submitStatus.success
                                ? 'bg-green-50 text-green-800'
                                : 'bg-red-50 text-red-800'
                                }`}>
                                {submitStatus.message}
                            </div>
                        )}

                        <Formik
                            initialValues={{ name: '', email: '', subject: '', message: '' }}
                            validationSchema={ContactSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched }) => (
                                <Form className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className={`block text-sm font-medium ${colors.text}`}>
                                            Name
                                        </label>
                                        <Field
                                            id="name"
                                            name="name"
                                            type="text"
                                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.name && touched.name ? 'border-red-500' : ''
                                                }`}
                                            placeholder="Your name"
                                        />
                                        <ErrorMessage
                                            name="name"
                                            component="div"
                                            className="mt-1 text-sm text-red-600"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className={`block text-sm font-medium ${colors.text}`}>
                                            Email
                                        </label>
                                        <Field
                                            id="email"
                                            name="email"
                                            type="email"
                                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.email && touched.email ? 'border-red-500' : ''
                                                }`}
                                            placeholder="your.email@example.com"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="mt-1 text-sm text-red-600"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className={`block text-sm font-medium ${colors.text}`}>
                                            Subject
                                        </label>
                                        <Field
                                            id="subject"
                                            name="subject"
                                            type="text"
                                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.subject && touched.subject ? 'border-red-500' : ''
                                                }`}
                                            placeholder="What is this regarding?"
                                        />
                                        <ErrorMessage
                                            name="subject"
                                            component="div"
                                            className="mt-1 text-sm text-red-600"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className={`block text-sm font-medium ${colors.text}`}>
                                            Message
                                        </label>
                                        <Field
                                            as="textarea"
                                            id="message"
                                            name="message"
                                            rows={4}
                                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.message && touched.message ? 'border-red-500' : ''
                                                }`}
                                            placeholder="Your message here..."
                                        />
                                        <ErrorMessage
                                            name="message"
                                            component="div"
                                            className="mt-1 text-sm text-red-600"
                                        />
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                                                }`}
                                        >
                                            {isSubmitting ? (
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            ) : null}
                                            {isSubmitting ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
} 