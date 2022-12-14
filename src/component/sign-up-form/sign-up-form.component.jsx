import { useState } from "react";
import { 
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
 } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";

import './sign-up-form.styles.scss';

import Button from "../button/button.component";

// Placeholder of formFields
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    // Resets the formFields
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    // Set the value of formFields
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});
    }

    // Handles the data being submitted by the user
    const handleSubmit = async (event) => {
        event.preventDefault();

        // check if pw & confirm pw are the same
        if(password !== confirmPassword) {
            alert("Password do not match");
            return;
        }

        // Send the data to authentication & firestore database
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, { displayName });  
            resetFormFields();
        } catch(error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else if (error.code === 'auth/weak-password') {
                alert('Password should be at least 6 characters.');
            }   else {
                console.log('user creation encountered an error', error);
            }
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label='Display Name'
                    type='text' 
                    required 
                    onChange={handleChange}
                    name='displayName' 
                    value={displayName} 
                />

                <FormInput 
                    label='Email'
                    type='email' 
                    required 
                    onChange={handleChange} 
                    name='email' 
                    value={email}
                 />

                <FormInput 
                    label='Password'
                    type='password' 
                    required 
                    onChange={handleChange}
                    name='password'
                    value={password} 
                />

                <FormInput 
                    label='Confirm Password'
                    type='password' 
                    required 
                    onChange={handleChange} 
                    name='confirmPassword' 
                    value={confirmPassword} 
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;