export interface UserDetailsForm {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number | null;
    role: string;
}

export interface UserDetailsError {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

export const validateForm = (form: UserDetailsForm, setFormError: React.Dispatch<React.SetStateAction<UserDetailsError>>) => {
    if(form.firstName === '') {
        setFormError(formError => ({ ...formError, firstName: 'First name is required' }));
    } else {
        setFormError(formError => ({ ...formError, firstName: '' }));
    }

    if(form.lastName === '') {
        setFormError(formError => ({ ...formError, lastName: 'Last name is required' }));
    } else {
        setFormError(formError => ({ ...formError, lastName: '' }));
    }

    if (form.email === '') {
        setFormError((formError) => ({ ...formError, email: 'Email is required' }));
    } else {
        setFormError((formError) => ({ ...formError, email: '' }));
    }

    if (form.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g) === null) {
        setFormError((formError) => ({ ...formError, email: 'Email is invalid' }));
    } else {
        setFormError((formError) => ({ ...formError, email: '' }));
    }

    if (!form.phoneNumber) {
        setFormError((formError) => ({ ...formError, phoneNumber: 'Phone number is required' }));
    } else {
        setFormError((formError) => ({ ...formError, phoneNumber: '' }));
    }
    // Add your validation logic here
    return true;
}