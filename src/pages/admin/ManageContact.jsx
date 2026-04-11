import React, { useState, useEffect } from 'react';
import { getSectionData, updateSectionData } from '../../services/firestore';
import { Loader2, Check } from 'lucide-react';

const ManageContact = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [whySentences, setWhySentences] = useState(['', '', '', '']);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const data = await getSectionData('contact');
    if (data) {
      setEmail(data.email || '');
      setPhone(data.phone || '');
      setLocation(data.location || '');
      setLinkedin(data.socials?.linkedin || '');
      
      // Support both old string format and new array format
      if (Array.isArray(data.whyWorkWithMe)) {
        // Pad to 4 entries
        const arr = [...data.whyWorkWithMe];
        while (arr.length < 4) arr.push('');
        setWhySentences(arr.slice(0, 4));
      } else if (typeof data.whyWorkWithMe === 'string' && data.whyWorkWithMe) {
        // Migrate old string format
        const parts = data.whyWorkWithMe.split(/[.?!]+/).map(s => s.trim()).filter(Boolean).slice(0, 4);
        while (parts.length < 4) parts.push('');
        setWhySentences(parts);
      }
    }
    setLoading(false);
  };

  const updateSentence = (index, value) => {
    setWhySentences(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    await updateSectionData('contact', {
      email,
      phone,
      location,
      socials: { linkedin },
      whyWorkWithMe: whySentences
    });
    
    setSaving(false);
    alert('Contact section updated successfully!');
  };

  if (loading) return <div className="flex justify-center"><Loader2 className="animate-spin text-primary mt-20" size={32}/></div>;

  const filledCount = whySentences.filter(s => s.trim()).length;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-white mb-8">Manage Contact Details</h1>
      
      <form onSubmit={handleSave} className="space-y-8 bg-slate-800 rounded-2xl p-6 border border-slate-700">
        
        {/* Primary Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white border-b border-slate-700 pb-2">Primary Information</h3>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
            <input type="text" value={phone} onChange={e=>setPhone(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
            <input type="text" value={location} onChange={e=>setLocation(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
          </div>
        </div>

        {/* Social Profile */}
        <div className="space-y-6 pt-4">
          <h3 className="text-xl font-semibold text-white border-b border-slate-700 pb-2">Social Profile</h3>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">LinkedIn URL</label>
            <input type="url" value={linkedin} onChange={e=>setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/yourprofile" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
          </div>
        </div>

        {/* Why Work With Me — 4 Sentences */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2">
            <h3 className="text-xl font-semibold text-white">Why Work With Me</h3>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${filledCount >= 4 ? 'bg-primary/20 text-primary' : 'bg-slate-700 text-slate-400'}`}>
              {filledCount}/4 filled
            </span>
          </div>
          <p className="text-sm text-slate-400 -mt-3">
            Enter exactly 4 reasons. Each will appear as a bullet point in the "Why work with me" section.
          </p>

          {whySentences.map((sentence, index) => (
            <div key={index} className="relative">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-400 text-xs flex items-center justify-center font-bold">
                  {index + 1}
                </span>
                Reason {index + 1}
                {sentence.trim() && (
                  <Check size={14} className="text-primary ml-auto" />
                )}
              </label>
              <input
                type="text"
                value={sentence}
                onChange={e => updateSentence(index, e.target.value)}
                placeholder={
                  index === 0 ? 'e.g. Proven track record of delivering projects on time' :
                  index === 1 ? 'e.g. Strong communication and collaboration skills' :
                  index === 2 ? 'e.g. Passionate about clean, maintainable code' :
                  'e.g. Always learning and staying up-to-date with latest tech'
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          ))}
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

export default ManageContact;
