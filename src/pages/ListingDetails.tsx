import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, ArrowLeft, Share2, Heart, Shield, Zap, Wifi, Coffee, Car, CheckCircle2, Minus, Plus, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LISTINGS_DATA } from '@/data/listings';
import api from '@/config/api';
import { useAuth } from '@/context/AuthContext';

// Helper to get the correct icon component based on string
const getIcon = (iconName: string) => {
  const icons: Record<string, any> = { Wifi, Zap, Car, Coffee, Shield };
  return icons[iconName] || Star;
};

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState<any>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [isRequested, setIsRequested] = useState(false);
  const [photoGalleryOpen, setPhotoGalleryOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState('');

  // Clear toast after 3 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);
  
  // Get related items (just other items from the mock data)
  const related = LISTINGS_DATA.filter(item => item.id !== Number(id)).slice(0, 3);

  // Scroll to top on mount
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const { data } = await api.get(`/listings/${id}`);
        setListing(data);
      } catch (error) {
        console.warn('API not reachable, falling back to mock data');
        const found = LISTINGS_DATA.find(item => item.id.toString() === id);
        setListing(found);
      } finally {
        setLoading(false);
      }
    };
    window.scrollTo(0, 0);
    fetchListing();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Listing not found</h1>
        <Button onClick={() => navigate('/')} className="bg-brand text-white">Return Home</Button>
      </div>
    );
  }

  // Fallbacks for MongoDB documents that don't have these mock properties
  const safeListing = {
    ...listing,
    host: listing.host || 'Zenith Host',
    reviewsCount: listing.reviewsCount || 0,
    specs: listing.specs || { guests: 4, bedrooms: 2, beds: 2, baths: 1 },
    amenities: listing.amenities || [
      { name: "High-speed Wi-Fi", icon: "Wifi" },
      { name: "Free Parking", icon: "Car" },
      { name: "Premium Security", icon: "Shield" }
    ],
    reviews: listing.reviews || [],
    images: listing.images?.length >= 4 ? listing.images : [
      listing.image, 
      listing.image, 
      listing.image, 
      listing.image
    ]
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 selection:bg-brand/30 pb-24 pt-32 md:pt-40">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Navigation & Actions */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to listings
          </Link>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button className="flex items-center gap-2 text-slate-400 hover:text-brand transition-colors">
              <Heart className="w-4 h-4" /> Save
            </button>
          </div>
        </div>

        {/* Title & Meta */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{safeListing.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-300">
            <div className="flex items-center gap-1 text-white">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              {safeListing.rating} <span className="text-slate-400 underline decoration-slate-600 underline-offset-4 cursor-pointer hover:text-white">({safeListing.reviewsCount} reviews)</span>
            </div>
            <span className="text-slate-600">•</span>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {safeListing.location}
            </div>
          </div>
        </div>

        {/* Multiple Images / Media Gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-12">
          <div className="col-span-4 md:col-span-2 row-span-2 relative group overflow-hidden">
            <img src={safeListing.images[0]} alt="Main" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          </div>
          <div className="col-span-2 md:col-span-1 row-span-1 relative group overflow-hidden hidden md:block">
            <img src={safeListing.images[1]} alt="Interior 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          </div>
          <div className="col-span-2 md:col-span-1 row-span-1 relative group overflow-hidden hidden md:block">
            <img src={safeListing.images[2]} alt="Interior 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          </div>
          <div className="col-span-4 md:col-span-2 row-span-1 relative group overflow-hidden hidden md:block">
            <img src={safeListing.images[3]} alt="Exterior" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            <div 
              onClick={() => {
                setCurrentPhotoIndex(0);
                setPhotoGalleryOpen(true);
              }}
              className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg cursor-pointer hover:bg-white/20 transition-colors"
            >
              <span className="text-white font-medium text-sm">View all photos</span>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Key Information / Specifications */}
            <section>
              <div className="flex justify-between items-center pb-6 border-b border-white/10">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Hosted by {safeListing.host}</h2>
                  <div className="flex gap-4 text-slate-400 text-sm">
                    <span>{safeListing.specs.guests} guests</span> • 
                    <span>{safeListing.specs.bedrooms} bedrooms</span> • 
                    <span>{safeListing.specs.beds} beds</span> • 
                    <span>{safeListing.specs.baths} baths</span>
                  </div>
                </div>
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand to-orange-400 p-0.5">
                  <div className="w-full h-full rounded-full bg-[#121217] flex items-center justify-center">
                    <span className="text-xl font-bold">{safeListing.host.charAt(0)}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Description / Overview */}
            <section>
              <h3 className="text-xl font-bold text-white mb-4">About this place</h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                {safeListing.description}
              </p>
            </section>

            {/* Amenities */}
            <section>
              <h3 className="text-xl font-bold text-white mb-6">What this place offers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
                {safeListing.amenities.map((item: any, idx: number) => {
                  const Icon = getIcon(item.icon);
                  return (
                    <div key={idx} className="flex items-center gap-4 text-slate-300 font-medium">
                      <Icon className="w-6 h-6 text-brand" />
                      {item.name}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Reviews / Ratings */}
            <section className="pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 text-2xl font-bold text-white mb-8">
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                {safeListing.rating} <span className="text-slate-400 text-lg">({safeListing.reviewsCount} reviews)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {safeListing.reviews.map((review: any) => (
                  <div key={review.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-white">{review.author}</div>
                        <div className="text-xs text-slate-500">{review.date}</div>
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">"{review.text}"</p>
                  </div>
                ))}
              </div>
            </section>
            
          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:col-span-1 relative">
            <div className="sticky top-32 bg-[#121217]/80 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className="flex items-end gap-1 mb-6">
                <span className="text-3xl font-bold text-white">${safeListing.price}</span>
                <span className="text-slate-400 mb-1">/ night</span>
              </div>
              
              <div className="border border-white/10 rounded-xl mb-6 overflow-hidden">
                <div className="flex border-b border-white/10">
                  <div className="flex-1 p-3 border-r border-white/10 hover:bg-white/5 transition-colors relative cursor-pointer">
                    <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Check-in</div>
                    <input 
                      type="date" 
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="bg-transparent text-sm font-medium outline-none text-white w-full cursor-pointer appearance-none [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                    />
                  </div>
                  <div className="flex-1 p-3 hover:bg-white/5 transition-colors relative cursor-pointer">
                    <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Checkout</div>
                    <input 
                      type="date" 
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="bg-transparent text-sm font-medium outline-none text-white w-full cursor-pointer appearance-none [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                    />
                  </div>
                </div>
                <div className="p-3 flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Guests</div>
                    <div className="text-sm font-medium">{guests} guest{guests > 1 ? 's' : ''}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-50"
                      disabled={guests <= 1}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-semibold text-sm w-4 text-center">{guests}</span>
                    <button 
                      onClick={() => setGuests(guests + 1)}
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => {
                  if (!checkIn || !checkOut) {
                    setToastMessage("Please select check-in and checkout dates.");
                    return;
                  }
                  
                  // Save to localStorage
                  const stored = localStorage.getItem('my_reservations');
                  const reservations = stored ? JSON.parse(stored) : [];
                  const newReservation = {
                    id: Math.random().toString(36).substr(2, 9),
                    listingId: safeListing?.id,
                    title: safeListing?.title,
                    image: safeListing?.images?.[0] || safeListing?.image,
                    location: safeListing?.location,
                    price: safeListing?.price,
                    checkIn,
                    checkOut,
                    guests,
                    status: 'Pending',
                    userId: user?.id
                  };
                  localStorage.setItem('my_reservations', JSON.stringify([...reservations, newReservation]));

                  setBookingModalOpen(true);
                  setIsRequested(true);
                }}
                disabled={isRequested}
                className={`w-full h-14 font-bold text-lg rounded-xl shadow-[0_10px_30px_rgba(246,86,0,0.3)] transition-all ${
                  isRequested 
                    ? "bg-green-500/20 text-green-400 border border-green-500/50 shadow-none cursor-not-allowed hover:bg-green-500/20" 
                    : "bg-gradient-to-r from-brand to-orange-500 hover:from-brand hover:to-orange-400 text-white"
                }`}
              >
                {isRequested ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> Requested
                  </span>
                ) : (
                  "Reserve"
                )}
              </Button>
              <div className="text-center text-xs text-slate-500 mt-4">You won't be charged yet</div>
            </div>
          </div>

        </div>

        {/* Related Items Section */}
        <section className="mt-24 pt-12 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all"
              >
                <div className="relative w-full h-48 overflow-hidden bg-slate-900 border-b border-white/10">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 flex items-center gap-1 border border-white/10">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    {item.rating}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-white mb-2 group-hover:text-brand transition-colors truncate">{item.title}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm font-semibold text-brand">{item.price}</span>
                    <Link to={`/listings/${item.id}`} className="text-xs font-bold text-slate-300 hover:text-white underline underline-offset-4 transition-colors">
                      View details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>

      {/* Booking Confirmation Modal */}
      <AnimatePresence>
        {bookingModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setBookingModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#121217] border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Reservation Request Sent!</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Your request for <strong className="text-white">{safeListing?.title}</strong> from <strong className="text-white">{checkIn}</strong> to <strong className="text-white">{checkOut}</strong> for {guests} guest{guests > 1 ? 's' : ''} has been submitted successfully. The host will confirm your booking shortly.
              </p>
              <div className="w-full flex flex-col gap-3">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="w-full bg-brand hover:bg-orange-600 text-white h-12 rounded-xl font-bold shadow-[0_0_20px_rgba(246,86,0,0.3)] transition-all"
                >
                  Go to Dashboard
                </Button>
                <Button 
                  onClick={() => {
                    setBookingModalOpen(false);
                  }}
                  variant="outline"
                  className="w-full bg-transparent border-white/20 text-white hover:bg-white/10 h-12 rounded-xl font-bold transition-all"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Photo Gallery Modal */}
      <AnimatePresence>
        {photoGalleryOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#09090b]">
            {/* Header */}
            <div className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent">
              <div className="text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                {currentPhotoIndex + 1} / {safeListing.images.length}
              </div>
              <button 
                onClick={() => setPhotoGalleryOpen(false)}
                className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            
            {/* Main Image */}
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
              <motion.img 
                key={currentPhotoIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                src={safeListing.images[currentPhotoIndex]} 
                alt={`Gallery ${currentPhotoIndex + 1}`} 
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              />
            </div>

            {/* Navigation */}
            <button 
              onClick={() => setCurrentPhotoIndex(prev => Math.max(0, prev - 1))}
              disabled={currentPhotoIndex === 0}
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/50 flex items-center justify-center hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-md border border-white/10 z-10"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            <button 
              onClick={() => setCurrentPhotoIndex(prev => Math.min(safeListing.images.length - 1, prev + 1))}
              disabled={currentPhotoIndex === safeListing.images.length - 1}
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/50 flex items-center justify-center hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-md border border-white/10 z-10"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] bg-red-500/10 border border-red-500/20 backdrop-blur-xl px-6 py-3 rounded-full flex items-center gap-3 shadow-[0_10px_40px_rgba(239,68,68,0.2)]"
          >
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-100 font-medium text-sm">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ListingDetails;
