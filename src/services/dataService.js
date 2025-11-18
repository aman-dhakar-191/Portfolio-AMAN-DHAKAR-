import { ref, set, get, push, remove, onValue } from 'firebase/database';
import { database } from '../config/firebase';

// Profile data operations
export const saveProfile = async (userId, profileData) => {
  try {
    await set(ref(database, `profiles/${userId}`), profileData);
    return { success: true, error: null };
  } catch (error) {
    console.error('Error saving profile:', error);
    return { success: false, error: error.message };
  }
};

export const getProfile = async (userId) => {
  try {
    const snapshot = await get(ref(database, `profiles/${userId}`));
    if (snapshot.exists()) {
      return { data: snapshot.val(), error: null };
    }
    return { data: null, error: 'Profile not found' };
  } catch (error) {
    console.error('Error getting profile:', error);
    return { data: null, error: error.message };
  }
};

// Projects operations
export const addProject = async (userId, projectData) => {
  try {
    const projectsRef = ref(database, `projects/${userId}`);
    const newProjectRef = push(projectsRef);
    await set(newProjectRef, {
      ...projectData,
      id: newProjectRef.key,
      createdAt: Date.now()
    });
    return { success: true, id: newProjectRef.key, error: null };
  } catch (error) {
    console.error('Error adding project:', error);
    return { success: false, error: error.message };
  }
};

export const getProjects = async (userId) => {
  try {
    const snapshot = await get(ref(database, `projects/${userId}`));
    if (snapshot.exists()) {
      const projectsObj = snapshot.val();
      const projectsArray = Object.values(projectsObj);
      return { data: projectsArray, error: null };
    }
    return { data: [], error: null };
  } catch (error) {
    console.error('Error getting projects:', error);
    return { data: [], error: error.message };
  }
};

export const deleteProject = async (userId, projectId) => {
  try {
    await remove(ref(database, `projects/${userId}/${projectId}`));
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting project:', error);
    return { success: false, error: error.message };
  }
};

// Certificates operations
export const addCertificate = async (userId, certificateData) => {
  try {
    const certificatesRef = ref(database, `certificates/${userId}`);
    const newCertificateRef = push(certificatesRef);
    await set(newCertificateRef, {
      ...certificateData,
      id: newCertificateRef.key,
      createdAt: Date.now()
    });
    return { success: true, id: newCertificateRef.key, error: null };
  } catch (error) {
    console.error('Error adding certificate:', error);
    return { success: false, error: error.message };
  }
};

export const getCertificates = async (userId) => {
  try {
    const snapshot = await get(ref(database, `certificates/${userId}`));
    if (snapshot.exists()) {
      const certificatesObj = snapshot.val();
      const certificatesArray = Object.values(certificatesObj);
      return { data: certificatesArray, error: null };
    }
    return { data: [], error: null };
  } catch (error) {
    console.error('Error getting certificates:', error);
    return { data: [], error: error.message };
  }
};

export const deleteCertificate = async (userId, certificateId) => {
  try {
    await remove(ref(database, `certificates/${userId}/${certificateId}`));
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting certificate:', error);
    return { success: false, error: error.message };
  }
};

// Real-time listeners
export const subscribeToProfile = (userId, callback) => {
  const profileRef = ref(database, `profiles/${userId}`);
  return onValue(profileRef, (snapshot) => {
    callback(snapshot.val());
  });
};

export const subscribeToProjects = (userId, callback) => {
  const projectsRef = ref(database, `projects/${userId}`);
  return onValue(projectsRef, (snapshot) => {
    const data = snapshot.val();
    const projectsArray = data ? Object.values(data) : [];
    callback(projectsArray);
  });
};

export const subscribeToCertificates = (userId, callback) => {
  const certificatesRef = ref(database, `certificates/${userId}`);
  return onValue(certificatesRef, (snapshot) => {
    const data = snapshot.val();
    const certificatesArray = data ? Object.values(data) : [];
    callback(certificatesArray);
  });
};
