import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import api from '@/config/api';

export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [plan, setPlan] = useState<string>('');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setStatus('error');
        return;
      }

      try {
        const { data } = await api.post('/payments/verify-session', { sessionId });
        if (data.success && data.user) {
          updateUser(data.user);
          setPlan(data.user.membership || 'Club');
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Error verifying Stripe session:', error);
        setStatus('error');
      }
    };

    verifyPayment();
  }, [sessionId, updateUser]);

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand/5 blur-[120px]" />
      <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand/5 blur-[120px]" />

      <div className="w-full max-w-lg relative z-10">
        {status === 'verifying' && (
          <div className="bg-[#121217]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 text-center shadow-2xl flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-brand animate-spin mb-6" />
            <h2 className="text-2xl font-bold text-white mb-2">Verifying Payment</h2>
            <p className="text-slate-400 text-sm">Please wait while we secure your membership details with Stripe...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="bg-[#121217]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand via-orange-500 to-yellow-500" />
            
            <div className="w-20 h-20 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(246,86,0,0.15)]">
              <CheckCircle2 className="w-12 h-12 text-brand" />
            </div>

            <h1 className="text-3xl font-extrabold text-white mb-3 tracking-tight">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-yellow-400">Zenith Club</span>!
            </h1>
            
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              Your payment has been successfully processed. Your account is now upgraded to <span className="text-brand font-bold uppercase tracking-wider">{plan}</span> status.
            </p>

            <div className="bg-black/40 border border-white/5 rounded-2xl p-5 mb-8 text-left space-y-3">
              <div className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                <ShieldCheck className="w-5 h-5 text-brand shrink-0" />
                <span>All VIP privileges are now unlocked</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                <ShieldCheck className="w-5 h-5 text-brand shrink-0" />
                <span>Private stay discounts applied automatically</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                <ShieldCheck className="w-5 h-5 text-brand shrink-0" />
                <span>Priority booking active</span>
              </div>
            </div>

            <Button 
              onClick={() => navigate('/dashboard')}
              className="w-full bg-brand hover:bg-orange-600 text-white rounded-2xl h-14 font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(246,86,0,0.3)] hover:shadow-[0_0_30px_rgba(246,86,0,0.5)] transition-all group"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-[#121217]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-red-500" />
            
            <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-red-500 text-4xl font-black">!</span>
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">Verification Failed</h1>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              We were unable to verify your checkout session. If you completed your payment, please contact our support team.
            </p>

            <div className="flex flex-col gap-3">
              <Button 
                onClick={() => navigate('/')}
                className="w-full bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-xl h-12 font-bold"
              >
                Go to Home
              </Button>
              <Button 
                onClick={() => navigate('/contact')}
                variant="outline"
                className="w-full bg-transparent border-brand/20 hover:border-brand/40 text-brand rounded-xl h-12 font-bold"
              >
                Contact Support
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
