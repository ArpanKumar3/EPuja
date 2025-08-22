import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabaseClient';
import { Dialog, Transition } from '@headlessui/react';
import { X, Loader, Upload } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const upsertPuja = async ({ puja, file }) => {
  let imageUrl = puja.image_url || '';

  if (file) {
    const fileName = `public/${uuidv4()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from('puja_assets').upload(fileName, file);
    if (uploadError) throw new Error(uploadError.message);
    
    const { data: { publicUrl } } = supabase.storage.from('puja_assets').getPublicUrl(fileName);
    imageUrl = publicUrl;
  }
  
  const pujaData = { ...puja, image_url: imageUrl };

  const { data, error } = await supabase.from('pujas').upsert(pujaData).select().single();
  if (error) throw new Error(error.message);
  return data;
};

const PujaForm = ({ isOpen, setIsOpen, puja }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (puja) {
      reset(puja);
      setPreview(puja.image_url || '');
    } else {
      reset({
        name: '', category: '', description: '', price: '', temple_name: '', puja_date: '', time: '', duration: '', image_url: ''
      });
      setPreview('');
    }
    setFile(null);
  }, [puja, isOpen, reset]);

  const mutation = useMutation({
    mutationFn: upsertPuja,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminPujas'] });
      setIsOpen(false);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({ puja: data, file });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
        <Transition.Child as={React.Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={React.Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center">
                  {puja ? 'Edit Puja' : 'Add New Puja'}
                  <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-gray-100"><X size={20}/></button>
                </Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                  {/* Form fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Puja Name</label>
                      <input {...register('name', { required: true })} className="mt-1 w-full border-gray-300 rounded-md"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <input {...register('category', { required: true })} className="mt-1 w-full border-gray-300 rounded-md"/>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea {...register('description')} rows="3" className="mt-1 w-full border-gray-300 rounded-md"></textarea>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price</label>
                      <input type="number" {...register('price', { required: true, valueAsNumber: true })} className="mt-1 w-full border-gray-300 rounded-md"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Temple Name</label>
                      <input {...register('temple_name', { required: true })} className="mt-1 w-full border-gray-300 rounded-md"/>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Puja Date</label>
                      <input type="date" {...register('puja_date', { required: true })} className="mt-1 w-full border-gray-300 rounded-md"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Time</label>
                      <input {...register('time', { required: true })} className="mt-1 w-full border-gray-300 rounded-md"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Duration</label>
                      <input {...register('duration', { required: true })} className="mt-1 w-full border-gray-300 rounded-md"/>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Puja Image</label>
                    <div className="mt-2 flex items-center space-x-4">
                      {preview && <img src={preview} alt="Puja preview" className="h-20 w-20 rounded-md object-cover"/>}
                      <label htmlFor="file-upload" className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                        <Upload size={16}/>
                        <span>Upload a file</span>
                      </label>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*"/>
                    </div>
                  </div>
                  {mutation.isError && <p className="text-red-500 text-sm">Error: {mutation.error.message}</p>}
                  <div className="mt-6 flex justify-end space-x-2">
                    <button type="button" onClick={() => setIsOpen(false)} className="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button type="submit" disabled={mutation.isPending} className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-blue hover:bg-blue-700 disabled:bg-blue-300 flex items-center space-x-2">
                      {mutation.isPending && <Loader className="animate-spin" size={16}/>}
                      <span>{mutation.isPending ? 'Saving...' : 'Save Puja'}</span>
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PujaForm;
