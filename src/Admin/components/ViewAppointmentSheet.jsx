import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { FileText, User } from 'lucide-react';

export function ViewAppointmentSheet({ appointment, open, setSheetOpen }) {
  return (
    <Sheet open={open} onOpenChange={() => setSheetOpen(!open)}>
      <SheetContent className={'max-w-2xl rounded-l-[0.7em]'}>
        <div className='space-y-4 p-3 rounded-[0.7em] overflow-x-scroll'>
          <div className='space-y-2 overflow-x-scroll'>
            {/* Contact Information */}
            <h2 className='text-xl font-bold'>Appointment Information</h2>
            <div className='bg-gray-50 rounded-lg p-2'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                <User className='w-5 h-5 text-blue-600' />
                Contact Information
              </h3>
              <dl className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <dt className='text-sm text-gray-500'>Name</dt>
                  <dd className='font-medium text-gray-900'>
                    {appointment?.fullName}
                  </dd>
                </div>
                <div>
                  <dt className='text-sm text-gray-500'>Email</dt>
                  <dd className='font-medium text-gray-900'>
                    {appointment?.email}
                  </dd>
                </div>
                <div>
                  <dt className='text-sm text-gray-500'>Phone</dt>
                  <dd className='font-medium text-gray-900'>
                    {appointment?.phone}
                  </dd>
                </div>
                <div>
                  <dt className='text-sm text-gray-500'>Location</dt>
                  <dd className='font-medium text-gray-900'>
                    {appointment?.area}, Nairobi
                  </dd>
                </div>
              </dl>
            </div>

            {/* Service Details */}
            <div className='bg-gray-50 rounded-lg p-2'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                <FileText className='w-5 h-5 text-blue-600' />
                Service Details
              </h3>
              <dl className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <dt className='text-sm text-gray-500'>Service Type</dt>
                  <dd className='font-medium text-gray-900'>
                    {appointment?.serviceType}
                  </dd>
                </div>
                <div>
                  <dt className='text-sm text-gray-500'>Duration</dt>
                  <dd className='font-medium text-gray-900'>
                    {appointment?.serviceDuration || '-'}
                  </dd>
                </div>
                <div>
                  <dt className='text-sm text-gray-500'>
                    Preferred Start Date
                  </dt>
                  <dd className='font-medium text-gray-900'>
                    {appointment?.preferredDate
                      ? new Date(
                          appointment?.preferredDate,
                        ).toLocaleDateString()
                      : '-'}
                  </dd>
                </div>
                <div>
                  <dt className='text-sm text-gray-500'>Preferred Time</dt>
                  <dd className='font-medium text-gray-900'>
                    {appointment?.preferredTime || '-'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Patient Information */}
            <div className='bg-gray-50 rounded-lg p-2'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                <User className='w-5 h-5 text-blue-600' />
                Patient Information
              </h3>
              <dl className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <dt className='text-sm text-gray-500'>Patient Name</dt>
                  <dd className='font-medium text-gray-900'>
                    {appointment?.patientName}
                  </dd>
                </div>
                <div>
                  <dt className='text-sm text-gray-500'>Age & Gender</dt>
                  <dd className='font-medium text-gray-900'>
                    {appointment?.patientAge} years,{' '}
                    {appointment?.patientGender}
                  </dd>
                </div>
                <div>
                  <dt className='text-sm text-gray-500'>Relationship</dt>
                  <dd className='font-medium text-gray-900'>
                    {appointment?.relationship}
                  </dd>
                </div>
                {appointment?.mobility && (
                  <div>
                    <dt className='text-sm text-gray-500'>Mobility</dt>
                    <dd className='font-medium text-gray-900'>
                      {appointment?.mobility}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
