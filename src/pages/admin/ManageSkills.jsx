import React, { useState, useEffect } from 'react';
import { getCollectionData, addCollectionItem, updateCollectionItem, deleteCollectionItem } from '../../services/firestore';
import { Loader2, Plus, Edit2, Trash2 } from 'lucide-react';

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [level, setLevel] = useState(50);
  const [type, setType] = useState('hard');
  const [proficiencyText, setProficiencyText] = useState('');
  // Separate inputs for quick-add cards to avoid overlap with edit form
  const [hardName, setHardName] = useState('');
  const [hardLevel, setHardLevel] = useState(50);
  const [softName, setSoftName] = useState('');
  const [softProficiency, setSoftProficiency] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const data = await getCollectionData('skills');
    // Sort skills alphabetically for UI consistency
    data.sort((a, b) => a.name.localeCompare(b.name));
    setSkills(data);
    setLoading(false);
  };

  const handleEdit = (skill) => {
    setEditingId(skill.id);
    setName(skill.name);
    setLevel(skill.level ?? 50);
    setType(skill.type || 'hard');
    setProficiencyText(skill.proficiency || '');
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setLevel(50);
    setType('hard');
    setProficiencyText('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const payload = { name, type };
    if (type === 'hard') payload.level = Number(level);
    else payload.proficiency = proficiencyText;

    if (editingId) {
      await updateCollectionItem('skills', editingId, payload);
    } else {
      await addCollectionItem('skills', payload);
    }
    
    setSaving(false);
    resetForm();
    fetchData();
  };

  const handleDelete = async (id) => {
    if(window.confirm('Delete this skill?')) {
      await deleteCollectionItem('skills', id);
      fetchData();
    }
  };

  if (loading) return <div className="flex justify-center"><Loader2 className="animate-spin text-primary mt-20" size={32}/></div>;

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-white mb-8">Manage Skills</h1>
      
      {/* Form */}
      {editingId ? (
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Edit Skill</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Skill Name</label>
                <input required value={name} onChange={e=>setName(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white" placeholder="e.g. AutoCAD" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Type</label>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setType('hard')} className={`px-3 py-2 rounded-xl ${type==='hard' ? 'bg-primary text-slate-900' : 'bg-slate-900 text-white'}`}>Hard</button>
                  <button type="button" onClick={() => setType('soft')} className={`px-3 py-2 rounded-xl ${type==='soft' ? 'bg-primary text-slate-900' : 'bg-slate-900 text-white'}`}>Soft</button>
                </div>
              </div>
            </div>

            {type === 'hard' ? (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Proficiency ({level}%)</label>
                <input type="range" min="0" max="100" value={level} onChange={e=>setLevel(e.target.value)} className="w-full mt-2 accent-primary" />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Proficiency label (optional)</label>
                <input value={proficiencyText} onChange={e=>setProficiencyText(e.target.value)} placeholder="e.g. Fluent, Excellent, Conversational" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white" />
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={resetForm} className="px-5 py-2 rounded-lg text-slate-300 hover:bg-slate-700">Cancel</button>
              <button type="submit" disabled={saving} className="bg-primary text-slate-900 font-medium px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-400 disabled:opacity-50">
                {saving ? <Loader2 className="animate-spin" size={18}/> : 'Update'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 mb-10">
          {/* Add Hard Skill Card */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Add New Hard Skill</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Skill Name</label>
                  <input value={hardName} onChange={e=>setHardName(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white" placeholder="e.g. React" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Proficiency ({hardLevel}%)</label>
                  <input type="range" min="0" max="100" value={hardLevel} onChange={e=>setHardLevel(e.target.value)} className="w-full mt-2 accent-primary" />
                </div>
                <div className="flex justify-end">
                  <button onClick={async (e) => { e.preventDefault(); setSaving(true); await addCollectionItem('skills', { name: hardName, type: 'hard', level: Number(hardLevel) }); setSaving(false); setHardName(''); setHardLevel(50); fetchData(); }} disabled={saving || !hardName.trim()} className="bg-primary text-slate-900 font-medium px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-400">{saving ? 'Adding...' : <><Plus size={18}/> Add Hard</>}</button>
                </div>
              </div>
          </div>

          {/* Add Soft Skill Card */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Add New Soft Skill</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Skill Name</label>
                <input value={softName} onChange={e=>setSoftName(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white" placeholder="e.g. Communication" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Proficiency label (optional)</label>
                <input value={softProficiency} onChange={e=>setSoftProficiency(e.target.value)} placeholder="e.g. Fluent, Excellent, Conversational" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white" />
              </div>
              <div className="flex justify-end">
                <button onClick={async (e) => { e.preventDefault(); setSaving(true); await addCollectionItem('skills', { name: softName, type: 'soft', proficiency: softProficiency }); setSaving(false); setSoftName(''); setSoftProficiency(''); fetchData(); }} disabled={saving || !softName.trim()} className="bg-primary text-slate-900 font-medium px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-400">{saving ? 'Adding...' : <><Plus size={18}/> Add Soft</>}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* List - split layout: Hard skills (table) + Soft skills (cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hard Skills */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Hard Skills</h3>
            <span className="text-sm text-slate-400">{skills.filter(s => !s.type || s.type === 'hard').length}</span>
          </div>
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/50 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Skill</th>
                <th className="px-6 py-4">Level</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.filter(s => !s.type || s.type === 'hard').map((skill) => (
                <tr key={skill.id} className="border-t border-slate-700/50 hover:bg-slate-700/30">
                  <td className="px-6 py-4 font-medium text-white">{skill.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-slate-900 rounded-full h-1.5 max-w-[100px]">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: `${skill.level ?? 0}%` }}></div>
                      </div>
                      <span>{skill.level ?? 0}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button onClick={() => handleEdit(skill)} className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded-lg">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(skill.id)} className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {skills.filter(s => !s.type || s.type === 'hard').length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-8 text-center text-slate-500 italic">No hard skills found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Soft Skills */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Soft Skills</h3>
            <span className="text-sm text-slate-400">{skills.filter(s => s.type === 'soft').length}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {skills.filter(s => s.type === 'soft').map((skill) => (
              <div key={skill.id} className="relative group bg-slate-900/40 rounded-lg px-5 py-3 flex items-center gap-4 min-w-[180px]">
                <div>
                  <div className="text-white font-medium">{skill.name}</div>
                  {skill.proficiency && <div className="text-sm text-slate-400">{skill.proficiency}</div>}
                </div>
                <div className="ml-auto flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(skill)} className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded-lg">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(skill.id)} className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {skills.filter(s => s.type === 'soft').length === 0 && (
              <div className="text-slate-500 italic">No soft skills found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSkills;
