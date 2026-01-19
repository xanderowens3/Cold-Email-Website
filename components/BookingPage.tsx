import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, Gift, MessageSquare, Zap, Building2, Globe, Mail, User, Send, ChevronRight } from 'lucide-react';

interface BookingPageProps {
  onBack: () => void;
}

type Step = 'initial' | 'survey' | 'success';

const BookingPage: React.FC<BookingPageProps> = ({ onBack }) => {
  const [step, setStep] = useState<Step>('initial');
  const [surveyIndex, setSurveyIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Initial Form State
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [companyWebsite, setCompanyWebsite] = useState<string>('');

  // Survey Form State
  const [ltv, setLtv] = useState<string>('');
  const [companySize, setCompanySize] = useState<string>('');
  const [revenue, setRevenue] = useState<string>('');
  const [challenge, setChallenge] = useState<string>('');
  const [successVision, setSuccessVision] = useState<string>('');
  const [motivation, setMotivation] = useState<string>('');
  const [motivationOther, setMotivationOther] = useState<string>('');

  // Ensure user is at the top when the success screen or specific survey steps appear
  useEffect(() => {
    if (step === 'success') {
      window.scrollTo(0, 0);
    }
  }, [step]);

  const handleInitialSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Extract form data
    const formData = new FormData(e.currentTarget);
    setFirstName(formData.get('firstName') as string);
    setLastName(formData.get('lastName') as string);
    setEmail(formData.get('email') as string);
    setCompanyName(formData.get('companyName') as string);
    setCompanyWebsite(formData.get('companyWebsite') as string);

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('survey');
      window.scrollTo(0, 0);
    }, 1000);
  };

  const handleSurveyNext = async () => {
    if (surveyIndex === 0) {
      if (!ltv) return;
      setSurveyIndex(1);
      window.scrollTo(0, 0);
    } else if (surveyIndex === 1) {
      if (!companySize) return;
      setSurveyIndex(2);
      window.scrollTo(0, 0);
    } else if (surveyIndex === 2) {
      if (!revenue) return;
      setSurveyIndex(3);
      window.scrollTo(0, 0);
    } else if (surveyIndex === 3) {
      if (!challenge.trim()) return;
      setSurveyIndex(4);
      window.scrollTo(0, 0);
    } else if (surveyIndex === 4) {
      if (!successVision.trim()) return;
      setSurveyIndex(5);
      window.scrollTo(0, 0);
    } else {
      if (!motivation) return;
      if (motivation === 'Other' && !motivationOther.trim()) return;

      setLoading(true);

      // Prepare data to send to webhook
      const webhookData = {
        firstName,
        lastName,
        email,
        companyName,
        companyWebsite,
        ltv,
        companySize,
        revenue,
        challenge,
        successVision,
        motivation: motivation === 'Other' ? motivationOther : motivation,
        submittedAt: new Date().toISOString()
      };

      try {
        // Send data to webhook
        await fetch('https://hook.eu2.make.com/hdg3g0rrka8mnsmicujmhh7w5ssaji2p', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData),
        });
      } catch (error) {
        console.error('Error sending data to webhook:', error);
        // Continue to success page even if webhook fails
      }

      setTimeout(() => {
        setLoading(false);
        setStep('success');
        window.scrollTo(0, 0);
      }, 800);
    }
  };

  const benefits = [
    {
      icon: <Gift size={20} />,
      title: "Free Access",
      description: "Use our systems completely free during the beta period"
    },
    {
      icon: <MessageSquare size={20} />,
      title: "Product Influence",
      description: "Help shape the next wave of high-converting cold outreach with your insights"
    },
    {
      icon: <Zap size={20} />,
      title: "Priority Access",
      description: "Once the service goes live, first sign-ups will gain priority access to the finished product and skip waiting lists"
    }
  ];

  const ltvOptions = [
    "Less than $1,000",
    "$1,000 – $5,000",
    "$5,000 – $15,000",
    "$15,000 – $50,000",
    "$50,000+"
  ];

  const sizeOptions = [
    "1–10",
    "10–50",
    "50–100",
    "100-200",
    "200-500",
    "500+"
  ];

  const revenueOptions = [
    "Under $10k",
    "$10k – $50k",
    "$50k – $200k",
    "$200k+"
  ];

  const motivationOptions = [
    { label: "Looking to scale outbound lead generation", value: "Scale" },
    { label: "Exploring better cold outreach strategies", value: "Better Strategy" },
    { label: "Replacing an underperforming system or agency", value: "Replace" },
    { label: "Other (please specify)", value: "Other" }
  ];

  const isSurveyStepValid = () => {
    if (surveyIndex === 0) return !!ltv;
    if (surveyIndex === 1) return !!companySize;
    if (surveyIndex === 2) return !!revenue;
    if (surveyIndex === 3) return challenge.trim().length > 0;
    if (surveyIndex === 4) return successVision.trim().length > 0;
    if (surveyIndex === 5) {
      if (!motivation) return false;
      if (motivation === 'Other') return motivationOther.trim().length > 0;
      return true;
    }
    return false;
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-slate-900 p-12 rounded-[3rem] text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-blue-500/30">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4 serif">Success!</h2>
            <p className="text-lg text-slate-400 mb-10 font-light">
              Your request for early access has been received. We will be in touch with you very soon!
            </p>
            <button
              onClick={onBack}
              className="text-blue-400 font-bold uppercase tracking-widest text-xs hover:text-blue-300 transition-colors"
            >
              Return to Homepage
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-stretch">
        {/* Left Column: Context */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col h-full"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors mb-8 group w-fit"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            <span className="text-xs font-bold uppercase tracking-widest">Back to Home</span>
          </button>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight tracking-tight serif">
            Sign-Up For <span className="text-blue-600 italic font-medium">Early Access</span>
          </h1>
          <p className="text-lg text-slate-600 mb-12 font-light leading-relaxed max-w-lg">
            Our AI cold email system is currently under development in collaboration with select cybersecurity firms. We have a few open spots for other firms to use the beta of our system so we can get feedback. From the sign-ups, three firms will get the following benefits:
          </p>

          <div className="space-y-4 mb-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{
                  x: 10,
                  backgroundColor: 'rgba(59, 130, 246, 0.03)'
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="flex gap-4 items-start p-4 rounded-3xl border border-transparent hover:border-blue-100 transition-colors group"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm"
                >
                  {benefit.icon}
                </motion.div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{benefit.title}</h4>
                  <p className="text-sm text-slate-500 font-light leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Multi-step Form (Dark Mode) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center"
        >
          <div className="bg-slate-900 p-8 md:p-12 rounded-[3rem] relative overflow-hidden w-full h-full flex flex-col justify-center shadow-2xl min-h-[600px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-600/10 blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {step === 'initial' && (
                <motion.div
                  key="initial-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="relative z-10"
                >
                  <div className="mb-8">
                    <h3 className="text-3xl font-medium text-white serif italic tracking-tight">
                      Grab Your Spot Now!
                    </h3>
                    <div className="h-1 w-12 bg-blue-600 mt-4 rounded-full" />
                  </div>

                  <form onSubmit={handleInitialSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-slate-500 ml-1">First Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors" size={16} />
                        <input
                          required
                          type="text"
                          name="firstName"
                          placeholder="John"
                          className="w-full bg-white/5 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-light text-sm text-white placeholder:text-slate-600"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-slate-500 ml-1">Last Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors" size={16} />
                        <input
                          required
                          type="text"
                          name="lastName"
                          placeholder="Doe"
                          className="w-full bg-white/5 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-light text-sm text-white placeholder:text-slate-600"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-slate-500 ml-1">Email</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors" size={16} />
                        <input
                          required
                          type="email"
                          name="email"
                          placeholder="john@agency.com"
                          className="w-full bg-white/5 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-light text-sm text-white placeholder:text-slate-600"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-slate-500 ml-1">Company Name</label>
                      <div className="relative group">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors" size={16} />
                        <input
                          required
                          type="text"
                          name="companyName"
                          placeholder="Acme Agency"
                          className="w-full bg-white/5 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-light text-sm text-white placeholder:text-slate-600"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-slate-500 ml-1">Company Website</label>
                      <div className="relative group">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors" size={16} />
                        <input
                          required
                          type="url"
                          name="companyWebsite"
                          placeholder="https://agency.com"
                          className="w-full bg-white/5 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-light text-sm text-white placeholder:text-slate-600"
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-2xl shadow-blue-500/20 hover:bg-blue-500 transition-all flex items-center justify-center gap-3 text-sm"
                      >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Sign Up</span>
                            <Send size={16} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 'survey' && (
                <motion.div
                  key={`survey-step-${surveyIndex}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="relative z-10"
                >
                  <div className="mb-8">
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4"
                    >
                      <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-blue-400">Final Step</span>
                    </motion.div>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 serif italic tracking-tight leading-normal drop-shadow-[0_0_20px_rgba(96,165,250,0.5)] py-2">
                      Before you go...
                    </h3>
                  </div>

                  <p className="text-slate-400 font-light text-base leading-relaxed mb-10">
                    Help us tailor the perfect solution for your firm by answering a few quick questions about your current setup and future goals.
                  </p>

                  <div className="space-y-4">
                    <AnimatePresence mode="wait">
                      {surveyIndex === 0 && (
                        <motion.div
                          key="q1"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <p className="text-white font-semibold text-lg mb-4">
                            1. What is the lifetime value (LTV) of a single client for your business?
                          </p>
                          <div className="grid gap-3">
                            {ltvOptions.map((option) => (
                              <button
                                key={option}
                                onClick={() => setLtv(option)}
                                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${ltv === option
                                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                                  : 'bg-white/5 border-slate-800 text-slate-400 hover:bg-white/10 hover:border-slate-700'
                                  }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">{option}</span>
                                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${ltv === option ? 'border-white bg-white/20' : 'border-slate-700'
                                    }`}>
                                    {ltv === option && <div className="w-2 h-2 rounded-full bg-white" />}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                      {surveyIndex === 1 && (
                        <motion.div
                          key="q2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <p className="text-white font-semibold text-lg mb-4">
                            2. Company Size (Headcount)
                          </p>
                          <div className="grid gap-3">
                            {sizeOptions.map((option) => (
                              <button
                                key={option}
                                onClick={() => setCompanySize(option)}
                                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${companySize === option
                                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                                  : 'bg-white/5 border-slate-800 text-slate-400 hover:bg-white/10 hover:border-slate-700'
                                  }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">{option}</span>
                                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${companySize === option ? 'border-white bg-white/20' : 'border-slate-700'
                                    }`}>
                                    {companySize === option && <div className="w-2 h-2 rounded-full bg-white" />}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                      {surveyIndex === 2 && (
                        <motion.div
                          key="q3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <p className="text-white font-semibold text-lg mb-4">
                            3. Approximate Monthly Revenue
                          </p>
                          <div className="grid gap-3">
                            {revenueOptions.map((option) => (
                              <button
                                key={option}
                                onClick={() => setRevenue(option)}
                                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${revenue === option
                                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                                  : 'bg-white/5 border-slate-800 text-slate-400 hover:bg-white/10 hover:border-slate-700'
                                  }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">{option}</span>
                                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${revenue === option ? 'border-white bg-white/20' : 'border-slate-700'
                                    }`}>
                                    {revenue === option && <div className="w-2 h-2 rounded-full bg-white" />}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                      {surveyIndex === 3 && (
                        <motion.div
                          key="q4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <p className="text-white font-semibold text-lg mb-4">
                            4. What is the biggest challenge you’re facing with cold outreach right now?
                          </p>
                          <div className="relative group">
                            <textarea
                              required
                              value={challenge}
                              onChange={(e) => setChallenge(e.target.value)}
                              placeholder="e.g. Emails landing in spam, low reply rates, tech complexity..."
                              rows={5}
                              className="w-full bg-white/5 border border-slate-800 rounded-xl py-4 px-5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-light text-sm text-white placeholder:text-slate-600 resize-none"
                            />
                          </div>
                        </motion.div>
                      )}
                      {surveyIndex === 4 && (
                        <motion.div
                          key="q5"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <p className="text-white font-semibold text-lg mb-4">
                            5. If this worked perfectly, what would success look like for you in the next 3–6 months?
                          </p>
                          <div className="relative group">
                            <textarea
                              required
                              value={successVision}
                              onChange={(e) => setSuccessVision(e.target.value)}
                              placeholder="Describe your ideal state..."
                              rows={5}
                              className="w-full bg-white/5 border border-slate-800 rounded-xl py-4 px-5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-light text-sm text-white placeholder:text-slate-600 resize-none"
                            />
                          </div>
                        </motion.div>
                      )}
                      {surveyIndex === 5 && (
                        <motion.div
                          key="q6"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <p className="text-white font-semibold text-lg mb-4">
                            6. What motivated you to sign up today?
                          </p>
                          <div className="grid gap-3">
                            {motivationOptions.map((opt) => (
                              <div key={opt.value} className="space-y-3">
                                <button
                                  onClick={() => setMotivation(opt.value)}
                                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${motivation === opt.value
                                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                                    : 'bg-white/5 border-slate-800 text-slate-400 hover:bg-white/10 hover:border-slate-700'
                                    }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium">{opt.label}</span>
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${motivation === opt.value ? 'border-white bg-white/20' : 'border-slate-700'
                                      }`}>
                                      {motivation === opt.value && <div className="w-2 h-2 rounded-full bg-white" />}
                                    </div>
                                  </div>
                                </button>

                                {opt.value === 'Other' && motivation === 'Other' && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    className="overflow-hidden"
                                  >
                                    <textarea
                                      required
                                      value={motivationOther}
                                      onChange={(e) => setMotivationOther(e.target.value)}
                                      placeholder="Please specify..."
                                      rows={3}
                                      className="w-full bg-white/10 border border-slate-700 rounded-xl py-3 px-4 outline-none focus:border-blue-500 transition-all font-light text-sm text-white placeholder:text-slate-600 resize-none"
                                    />
                                  </motion.div>
                                )}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="pt-8">
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        disabled={loading || !isSurveyStepValid()}
                        onClick={handleSurveyNext}
                        className={`w-full font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 text-sm ${isSurveyStepValid()
                          ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/20 hover:bg-blue-500'
                          : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                          }`}
                      >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>{surveyIndex === 5 ? 'Finish' : 'Next'}</span>
                            <ChevronRight size={18} />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingPage;