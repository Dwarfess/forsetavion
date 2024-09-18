import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {signUpUser} from "./registerUtils";

const schema = yup.object().shape({
    nickname: yup.string()
        .matches(/^[A-Za-z0-9]+$/i, 'Nickname can only contain letters and numbers')
        .min(5, 'Password must be at least 8 characters')
        .required('Nickname is required'),
    email: yup.string().email('Please enter a valid email address').required('Email is required'),
    password: yup.string().min(3, 'Password must be at least 8 characters').required('Password is required'),
}).required();

type FormData = yup.InferType<typeof schema>;

const SignUpForm = () => {
    const { register, handleSubmit, trigger, formState: { isValid, errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: FormData) => signUpUser(data);

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
            <label htmlFor="">Nickname</label>
            <input {...register("nickname", { pattern: /^[A-Za-z]+$/i })} onBlur={() => trigger('nickname')}/>
            <p>{errors.nickname?.message}</p>
        </div>

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
            <button type="submit" className="btn" disabled={!isValid}>Sign up</button>
        </div>
    </form>
}

export { SignUpForm };
