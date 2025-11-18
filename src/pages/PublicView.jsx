import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfile, getProjects, getCertificates } from '../services/dataService';
import './PublicView.css';

const PublicView = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // For demo, use a default userId if none provided
      const targetUserId = userId || 'demo';
      
      const [profileRes, projectsRes, certificatesRes] = await Promise.all([
        getProfile(targetUserId),
        getProjects(targetUserId),
        getCertificates(targetUserId)
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (projectsRes.data) setProjects(projectsRes.data);
      if (certificatesRes.data) setCertificates(certificatesRes.data);
      
      setLoading(false);
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <div className="loading">Loading portfolio...</div>;
  }

  return (
    <div className="public-view">
      <div className="public-container">
        <div className="header-section">
          <button onClick={() => navigate('/login')} className="login-btn">
            Owner Login
          </button>
        </div>

        {profile ? (
          <>
            <section className="profile-section">
              <div className="profile-header">
                {profile.photoURL && (
                  <img src={profile.photoURL} alt={profile.name} className="profile-photo" />
                )}
                <div className="profile-info">
                  <h1>{profile.name || 'Portfolio Owner'}</h1>
                  {profile.title && <h2>{profile.title}</h2>}
                  {profile.bio && <p className="bio">{profile.bio}</p>}
                  {profile.email && <p className="contact">📧 {profile.email}</p>}
                  {profile.phone && <p className="contact">📱 {profile.phone}</p>}
                  {profile.location && <p className="contact">📍 {profile.location}</p>}
                </div>
              </div>
            </section>

            {projects.length > 0 && (
              <section className="projects-section">
                <h2>Projects</h2>
                <div className="projects-grid">
                  {projects.map((project) => (
                    <div key={project.id} className="project-card">
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
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                          View Project →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {certificates.length > 0 && (
              <section className="certificates-section">
                <h2>Certificates</h2>
                <div className="certificates-grid">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="certificate-card">
                      <h3>{cert.title}</h3>
                      <p className="issuer">{cert.issuer}</p>
                      {cert.date && <p className="date">Issued: {cert.date}</p>}
                      {cert.link && (
                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-link">
                          View Certificate →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="no-data">
            <h2>No Portfolio Data Available</h2>
            <p>This portfolio hasn't been set up yet.</p>
            <button onClick={() => navigate('/login')} className="setup-btn">
              Set Up Portfolio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicView;
