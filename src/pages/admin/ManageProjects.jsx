import React, { useState, useEffect } from 'react';
import { getCollectionData, addCollectionItem, updateCollectionItem, deleteCollectionItem } from '../../services/firestore';
import { uploadImageToCloudinary } from '../../services/cloudinary';
import { Loader2, Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const data = await getCollectionData('projects');
    setProjects(data);
    setLoading(false);
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setTitle(project.title);
    setDescription(project.description);
    setLiveLink(project.liveLink || '');
    setCurrentImageUrl(project.imageUrl);
    setImageFile(null);
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setLiveLink('');
    setCurrentImageUrl('');
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    let finalImageUrl = currentImageUrl;

    // Upload to Cloudinary if new image selected
    if (imageFile) {
      const uploadedUrl = await uploadImageToCloudinary(imageFile);
      if (uploadedUrl) {
        finalImageUrl = uploadedUrl;
      }
    }

    const payload = {
      title,
      description,
      liveLink,
      imageUrl: finalImageUrl,
      updatedAt: new Date().toISOString()
    };

    if (editingId) {
      await updateCollectionItem('projects', editingId, payload);
    } else {
      payload.createdAt = new Date().toISOString();
      await addCollectionItem('projects', payload);
    }
    
    setUploading(false);
    resetForm();
    fetchData();
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this project?')) {
      await deleteCollectionItem('projects', id);
      fetchData();
    }
  };

  if (loading) return <div className="flex justify-center"><Loader2 className="animate-spin text-primary mt-20" size={32}/></div>;

  return (
    <div className="max-w-4xl max-h-full">
      <h1 className="text-3xl font-bold text-white mb-8">Manage Projects</h1>
      
      {/* Form */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-10">
        <h2 className="text-xl font-semibold text-white mb-6">
          {editingId ? 'Edit Project' : 'Add New Project'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
              <input required value={title} onChange={e=>setTitle(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Image</label>
              <div className="flex items-center gap-4">
                <input type="file" onChange={e=>setImageFile(e.target.files[0])} accept="image/*" className="text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/20 file:text-primary hover:file:bg-primary/30"/>
                {currentImageUrl && !imageFile && <span className="text-xs text-primary flex items-center gap-1"><ImageIcon size={14}/> Image attached</span>}
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
            <textarea required value={description} onChange={e=>setDescription(e.target.value)} rows="3" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white"></textarea>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Resource Link (Drive or external) (optional)</label>
              <input value={liveLink} onChange={e=>setLiveLink(e.target.value)} type="url" placeholder="https://drive.google.com/... or https://example.com/..." className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white" />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
            {editingId && (
              <button type="button" onClick={resetForm} className="px-5 py-2 rounded-lg text-slate-300 hover:bg-slate-700">Cancel</button>
            )}
            <button type="submit" disabled={uploading} className="bg-primary text-slate-900 font-medium px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-400 disabled:opacity-50">
              {uploading ? <Loader2 className="animate-spin" size={18}/> : (editingId ? 'Update' : <><Plus size={18}/> Add</>)}
            </button>
          </div>
        </form>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 flex flex-col">
            {project.imageUrl && (
              <div className="h-40 w-full overflow-hidden">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-5 flex-1 flex flex-col bg-slate-800/80">
              <h3 className="font-bold text-lg text-white mb-2">{project.title}</h3>
              <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>
              
              <div className="flex justify-end gap-2 mt-auto pt-4 border-t border-slate-700">
                <button onClick={() => handleEdit(project)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => handleDelete(project.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
           <p className="text-slate-400 italic">No projects found. Add one above.</p>
        )}
      </div>
    </div>
  );
};

export default ManageProjects;
