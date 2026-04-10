import React, { useState, useEffect } from 'react';
import { getSectionData, updateSectionData } from '../../services/firestore';
import { uploadImageToCloudinary } from '../../services/cloudinary';
import { Loader2, Image as ImageIcon } from 'lucide-react';

const ManageHero = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [currentCvUrl, setCurrentCvUrl] = useState('');
  const [cvFile, setCvFile] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const data = await getSectionData('hero');
    if (data) {
      setName(data.name || '');
      setTitle(data.title || '');
      setIntroduction(data.introduction || '');
      setCurrentImageUrl(data.profileImageUrl || '');
      setCurrentCvUrl(data.cvUrl || '');
    }
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    let finalImageUrl = currentImageUrl;
    if (imageFile) {
      const uploadedUrl = await uploadImageToCloudinary(imageFile);
      if (uploadedUrl) {
        finalImageUrl = uploadedUrl;
      }
    }

    let finalCvUrl = currentCvUrl;
    if (cvFile) {
      const uploadedCvUrl = await uploadImageToCloudinary(cvFile);
      if (uploadedCvUrl) {
        finalCvUrl = uploadedCvUrl;
      }
    }

    await updateSectionData('hero', {
      name,
      title,
      introduction,
      profileImageUrl: finalImageUrl,
      cvUrl: finalCvUrl
    });
    
    setSaving(false);
    alert('Hero section updated successfully!');
  };

  if (loading) return <div className="flex justify-center"><Loader2 className="animate-spin text-primary mt-20" size={32}/></div>;

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-white mb-8">Manage Hero Section</h1>
      
      <form onSubmit={handleSave} className="space-y-6 bg-slate-800 rounded-2xl p-6 border border-slate-700">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
            <input required value={name} onChange={e=>setName(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
            <input required value={title} onChange={e=>setTitle(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Introduction (Short Bio)</label>
          <textarea required rows="4" value={introduction} onChange={e=>setIntroduction(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary focus:outline-none"></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Profile Image</label>
          <div className="flex items-center gap-6 bg-slate-900 p-4 rounded-xl border border-slate-700">
            {currentImageUrl && !imageFile && (
              <img src={currentImageUrl} alt="Current profile" className="w-16 h-16 rounded-full object-cover border-2 border-primary" />
            )}
            <div className="flex-1">
              <input type="file" onChange={e=>setImageFile(e.target.files[0])} accept="image/*" className="text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/20 file:text-primary hover:file:bg-primary/30 w-full"/>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Resume / CV Document (PDF)</label>
          <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-700">
            {currentCvUrl && !cvFile && (
              <a href={currentCvUrl} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline font-medium px-4 py-2 bg-slate-800 rounded-lg">View Current CV</a>
            )}
            <div className="flex-1">
              <input type="file" onChange={e=>setCvFile(e.target.files[0])} accept=".pdf,.doc,.docx" className="text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-500/20 file:text-indigo-400 hover:file:bg-indigo-500/30 w-full"/>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" disabled={saving} className="bg-primary text-slate-900 font-medium px-8 py-3 rounded-xl hover:bg-teal-400 transition-colors flex items-center gap-2">
            {saving && <Loader2 className="animate-spin" size={18}/>}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageHero;
