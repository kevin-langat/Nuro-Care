import axios from 'axios';

// set admin profile image
export async function setAdminProfileImage(formData) {
  return await axios.post('/api/admin/profile-image-upload', formData, {
    withCredentials: true,
  });
}

// create a new service
export async function createANewService(formData) {
  return await axios.post('/api/admin/services/create-new-service', formData, {
    withCredentials: true,
  });
}

// uploads gallery to service
export async function uploadServiceImages(formData) {
  return await axios.post('/api/admin/services/add-service-images', formData, {
    withCredentials: true,
  });
}

// uploads gallery to service
export async function fetchAllServices() {
  return await axios.get(
    '/api/admin/services/fetch-all-services',
    {},
    {
      withCredentials: true,
    },
  );
}

// Update the hero info
export async function updateHeroInfo(formData) {
  return await axios.post(
    '/api/admin/site-settings/update-site-settings',
    formData,
    {
      withCredentials: true,
    },
  );
}

export async function addHeroImage(formData) {
  return await axios.post(
    '/api/admin/site-settings/update-site-hero-image',
    formData,
    {
      withCredentials: true,
    },
  );
}
export async function addTrustVideo(formData) {
  return await axios.post(
    '/api/admin/site-settings/update-site-trust-video',
    formData,
    {
      withCredentials: true,
    },
  );
}
