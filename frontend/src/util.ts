export interface UserDetailsForm {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number | null;
    password: string;
    role: string;
}

export interface UserDetailsError {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
}

export const validateForm = (form: UserDetailsForm | Omit<UserDetailsForm, 'password'>, setFormError: React.Dispatch<React.SetStateAction<UserDetailsError | Omit<UserDetailsError, "password">>>, withPassword: boolean) => {
    let valid = true;
    if (form.firstName === '') {
        setFormError(formError => ({ ...formError, firstName: 'First name is required' }));
        valid = false;
    } else {
        setFormError(formError => ({ ...formError, firstName: '' }));
    }

    if (form.lastName === '') {
        setFormError(formError => ({ ...formError, lastName: 'Last name is required' }));
        valid = false;
    } else {
        setFormError(formError => ({ ...formError, lastName: '' }));
    }

    if (form.email === '') {
        setFormError((formError) => ({ ...formError, email: 'Email is required' }));
        valid = false;
    } else {
        setFormError((formError) => ({ ...formError, email: '' }));
    }

    if (form.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g) === null) {
        setFormError((formError) => ({ ...formError, email: 'Email is invalid' }));
        valid = false;
    } else {
        setFormError((formError) => ({ ...formError, email: '' }));
    }

    if (!form.phoneNumber) {
        setFormError((formError) => ({ ...formError, phoneNumber: 'Phone number is required' }));
        valid = false;
    } else {
        setFormError((formError) => ({ ...formError, phoneNumber: '' }));
    }

    if (withPassword) {
        if ((form as UserDetailsForm).password === '') {
            setFormError((formError) => ({ ...formError, password: 'Password is required' }));
            valid = false;
        } else {
            setFormError((formError) => ({ ...formError, password: '' }));
        }
    }
    // Add your validation logic here
    return valid
}