import axios from 'axios';

// create a new booking
export async function createNewAppointment(appointmentData) {
  return axios.post('api/appointments/new-appointment', { appointmentData });
}

// fetch all appointments
export async function fetchPatientAppointments() {
  return axios.get(
    '/api/appointments/get-appointments',
    {},
    { withCredentials: true },
  );
}

// fetch appointments for admin

export async function fetchAppointmentsForAdmin() {
  return axios.get(
    '/api/appointments/get-admin-appointments',
    {},
    {
      withCredentials: true,
    },
  );
}
