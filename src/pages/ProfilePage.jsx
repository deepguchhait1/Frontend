import { useState, useEffect, useRef } from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfile, uploadImage } from '../lib/api'
import PageLoader from '../components/PageLoader'
import toast from 'react-hot-toast'
import { Loader, MapPin, Save, Camera, Upload, Edit, Mail, Globe, MapPinIcon } from 'lucide-react'
import { LANGUAGES } from '../constants'

export default function ProfilePage() {
  const { authUser, isLoading } = useAuthUser()
  const queryClient = useQueryClient()
  const fileInputRef = useRef(null)

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    bio: '',
    profilePic: '',
    nativeLanguage: '',
    learningLanguage: '',
    location: ''
  })

  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (authUser) {
      console.log('AuthUser profilePic:', authUser.profilePic)
      setFormData({
        fullName: authUser.fullName || '',
        email: authUser.email || '',
        bio: authUser.bio || '',
        profilePic: authUser.profilePic || '',
        nativeLanguage: authUser.nativeLanguage || '',
        learningLanguage: authUser.learningLanguage || '',
        location: authUser.location || ''
      })
    }
  }, [authUser])

  const { mutate: updateProfileMutation, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(['authUser'])
      toast.success('Profile updated successfully!')
      setIsEditModalOpen(false)
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update profile')
    }
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfileMutation(formData)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    console.log('File selected:', file)
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB')
      return
    }

    // Show preview immediately using FileReader
    const reader = new FileReader()
    reader.onloadend = () => {
      console.log('FileReader result:', reader.result?.substring(0, 50))
      setFormData(prev => {
        const newData = { ...prev, profilePic: reader.result }
        console.log('Setting profilePic preview:', newData.profilePic?.substring(0, 50))
        return newData
      })
    }
    reader.readAsDataURL(file)

    setIsUploading(true)
    const formDataToUpload = new FormData()
    formDataToUpload.append('image', file)

    try {
      const response = await uploadImage(formDataToUpload)
      console.log('Upload response:', response)
      setFormData(prev => {
        const newData = { ...prev, profilePic: response.url }
        console.log('Setting profilePic from Cloudinary:', newData.profilePic)
        return newData
      })
      toast.success('Image uploaded successfully!')
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(error.response?.data?.message || 'Failed to upload image')
      // Revert to previous state on error
      setFormData(prev => ({ ...prev, profilePic: authUser?.profilePic || '' }))
    } finally {
      setIsUploading(false)
    }
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  if (isLoading) return <PageLoader />

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          {/* PROFILE DISPLAY VIEW */}
          <div className="space-y-6">
            {/* Header with Edit Button */}
            <div className="flex items-center justify-between">
              <h1 className="text-2xl sm:text-3xl font-bold">Profile</h1>
              <button 
                className="btn btn-primary btn-sm gap-2"
                onClick={() => setIsEditModalOpen(true)}
              >
                <Edit className="size-4" />
                Edit Profile
              </button>
            </div>

            {/* Profile Picture */}
            <div className="flex flex-col items-center space-y-4">
              <div className="avatar">
                <div className="size-32 rounded-full">
                  <img 
                    src={authUser?.profilePic || '/default-avatar.svg'} 
                    alt={authUser?.fullName}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* User Details */}
            <div className="space-y-4">
              {/* Full Name */}
              <div className="bg-base-300 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-base-content opacity-70 mb-1">Full Name</h3>
                <p className="text-lg">{authUser?.fullName}</p>
              </div>

              {/* Email */}
              <div className="bg-base-300 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-base-content opacity-70 mb-1 flex items-center gap-2">
                  <Mail className="size-4" />
                  Email
                </h3>
                <p className="text-lg">{authUser?.email}</p>
              </div>

              {/* Bio */}
              {authUser?.bio && (
                <div className="bg-base-300 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-base-content opacity-70 mb-1">Bio</h3>
                  <p className="text-base">{authUser.bio}</p>
                </div>
              )}

              {/* Languages */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {authUser?.nativeLanguage && (
                  <div className="bg-base-300 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-base-content opacity-70 mb-1 flex items-center gap-2">
                      <Globe className="size-4" />
                      Native Language
                    </h3>
                    <p className="text-base capitalize">{authUser.nativeLanguage}</p>
                  </div>
                )}

                {authUser?.learningLanguage && (
                  <div className="bg-base-300 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-base-content opacity-70 mb-1 flex items-center gap-2">
                      <Globe className="size-4" />
                      Learning Language
                    </h3>
                    <p className="text-base capitalize">{authUser.learningLanguage}</p>
                  </div>
                )}
              </div>

              {/* Location */}
              {authUser?.location && (
                <div className="bg-base-300 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-base-content opacity-70 mb-1 flex items-center gap-2">
                    <MapPinIcon className="size-4" />
                    Location
                  </h3>
                  <p className="text-base">{authUser.location}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      <dialog className={`modal ${isEditModalOpen ? 'modal-open' : ''}`}>
        <div className="modal-box max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Edit Profile</h2>
            <button 
              className="btn btn-sm btn-circle btn-ghost"
              onClick={() => setIsEditModalOpen(false)}
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* IMAGE PREVIEW */}
              <div 
                className="size-32 rounded-full bg-base-300 cursor-pointer hover:opacity-80 transition-opacity relative group"
                onClick={handleImageClick}
              >
                {formData.profilePic && formData.profilePic.trim() ? (
                  <img
                    src={formData.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full">
                    <Camera className="size-12 text-base-content opacity-40" />
                  </div>
                )}
                
                {/* Loading overlay */}
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-full">
                    <Loader className="size-8 text-white animate-spin" />
                  </div>
                )}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-transparent group-hover:bg-white/10 group-hover:backdrop-blur-sm transition-all rounded-full">
                  <Upload className="size-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* Upload Button */}
              <div className="text-center">
                <button 
                  type="button" 
                  onClick={handleImageClick} 
                  className="btn btn-accent btn-sm"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader className="size-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="size-4 mr-2" />
                      Upload Image
                    </>
                  )}
                </button>
                <p className="text-xs text-base-content opacity-60 mt-2">
                  Max size: 5MB
                </p>
              </div>
            </div>

            {/* FULL NAME */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Your full name"
                required
              />
            </div>

            {/* EMAIL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="your@email.com"
                required
              />
            </div>

            {/* BIO */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="textarea textarea-bordered h-24 w-full resize-none"
                placeholder="Tell others about yourself and your language learning goals"
              />
            </div>

            {/* LANGUAGES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* NATIVE LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formData.nativeLanguage}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* LEARNING LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  value={formData.learningLanguage}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select language you're learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* LOCATION */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPin className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70 z-10 pointer-events-none" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input input-bordered w-full pl-10 relative"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button className="btn btn-primary w-full" disabled={isPending} type="submit">
              {!isPending ? (
                <>
                  <Save className="size-5 mr-2" />
                  Update Profile
                </>
              ) : (
                <>
                  <Loader className="animate-spin size-5 mr-2" />
                  Updating...
                </>
              )}
            </button>
          </form>
        </div>
      </dialog>
    </div>
  )
}
