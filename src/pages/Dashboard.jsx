import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { logOut } from '../services/authService';
import {
  saveProfile,
  getProfile,
  addProject,
  getProjects,
  deleteProject,
  addCertificate,
  getCertificates,
  deleteCertificate
} from '../services/dataService';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    photoURL: user?.photoURL || '',
    title: '',
    bio: '',
    phone: '',
    location: ''
  });
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    link: ''
  });
  const [newCertificate, setNewCertificate] = useState({
    title: '',
    issuer: '',
    date: '',
    link: ''
  });

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    const profileRes = await getProfile(user.uid);
    if (profileRes.data) {
      setProfile(profileRes.data);
    }

    const projectsRes = await getProjects(user.uid);
    if (projectsRes.data) {
      setProjects(projectsRes.data);
    }

    const certificatesRes = await getCertificates(user.uid);
    if (certificatesRes.data) {
      setCertificates(certificatesRes.data);
    }
  };

  const handleSignOut = async () => {
    await logOut();
    navigate('/');
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const result = await saveProfile(user.uid, profile);
    if (result.success) {
      alert('Profile saved successfully!');
    } else {
      alert('Error saving profile: ' + result.error);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    const result = await addProject(user.uid, newProject);
    if (result.success) {
      alert('Project added successfully!');
      setNewProject({ title: '', description: '', technologies: '', link: '' });
      loadData();
    } else {
      alert('Error adding project: ' + result.error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const result = await deleteProject(user.uid, projectId);
      if (result.success) {
        alert('Project deleted successfully!');
        loadData();
      } else {
        alert('Error deleting project: ' + result.error);
      }
    }
  };

  const handleAddCertificate = async (e) => {
    e.preventDefault();
    const result = await addCertificate(user.uid, newCertificate);
    if (result.success) {
      alert('Certificate added successfully!');
      setNewCertificate({ title: '', issuer: '', date: '', link: '' });
      loadData();
    } else {
      alert('Error adding certificate: ' + result.error);
    }
  };

  const handleDeleteCertificate = async (certificateId) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      const result = await deleteCertificate(user.uid, certificateId);
      if (result.success) {
        alert('Certificate deleted successfully!');
        loadData();
      } else {
        alert('Error deleting certificate: ' + result.error);
      }
    }
  };

  return (
    <div className="dashboard">
      <Header user={user} onSignOut={handleSignOut} />
      
      <div className="dashboard-container">
        <div className="tabs">
          <button
            className={activeTab === 'profile' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={activeTab === 'projects' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button
            className={activeTab === 'certificates' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('certificates')}
          >
            Certificates
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'profile' && (
            <div className="profile-tab">
              <h2>Profile Information</h2>
              <form onSubmit={handleSaveProfile} className="form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    placeholder="e.g., Software Engineer"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="+1234567890"
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    placeholder="City, Country"
                  />
                </div>
                <div className="form-group">
                  <label>Photo URL</label>
                  <input
                    type="url"
                    value={profile.photoURL}
                    onChange={(e) => setProfile({ ...profile, photoURL: e.target.value })}
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows="4"
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <button type="submit" className="btn-primary">Save Profile</button>
              </form>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="projects-tab">
              <h2>Add New Project</h2>
              <form onSubmit={handleAddProject} className="form">
                <div className="form-group">
                  <label>Project Title</label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    rows="3"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Technologies (comma-separated)</label>
                  <input
                    type="text"
                    value={newProject.technologies}
                    onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
                <div className="form-group">
                  <label>Project Link</label>
                  <input
                    type="url"
                    value={newProject.link}
                    onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                    placeholder="https://github.com/..."
                  />
                </div>
                <button type="submit" className="btn-primary">Add Project</button>
              </form>

              <h2 className="section-title">Your Projects</h2>
              <div className="items-list">
                {projects.length === 0 ? (
                  <p className="no-items">No projects yet. Add your first project above!</p>
                ) : (
                  projects.map((project) => (
                    <div key={project.id} className="item-card">
                      <div className="item-content">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        {project.technologies && (
                          <div className="technologies">
                            {project.technologies.split(',').map((tech, idx) => (
                              <span key={idx} className="tech-tag">{tech.trim()}</span>
                            ))}
                          </div>
                        )}
                        {project.link && (
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            View Project
                          </a>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="certificates-tab">
              <h2>Add New Certificate</h2>
              <form onSubmit={handleAddCertificate} className="form">
                <div className="form-group">
                  <label>Certificate Title</label>
                  <input
                    type="text"
                    value={newCertificate.title}
                    onChange={(e) => setNewCertificate({ ...newCertificate, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Issuer</label>
                  <input
                    type="text"
                    value={newCertificate.issuer}
                    onChange={(e) => setNewCertificate({ ...newCertificate, issuer: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Issue Date</label>
                  <input
                    type="date"
                    value={newCertificate.date}
                    onChange={(e) => setNewCertificate({ ...newCertificate, date: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Certificate Link</label>
                  <input
                    type="url"
                    value={newCertificate.link}
                    onChange={(e) => setNewCertificate({ ...newCertificate, link: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <button type="submit" className="btn-primary">Add Certificate</button>
              </form>

              <h2 className="section-title">Your Certificates</h2>
              <div className="items-list">
                {certificates.length === 0 ? (
                  <p className="no-items">No certificates yet. Add your first certificate above!</p>
                ) : (
                  certificates.map((cert) => (
                    <div key={cert.id} className="item-card">
                      <div className="item-content">
                        <h3>{cert.title}</h3>
                        <p className="issuer">{cert.issuer}</p>
                        {cert.date && <p className="date">Issued: {cert.date}</p>}
                        {cert.link && (
                          <a href={cert.link} target="_blank" rel="noopener noreferrer">
                            View Certificate
                          </a>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteCertificate(cert.id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="view-public">
          <button onClick={() => navigate('/')} className="btn-secondary">
            View Public Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
