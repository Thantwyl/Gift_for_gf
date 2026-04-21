import React, { useState, useEffect } from 'react';
import { getSectionData, updateSectionData } from '../../services/firestore';
import { Loader2, Plus, Trash2 } from 'lucide-react';

const ManageAbout = () => {
  const [personalInfo, setPersonalInfo] = useState('');
  const [education, setEducation] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [experiences, setExperiences] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const data = await getSectionData('about');
    if (data) {
      setPersonalInfo(data.personalInfo || '');
      setEducation(data.education || []);
      setLanguages(data.languages || []);
      setExperiences(data.experiences || []);
    }
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await updateSectionData('about', { personalInfo, education, languages, experiences });
    setSaving(false);
    alert('About section updated successfully!');
  };

  const addEducation = () => {
    setEducation([...education, { degree: '', institution: '', year: '' }]);
  };

  const updateEducation = (index, field, value) => {
    const newEd = [...education];
    newEd[index][field] = value;
    setEducation(newEd);
  };

  const removeEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  // Languages logic
  const addLanguage = () => {
    setLanguages([...languages, { language: '', proficiency: '' }]);
  };
  const updateLanguage = (index, field, value) => {
    const newLang = [...languages];
    newLang[index][field] = value;
    setLanguages(newLang);
  };
  const removeLanguage = (index) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  // Experiences logic
  const addExperience = () => {
    setExperiences([...experiences, { role: '', company: '', timeline: '', description: '' }]);
  };
  const updateExperience = (index, field, value) => {
    const newExp = [...experiences];
    newExp[index][field] = value;
    setExperiences(newExp);
  };
  const removeExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  if (loading) return <div className="flex justify-center"><Loader2 className="animate-spin text-primary mt-20" size={32}/></div>;

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-white mb-8">Manage About Section</h1>
      
      <form onSubmit={handleSave} className="space-y-8 bg-slate-800 rounded-2xl p-6 border border-slate-700">
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Personal Information Summary</label>
          <textarea 
            rows="5"
            value={personalInfo} 
            onChange={e=>setPersonalInfo(e.target.value)} 
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary focus:outline-none" 
            placeholder="Tell us about yourself..."
          ></textarea>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Education History</h3>
            <button type="button" onClick={addEducation} className="text-sm bg-primary/20 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/30 flex items-center gap-1">
              <Plus size={16}/> Add item
            </button>
          </div>

          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div key={idx} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 flex flex-col p-4 hover:shadow-lg transition-shadow">
                <div className="flex-1 grid grid-cols-1 gap-4">
                  <input 
                    placeholder="Degree (e.g. B.S. in CS)" 
                    value={edu.degree} 
                    onChange={e => updateEducation(idx, 'degree', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white"
                  />
                  <input 
                    placeholder="Institution" 
                    value={edu.institution} 
                    onChange={e => updateEducation(idx, 'institution', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white"
                  />
                  <input 
                    placeholder="Year (e.g. 2018-2022)" 
                    value={edu.year} 
                    onChange={e => updateEducation(idx, 'year', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white"
                  />
                </div>
                <div className="pt-4 flex justify-end border-t border-slate-700 mt-4">
                  <button type="button" onClick={() => removeEducation(idx)} className="text-red-400 hover:bg-red-400/10 p-2 rounded-lg">
                    <Trash2 size={18}/>
                  </button>
                </div>
              </div>
            ))}
            {education.length === 0 && <p className="text-slate-500 text-sm">No education history added.</p>}
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Languages Expertise</h3>
            <button type="button" onClick={addLanguage} className="text-sm bg-primary/20 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/30 flex items-center gap-1">
              <Plus size={16}/> Add item
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {languages.map((lang, idx) => (
              <div key={idx} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 p-4 hover:shadow-lg transition-shadow flex items-center">
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <input 
                    placeholder="Language (e.g. English)" 
                    value={lang.language} 
                    onChange={e => updateLanguage(idx, 'language', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white"
                  />
                  <input 
                    placeholder="Proficiency (e.g. Native)" 
                    value={lang.proficiency} 
                    onChange={e => updateLanguage(idx, 'proficiency', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white"
                  />
                </div>
                <div className="flex-shrink-0">
                  <button type="button" onClick={() => removeLanguage(idx)} className="text-red-400 hover:bg-red-400/10 p-2 rounded-lg">
                    <Trash2 size={18}/>
                  </button>
                </div>
              </div>
            ))}
            {languages.length === 0 && <p className="text-slate-500 text-sm">No languages added.</p>}
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Work Experience</h3>
            <button type="button" onClick={addExperience} className="text-sm bg-primary/20 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/30 flex items-center gap-1">
              <Plus size={16}/> Add item
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {experiences.map((exp, idx) => (
              <div key={idx} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 flex flex-col p-4 hover:shadow-lg transition-shadow">
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <input 
                    placeholder="Role (e.g. Drafter, Site Supervisor)" 
                    value={exp.role} 
                    onChange={e => updateExperience(idx, 'role', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white"
                  />
                  <input 
                    placeholder="Company & Location (e.g. Google · Remote)" 
                    value={exp.company} 
                    onChange={e => updateExperience(idx, 'company', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white"
                  />
                  <input 
                    placeholder="Timeline (e.g. Sep 2023 - Present)" 
                    value={exp.timeline || ''} 
                    onChange={e => updateExperience(idx, 'timeline', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white lg:col-span-2"
                  />
                  <textarea 
                    placeholder="Description (use hyphens for list items)" 
                    value={exp.description} 
                    rows="3"
                    onChange={e => updateExperience(idx, 'description', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white lg:col-span-2"
                  />
                </div>
                <div className="pt-4 flex justify-end border-t border-slate-700 mt-4">
                  <button type="button" onClick={() => removeExperience(idx)} className="text-red-400 hover:bg-red-400/10 p-2 rounded-lg">
                    <Trash2 size={18}/>
                  </button>
                </div>
              </div>
            ))}
            {experiences.length === 0 && <p className="text-slate-500 text-sm">No work experience added.</p>}
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

export default ManageAbout;
