import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {signInAsGuest} from "./registerUtils";
import {useAuthApiUtils} from "./useAuthApiUtils";

const schema = yup.object({
    email: yup.string().email('Please enter a valid email address').required('Email is required'),
    password: yup.string().min(3, 'Password must be at least 8 characters').required('Password is required'),
}).required();

type FormData = yup.InferType<typeof schema>;

const SignInForm = () => {
    const { signInCurrentUser, signUpNewGuest } = useAuthApiUtils();
    const { register, handleSubmit, trigger, setError, formState: { isValid, errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: FormData) => {
        const validUser = await signInCurrentUser(data);
        if (validUser) return;

        setError('email', { type: 'manual', message: 'Incorrect email or password' });
        setError('password', { type: 'manual', message: 'Incorrect email or password' });
    }

    const onGuestButtonClick = () => {
        signInAsGuest();
        // signUpNewGuest();
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
            <label htmlFor="">Email</label>
            <input {...register("email")} onBlur={() => trigger('email')}/>
            <p>{errors.email?.message}</p>
        </div>

        <div className="field">
            <label htmlFor="">Password</label>
            <input {...register("password")} onBlur={() => trigger('password')}/>
            <p>{errors.password?.message}</p>
        </div>

        <div className="actions">
            <div className="btn-link" onClick={onGuestButtonClick}>Try as a guest</div>
            <button type="submit" className="btn" disabled={!isValid}>Sign in</button>
        </div>
    </form>
}

export { SignInForm };
