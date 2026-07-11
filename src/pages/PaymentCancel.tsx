import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand/5 blur-[120px]" />
      <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand/5 blur-[120px]" />

      <div className="w-full max-w-lg relative z-10">
        <div className="bg-[#121217]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-orange-500" />
          
          <div className="w-20 h-20 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-orange-500" />
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">Payment Cancelled</h1>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            Your payment process was cancelled and you were not charged. If you experienced any issues, you can try again.
          </p>

          <div className="flex flex-col gap-3">
            <Button 
              onClick={() => navigate('/')}
              className="w-full bg-brand hover:bg-orange-600 text-white rounded-2xl h-14 font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(246,86,0,0.3)] transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Return to Home
            </Button>
            <Button 
              onClick={() => {
                navigate('/');
                // Allow some delay, then scroll to pricing
                setTimeout(() => {
                  const pricingElement = document.getElementById('pricing');
                  if (pricingElement) {
                    pricingElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
              variant="outline"
              className="w-full bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-xl h-12 font-bold"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
