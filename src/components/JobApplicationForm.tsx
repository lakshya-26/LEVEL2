// src/JobApplicationForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  position: string;
  experience: string;
  portfolioURL: string;
  managementExperience: string;
  additionalSkills: {
    JavaScript: boolean;
    CSS: boolean;
    Python: boolean;
    [key: string]: boolean;
  };
  interviewTime: string;
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  phoneNumber: '',
  position: '',
  experience: '',
  portfolioURL: '',
  managementExperience: '',
  additionalSkills: {
    JavaScript: false,
    CSS: false,
    Python: false,
  },
  interviewTime: '',
};

const JobApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        additionalSkills: { ...formData.additionalSkills, [name]: checked },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = (): boolean => {
    let newErrors: Partial<FormData> = {};

    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (isNaN(Number(formData.phoneNumber))) {
      newErrors.phoneNumber = 'Phone Number must be a valid number';
    }
    if ((formData.position === 'Developer' || formData.position === 'Designer') && (!formData.experience || isNaN(Number(formData.experience)) || Number(formData.experience) <= 0)) {
      newErrors.experience = 'Relevant Experience is required and must be a number greater than 0';
    }
    if (formData.position === 'Designer' && (!formData.portfolioURL || !/^https?:\/\/\S+$/.test(formData.portfolioURL))) {
      newErrors.portfolioURL = 'Portfolio URL is required and must be a valid URL';
    }
    if (formData.position === 'Manager' && !formData.managementExperience) {
      newErrors.managementExperience = 'Management Experience is required';
    }
    if (!Object.values(formData.additionalSkills).some(value => value)) {
      newErrors.additionalSkills = 'At least one additional skill must be selected';
    }
    if (!formData.interviewTime) {
      newErrors.interviewTime = 'Preferred Interview Time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedData(formData);
      setFormData(initialFormData);
      setErrors({});
    }
  };

  return (
    <div>
      <h1>Job Application Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
          {errors.fullName && <p className="error">{errors.fullName}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
        </div>
        <div>
          <label>Applying for Position:</label>
          <select name="position" value={formData.position} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        {(formData.position === 'Developer' || formData.position === 'Designer') && (
          <div>
            <label>Relevant Experience (years):</label>
            <input type="text" name="experience" value={formData.experience} onChange={handleChange} />
            {errors.experience && <p className="error">{errors.experience}</p>}
          </div>
        )}
        {formData.position === 'Designer' && (
          <div>
            <label>Portfolio URL:</label>
            <input type="text" name="portfolioURL" value={formData.portfolioURL} onChange={handleChange} />
            {errors.portfolioURL && <p className="error">{errors.portfolioURL}</p>}
          </div>
        )}
        {formData.position === 'Manager' && (
          <div>
            <label>Management Experience:</label>
            <textarea name="managementExperience" value={formData.managementExperience} onChange={handleChange}></textarea>
            {errors.managementExperience && <p className="error">{errors.managementExperience}</p>}
          </div>
        )}
        <div>
          <label>Additional Skills:</label>
          <div>
            <input type="checkbox" name="JavaScript" checked={formData.additionalSkills.JavaScript} onChange={handleChange} />
            JavaScript
          </div>
          <div>
            <input type="checkbox" name="CSS" checked={formData.additionalSkills.CSS} onChange={handleChange} />
            CSS
          </div>
          <div>
            <input type="checkbox" name="Python" checked={formData.additionalSkills.Python} onChange={handleChange} />
            Python
          </div>
          {errors.additionalSkills && <p className="error">{errors.additionalSkills}</p>}
        </div>
        <div>
          <label>Preferred Interview Time:</label>
          <input type="datetime-local" name="interviewTime" value={formData.interviewTime} onChange={handleChange} />
          {errors.interviewTime && <p className="error">{errors.interviewTime}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div>
          <h2>Form Submitted</h2>
          <p>Full Name: {submittedData.fullName}</p>
          <p>Email: {submittedData.email}</p>
          <p>Phone Number: {submittedData.phoneNumber}</p>
          <p>Position: {submittedData.position}</p>
          {(submittedData.position === 'Developer' || submittedData.position === 'Designer') && <p>Relevant Experience: {submittedData.experience}</p>}
          {submittedData.position === 'Designer' && <p>Portfolio URL: {submittedData.portfolioURL}</p>}
          {submittedData.position === 'Manager' && <p>Management Experience: {submittedData.managementExperience}</p>}
          <p>Additional Skills: {Object.keys(submittedData.additionalSkills).filter(skill => submittedData.additionalSkills[skill]).join(', ')}</p>
          <p>Preferred Interview Time: {submittedData.interviewTime}</p>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
