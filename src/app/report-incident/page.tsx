"use client";
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Loader } from '../../components/ui/loader';
import { Button } from '../../component/ui/button';

const ReportIssueContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    amountPaid: '',
    paymentIssue: '',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Check if user accessed this page with payment error context
  useEffect(() => {
    const errorType = searchParams.get('error');
    const amount = searchParams.get('amount');
    const email = searchParams.get('email');
    // const pcnNumber = searchParams.get('pcnNumber');
    
    // If no error context, redirect back to home
    if (!errorType) {
      router.push('/');
      return;
    }
    
    setPaymentError(errorType);
    
    // Pre-populate form with available data
    setFormData(prev => ({
      ...prev,
      email: email || '',
      amountPaid: amount || '',
      paymentIssue: getPaymentIssueFromError(errorType)
    }));
  }, [searchParams, router]);

  const getPaymentIssueFromError = (errorType: string): string => {
    switch (errorType) {
      case 'gocardless_failed':
        return 'Payment not processed';
      case 'council_payment_failed':
        return 'Payment failed';
      case 'duplicate_payment':
        return 'Duplicate payment';
      case 'incorrect_amount':
        return 'Incorrect amount charged';
      default:
        return 'Other';
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.fullname.trim()) errors.fullname = "Full name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.amountPaid.trim()) errors.amountPaid = "Amount paid is required";
    if (!formData.paymentIssue) errors.paymentIssue = "Please select a payment issue";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success logic here (reset form, show success message, navigate, etc.)
      alert("Report submitted successfully!");
      setFormData({
        fullname: '',
        email: '',
        amountPaid: '',
        paymentIssue: '',
      });
    } catch (err) {
      console.error("Failed to submit report", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    // Navigate back to payment failed page or home
    const from = searchParams.get('from');
    if (from === 'payment-failed') {
      router.push('/payment-failed');
    } else {
      router.push('/');
    }
  };

  const paymentIssues = [
    "Payment not processed",
    "Incorrect amount charged",
    "Duplicate payment",
    "Payment failed",
    "Other"
  ];

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      {/* Loading overlay */}
      {isSubmitting && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-40 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center h-16 w-16 bg-gray-100 rounded-md">
              <Loader size={32} className="text-black" />
            </div>
            <div className="text-center">
              <p className="text-[14px] font-sora text-[#7E8081]">
                Submitting your report...
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="w-full flex flex-col gap-[16px] pt-[20px] px-[16px]">
        <button
          className="flex items-center gap-[16px] text-gray-700 hover:text-black"
          onClick={handleBack}
        >
          <div className="p-[12px] rounded-full bg-[#E7EFFD]">
            <ArrowLeft className="w-[24px] h-[24px] text-[#105AE2]" />
          </div>
          <p className="flex flex-col text-left">
            <span className="text-[#19191A] text-[20px] leading-[28px] font-sora font-semibold">Report Issue</span>
          </p>
        </button>

        <div className="text-[14px] text-[#DC2626] bg-[#FEF2F2] leading-[20px] font-sora font-light p-[12px] rounded-[8px] border-1 border-[#FECACA]">
          <p>
            {paymentError === 'gocardless_failed' && 'Your payment to SnapMyFine failed. Please report this issue so we can help resolve it.'}
            {paymentError === 'council_payment_failed' && 'We were unable to process your payment with the council. Please report this issue for assistance.'}
            {paymentError && !['gocardless_failed', 'council_payment_failed'].includes(paymentError) && 'A payment error occurred. Please provide details below so we can assist you.'}
          </p>
        </div>

        <div className="w-full">
          <form
            className="w-full flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[#19191A] text-[14px] leading-[20px] font-medium font-sora tracking-[0.1%] flex items-center gap-1">
                Fullname
                {validationErrors.fullname && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={(e) => handleInputChange('fullname', e.target.value)}
                placeholder="Enter your full name"
                className="border border-[#D1D5DB] rounded-[8px] pl-[16px] pr-[16px] py-[16px] text-[14px] text-[#4A4C4F] outline-none focus:ring-2 focus:ring-[#105AE2] focus:border-[#105AE2]"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-2">
              <label className="text-[#19191A] text-[14px] leading-[20px] font-medium font-sora tracking-[0.1%] flex items-center gap-1">
                Email Address
                {validationErrors.email && <span className="text-red-500">*</span>}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
                className="border border-[#D1D5DB] rounded-[8px] pl-[16px] pr-[16px] py-[16px] text-[14px] text-[#4A4C4F] outline-none focus:ring-2 focus:ring-[#105AE2] focus:border-[#105AE2]"
              />
            </div>

            {/* Amount Paid */}
            <div className="flex flex-col gap-2">
              <label className="text-[#19191A] text-[14px] leading-[20px] font-medium font-sora tracking-[0.1%] flex items-center gap-1">
                Amount Paid (£)
                {validationErrors.amountPaid && <span className="text-red-500">*</span>}
              </label>
              <input
                type="number"
                name="amountPaid"
                value={formData.amountPaid}
                onChange={(e) => handleInputChange('amountPaid', e.target.value)}
                placeholder="Enter the amount paid"
                className="border border-[#D1D5DB] rounded-[8px] pl-[16px] pr-[16px] py-[16px] text-[14px] font-sora text-[#4A4C4F] outline-none focus:ring-2 focus:ring-[#105AE2] focus:border-[#105AE2]"
              />
            </div>

            {/* Payment Issue Dropdown */}
            <div className="flex flex-col gap-2">
              <label className="text-[#19191A] text-[14px] leading-[20px] font-medium  font-sora tracking-[0.1%] flex items-center gap-1">
                Payment Issue
                {validationErrors.paymentIssue && <span className="text-red-500">*</span>}
              </label>
              <select
                name="paymentIssue"
                value={formData.paymentIssue}
                onChange={(e) => handleInputChange('paymentIssue', e.target.value)}
                className="appearance-none border border-[#D1D5DB] text-[#4A4C4F] rounded-[8px]  font-sora pl-[16px] pr-[40px] py-[16px] text-[14px] outline-none focus:ring-2 focus:ring-[#105AE2] focus:border-[#105AE2]"
              >
                <option value="">Select payment issue</option>
                {paymentIssues.map((issue) => (
                  <option key={issue} value={issue}>
                    {issue}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="text-[black] w-full font-medium  font-sora flex flex-col gap-[8px]">
              <Button
                type="submit"
                disabled={isSubmitting}
                className={`p-[16px] text-[14px] w-full h-[44px] rounded-[8px] flex items-center justify-center gap-2 transition-colors ${
                  isSubmitting 
                    ? "text-[#ffffff] bg-[#CFDFFC] cursor-not-allowed" 
                    : "text-white bg-[#105AE2] cursor-pointer hover:bg-[#0e4cc7]"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Report"} 
                <ArrowRight className="w-[20px] h-[20px]" />
              </Button>
              <p className="text-[12px] text-[#7E8081] leading-[16px]  font-sora font-regular text-center px-[30px]">
                We'll review your report and get back to you within 24 hours
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ReportIssuePage = () => {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><Loader /></div>}>
      <ReportIssueContent />
    </Suspense>
  );
};

export default ReportIssuePage;