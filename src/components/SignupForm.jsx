import { useState } from "react";

const SignupForm = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    // handle Input Change
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    // validate input Field
    const validate = () => {
        const errors = {};

        if(!formData.name.trim()) {
            errors.name= "Name is required";
        }
        if(!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }
        if(!formData.password.trim()) {
            errors.password = "Password is required";
        } else if (formData.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        } else if (!/[A-Z]/.test(formData.password)) {
            errors.password = "Password must contain at least one uppercase letter.";
        }else if (!/[!@#$%^&*]/.test(formData.password)) {
            errors.password = "password must containn at least one special character.";
        }

        return errors;        
    }

    // Form submition
    const handleSubmit = (e) => {
        e.preventDefault();

        const validateErrors = validate();

        if(Object.keys(validateErrors).length > 0) {
            setErrors(validateErrors);
        }else {
            setErrors({});
            setSubmitted(true);
            console.log("Form Data submitted", formData);
            setFormData({name:"", email: "", password:""});
        }

    }

  return (
    <>
     <div className="signup-form-container">
        <h1>Signup Form</h1>    
        {submitted && <p className="success-message">SignUp Successful!</p>}
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text"
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                autoComplete='off'
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email"
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                autoComplete='off'
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password"
                id='password'
                value={formData.password}
                name='password'
                onChange={handleChange}
                autoComplete='off'
                />
                {errors.password && <p className="error-message">{errors.password}</p>}
            </div>
            <button className='submit-button' type='submit'>Submit</button>
        </form>
    </div> 
    </>
  )
}

export default SignupForm;
