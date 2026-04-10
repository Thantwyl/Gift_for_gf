import React, { useState, useEffect } from 'react';
import { getSectionData, updateSectionData } from '../../services/firestore';
import { Loader2 } from 'lucide-react';

const ManageContact = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  
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
      setGithub(data.socials?.github || '');
      setLinkedin(data.socials?.linkedin || '');
      setTwitter(data.socials?.twitter || '');
    }
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    await updateSectionData('contact', {
      email,
      phone,
      location,
      socials: { github, linkedin, twitter }
    });
    
    setSaving(false);
    alert('Contact section updated successfully!');
  };

  if (loading) return <div className="flex justify-center"><Loader2 className="animate-spin text-primary mt-20" size={32}/></div>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-white mb-8">Manage Contact Details</h1>
      
      <form onSubmit={handleSave} className="space-y-8 bg-slate-800 rounded-2xl p-6 border border-slate-700">
        
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white border-b border-slate-700 pb-2">Primary Information</h3>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
            <input type="text" value={phone} onChange={e=>setPhone(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
            <input type="text" value={location} onChange={e=>setLocation(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white" />
          </div>
        </div>

        <div className="space-y-6 pt-4">
          <h3 className="text-xl font-semibold text-white border-b border-slate-700 pb-2">Social Profiles</h3>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">GitHub URL</label>
            <input type="url" value={github} onChange={e=>setGithub(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">LinkedIn URL</label>
            <input type="url" value={linkedin} onChange={e=>setLinkedin(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Twitter URL</label>
            <input type="url" value={twitter} onChange={e=>setTwitter(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white" />
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

export default ManageContact;
