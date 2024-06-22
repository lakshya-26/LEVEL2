import React, { useState, useEffect } from 'react';

// Custom Hook for form validation
const useValidation = (formData) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const validate = () => {
      let newErrors = {};

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
    };

    validate();
  }, [formData]);

  return errors;
};

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
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
  });

  const [submittedData, setSubmittedData] = useState(null);
  const errors = useValidation(formData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        additionalSkills: { ...formData.additionalSkills, [name]: checked },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      setSubmittedData(formData);
      setFormData({
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
      });
    }
  };

  return (
    <div>
      <h1>Job Application Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
          {errors.fullName && <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.fullName}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.email}</p>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          {errors.phoneNumber && <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.phoneNumber}</p>}
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
            {errors.experience && <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.experience}</p>}
          </div>
        )}
        {formData.position === 'Designer' && (
          <div>
            <label>Portfolio URL:</label>
            <input type="text" name="portfolioURL" value={formData.portfolioURL} onChange={handleChange} />
            {errors.portfolioURL && <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.portfolioURL}</p>}
          </div>
        )}
        {formData.position === 'Manager' && (
          <div>
            <label>Management Experience:</label>
            <textarea name="managementExperience" value={formData.managementExperience} onChange={handleChange}></textarea>
            {errors.managementExperience && <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.managementExperience}</p>}
          </div>
        )}
        <div>
          <label>Additional Skills:</label>
          <div>
            <input type="checkbox" name="JavaScript" checked={formData.additionalSkills.JavaScript} onChange={handleChange} /> JavaScript
          </div>
          <div>
            <input type="checkbox" name="CSS" checked={formData.additionalSkills.CSS} onChange={handleChange} /> CSS
          </div>
          <div>
            <input type="checkbox" name="Python" checked={formData.additionalSkills.Python} onChange={handleChange} /> Python
          </div>
          {errors.additionalSkills && <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.additionalSkills}</p>}
        </div>
        <div>
          <label>Preferred Interview Time:</label>
          <input type="datetime-local" name="interviewTime" value={formData.interviewTime} onChange={handleChange} />
          {errors.interviewTime && <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.interviewTime}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div>
          <h2>Form Submitted</h2>
          <p><strong>Full Name:</strong> {submittedData.fullName}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
          <p><strong>Position:</strong> {submittedData.position}</p>
          {(submittedData.position === 'Developer' || submittedData.position === 'Designer') && <p><strong>Relevant Experience:</strong> {submittedData.experience}</p>}
          {submittedData.position === 'Designer' && <p><strong>Portfolio URL:</strong> {submittedData.portfolioURL}</p>}
          {submittedData.position === 'Manager' && <p><strong>Management Experience:</strong> {submittedData.managementExperience}</p>}
          <p><strong>Additional Skills:</strong> {Object.keys(submittedData.additionalSkills).filter(skill => submittedData.additionalSkills[skill]).join(', ')}</p>
          <p><strong>Preferred Interview Time:</strong> {submittedData.interviewTime}</p>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
