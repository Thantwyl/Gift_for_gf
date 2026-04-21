import React, { useState, useEffect } from 'react';
import { getCollectionData, addCollectionItem, updateCollectionItem, deleteCollectionItem } from '../../services/firestore';
import { Loader2, Plus, Edit2, Trash2 } from 'lucide-react';

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [level, setLevel] = useState(50);
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
    setLevel(skill.level);
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setLevel(50);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const payload = { name, level: Number(level) };

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
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-10">
        <h2 className="text-xl font-semibold text-white mb-6">
          {editingId ? 'Edit Skill' : 'Add New Skill'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Skill Name</label>
              <input required value={name} onChange={e=>setName(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white" placeholder="e.g. AutoCAD" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Proficiency ({level}%)</label>
              <input type="range" min="0" max="100" value={level} onChange={e=>setLevel(e.target.value)} className="w-full mt-2 accent-primary" />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-2">
            {editingId && (
              <button type="button" onClick={resetForm} className="px-5 py-2 rounded-lg text-slate-300 hover:bg-slate-700">Cancel</button>
            )}
            <button type="submit" disabled={saving} className="bg-primary text-slate-900 font-medium px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-400 disabled:opacity-50">
              {saving ? <Loader2 className="animate-spin" size={18}/> : (editingId ? 'Update' : <><Plus size={18}/> Add</>)}
            </button>
          </div>
        </form>
      </div>

      {/* List */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/50 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Skill</th>
              <th className="px-6 py-4">Level</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.id} className="border-t border-slate-700/50 hover:bg-slate-700/30">
                <td className="px-6 py-4 font-medium text-white">{skill.name}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-slate-900 rounded-full h-1.5 max-w-[100px]">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
                    </div>
                    <span>{skill.level}%</span>
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
            {skills.length === 0 && (
              <tr>
                <td colSpan="3" className="px-6 py-8 text-center text-slate-500 italic">No skills found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSkills;
