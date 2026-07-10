import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, ArrowLeft, Share2, Heart, Shield, Zap, Wifi, Coffee, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LISTINGS_DATA } from '@/data/listings';
import api from '@/config/api';

// Helper to get the correct icon component based on string
const getIcon = (iconName: string) => {
  const icons: Record<string, any> = { Wifi, Zap, Car, Coffee, Shield };
  return icons[iconName] || Star;
};

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState<any>(null);
  
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
            <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg cursor-pointer hover:bg-white/20 transition-colors">
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
                  <div className="flex-1 p-3 border-r border-white/10 cursor-pointer hover:bg-white/5 transition-colors">
                    <div className="text-[10px] uppercase font-bold text-slate-500">Check-in</div>
                    <div className="text-sm font-medium">Add date</div>
                  </div>
                  <div className="flex-1 p-3 cursor-pointer hover:bg-white/5 transition-colors">
                    <div className="text-[10px] uppercase font-bold text-slate-500">Checkout</div>
                    <div className="text-sm font-medium">Add date</div>
                  </div>
                </div>
                <div className="p-3 cursor-pointer hover:bg-white/5 transition-colors">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Guests</div>
                  <div className="text-sm font-medium">1 guest</div>
                </div>
              </div>

              <Link to="/contact">
                <Button className="w-full h-14 bg-gradient-to-r from-brand to-orange-500 hover:from-brand hover:to-orange-400 text-white font-bold text-lg rounded-xl shadow-[0_10px_30px_rgba(246,86,0,0.3)] transition-all">
                  Reserve
                </Button>
              </Link>
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
    </div>
  );
};

export default ListingDetails;
