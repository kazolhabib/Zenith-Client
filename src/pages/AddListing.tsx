import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Image as ImageIcon, MapPin, DollarSign, Calendar, Type, AlignLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import api from '@/config/api';

export const AddListing = ({ isEmbedded = false, onSuccess, editListingId }: { isEmbedded?: boolean, onSuccess?: () => void, editListingId?: string | number | null }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    price: '',
    location: '',
    date: '',
    imageUrl: '',
    image2Url: '',
    image3Url: '',
    image4Url: '',
    guests: '4',
    bedrooms: '2',
    beds: '2',
    baths: '1',
  });

  useEffect(() => {
    const fetchListingData = async () => {
      if (!editListingId) return;
      try {
        const { data } = await api.get(`/listings/${editListingId}`);
        setFormData({
          title: data.title || '',
          shortDescription: data.description || '',
          fullDescription: data.fullDescription || '',
          price: String(data.price || ''),
          location: data.location || '',
          date: data.date || '',
          imageUrl: data.image || '',
          image2Url: data.images?.[1] || '',
          image3Url: data.images?.[2] || '',
          image4Url: data.images?.[3] || '',
          guests: String(data.specs?.guests || '4'),
          bedrooms: String(data.specs?.bedrooms || '2'),
          beds: String(data.specs?.beds || '2'),
          baths: String(data.specs?.baths || '1'),
        });
      } catch (error) {
        console.error('Error fetching listing for edit:', error);
      }
    };
    fetchListingData();
  }, [editListingId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const payload = {
        title: formData.title,
        description: formData.shortDescription,
        fullDescription: formData.fullDescription,
        price: Number(formData.price),
        location: formData.location,
        date: formData.date,
        image: formData.imageUrl,
        images: [
          formData.imageUrl,
          formData.image2Url || formData.imageUrl,
          formData.image3Url || formData.imageUrl,
          formData.image4Url || formData.imageUrl
        ],
        specs: {
          guests: Number(formData.guests) || 4,
          bedrooms: Number(formData.bedrooms) || 2,
          beds: Number(formData.beds) || 2,
          baths: Number(formData.baths) || 1
        }
      };
      
      if (editListingId) {
        await api.put(`/listings/${editListingId}`, payload);
      } else {
        await api.post('/listings', payload);
      }
      setLoading(false);
      
      // Reset form
      setFormData({
        title: '',
        shortDescription: '',
        fullDescription: '',
        price: '',
        location: '',
        date: '',
        imageUrl: '',
        image2Url: '',
        image3Url: '',
        image4Url: '',
        guests: '4',
        bedrooms: '2',
        beds: '2',
        baths: '1',
      });

      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/explore');
      }
    } catch (error) {
      console.error('Error saving listing:', error);
      setLoading(false);
      alert('Failed to save listing');
    }
  };

  const handleCancel = () => {
    if (onSuccess) {
      onSuccess();
    } else {
      navigate('/explore');
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Listing Title <span className="text-red-400">*</span></label>
              <div className="relative">
                <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="text" 
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Luxury Beachfront Villa"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all"
                />
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Short Description <span className="text-red-400">*</span></label>
              <div className="relative">
                <AlignLeft className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="text" 
                  name="shortDescription"
                  required
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="A brief summary for the listing card..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all"
                />
              </div>
            </div>

            {/* Full Description */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Full Description <span className="text-red-400">*</span></label>
              <textarea 
                name="fullDescription"
                required
                value={formData.fullDescription}
                onChange={handleChange}
                placeholder="Detailed description about the property, features, and amenities..."
                rows={5}
                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all resize-none"
              ></textarea>
            </div>

            {/* 3 Column Grid for Price, Location, Date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Price (per night) <span className="text-red-400">*</span></label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="number" 
                    name="price"
                    required
                    min="1"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="250"
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Location <span className="text-red-400">*</span></label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="text" 
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Bali, Indonesia"
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Availability Date <span className="text-red-400">*</span></label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="date" 
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all [color-scheme:dark]"
                  />
                </div>
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Max Guests</label>
                <input 
                  type="number" 
                  name="guests"
                  min="1"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Bedrooms</label>
                <input 
                  type="number" 
                  name="bedrooms"
                  min="0"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Beds</label>
                <input 
                  type="number" 
                  name="beds"
                  min="1"
                  value={formData.beds}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Bathrooms</label>
                <input 
                  type="number" 
                  name="baths"
                  min="0.5"
                  step="0.5"
                  value={formData.baths}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all"
                />
              </div>
            </div>

            {/* Multiple Images Grid */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-300 mb-1">Property Images (URLs)</label>
              <p className="text-xs text-slate-500 mb-2">Provide up to 4 high-quality image URLs. Image 1 is the main cover image.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Image 1 (Main/Cover) <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="url" 
                      name="imageUrl"
                      required
                      value={formData.imageUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/cover.jpg"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Image 2 (Gallery)</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="url" 
                      name="image2Url"
                      value={formData.image2Url}
                      onChange={handleChange}
                      placeholder="https://example.com/gallery1.jpg"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Image 3 (Gallery)</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="url" 
                      name="image3Url"
                      value={formData.image3Url}
                      onChange={handleChange}
                      placeholder="https://example.com/gallery2.jpg"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Image 4 (Gallery)</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="url" 
                      name="image4Url"
                      value={formData.image4Url}
                      onChange={handleChange}
                      placeholder="https://example.com/gallery3.jpg"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 mt-8 flex justify-end gap-4">
              <Button 
                type="button" 
                onClick={handleCancel}
                variant="outline" 
                className="bg-transparent border-white/20 text-white hover:bg-white/10 rounded-xl h-12 px-6"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-brand hover:bg-orange-600 text-white border-0 rounded-xl h-12 px-8 flex items-center justify-center gap-2 font-bold shadow-[0_0_20px_rgba(246,86,0,0.3)] hover:shadow-[0_0_30px_rgba(246,86,0,0.5)] transition-all group"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    {editListingId ? 'Save Changes' : 'Add Listing'}
                  </>
                )}
              </Button>
            </div>
          </form>
  );

  if (isEmbedded) {
    return (
      <div className="text-left">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            {editListingId ? 'Edit Property' : 'Add New Property'}
          </h2>
          <p className="text-slate-400 text-sm">
            {editListingId ? 'Update your property details below.' : 'Create a new property listing to show on Zenith.'}
          </p>
        </div>
        {formContent}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 selection:bg-brand/30 pt-32 md:pt-40 pb-20">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[-10%] w-[30%] h-[40%] rounded-full bg-brand/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        
        {/* Header Area */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            {editListingId ? 'Edit' : 'Add New'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-400">Listing</span>
          </h1>
          <p className="text-slate-400">
            {editListingId ? 'Update your property details below.' : 'Create a new property listing to show on Zenith.'}
          </p>
        </div>

        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#121217]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl"
        >
          {formContent}
        </motion.div>
      </div>
    </div>
  );
};

export default AddListing;
