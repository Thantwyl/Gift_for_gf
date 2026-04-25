import React, { useState, useEffect } from 'react';
import { getCollectionData, addCollectionItem, updateCollectionItem, deleteCollectionItem } from '../../services/firestore';
import { Loader2, Plus, Edit2, Trash2 } from 'lucide-react';

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [type, setType] = useState('hard');
  // Separate inputs for quick-add cards to avoid overlap with edit form
  const [hardName, setHardName] = useState('');
  const [softName, setSoftName] = useState('');
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
    setType(skill.type || 'hard');
    setProficiencyText(skill.proficiency || '');
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setType('hard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const payload = { name, type };

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
                <div className="flex justify-end">
                  <button onClick={async (e) => { e.preventDefault(); setSaving(true); await addCollectionItem('skills', { name: hardName, type: 'hard' }); setSaving(false); setHardName(''); fetchData(); }} disabled={saving || !hardName.trim()} className="bg-primary text-slate-900 font-medium px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-400">{saving ? 'Adding...' : <><Plus size={18}/> Add Hard</>}</button>
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
              <div className="flex justify-end">
                <button onClick={async (e) => { e.preventDefault(); setSaving(true); await addCollectionItem('skills', { name: softName, type: 'soft' }); setSaving(false); setSoftName(''); fetchData(); }} disabled={saving || !softName.trim()} className="bg-primary text-slate-900 font-medium px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-400">{saving ? 'Adding...' : <><Plus size={18}/> Add Soft</>}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modern Unified Skills Layout */}
      <div className="space-y-8">
        {/* Hard Skills Section */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Technical Skills</h3>
            <span className="text-sm text-slate-400 bg-slate-700 px-3 py-1 rounded-full">
              {skills.filter(s => !s.type || s.type === 'hard').length} skills
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.filter(s => !s.type || s.type === 'hard').map((skill) => (
              <div key={skill.id} className="group bg-slate-900/40 border border-slate-700/50 rounded-xl p-4 hover:border-primary/50 transition-all duration-200 hover:shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium text-lg">{skill.name}</h4>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(skill)} className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(skill.id)} className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {skills.filter(s => !s.type || s.type === 'hard').length === 0 && (
              <div className="col-span-full text-center py-8 text-slate-500 italic">
                No technical skills found. Add one above.
              </div>
            )}
          </div>
        </div>

        {/* Soft Skills Section */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Soft Skills</h3>
            <span className="text-sm text-slate-400 bg-slate-700 px-3 py-1 rounded-full">
              {skills.filter(s => s.type === 'soft').length} skills
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.filter(s => s.type === 'soft').map((skill) => (
              <div key={skill.id} className="group bg-slate-900/40 border border-slate-700/50 rounded-xl p-4 hover:border-primary/50 transition-all duration-200 hover:shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium text-lg">{skill.name}</h4>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(skill)} className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(skill.id)} className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {skills.filter(s => s.type === 'soft').length === 0 && (
              <div className="col-span-full text-center py-8 text-slate-500 italic">
                No soft skills found. Add one above.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSkills;
