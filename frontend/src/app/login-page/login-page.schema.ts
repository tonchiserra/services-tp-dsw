import { z } from 'zod'

const signUpSchema = z.object({
  name: z.string().refine((name) => (name.length > 0 && name.length < 16 && name.replaceAll(' ', '') !== ''), {
    message: 'Name length must be between 1 and 15 characters'
  }),
  username: z.string().refine((username) => (username.length > 7 && username.length < 16 && username.replaceAll(' ', '') !== ''), {
    message: 'Username length must be between 8 and 15 characters'
  }),
  email: z.string().email({
    message: 'Invalid e-mail'
  }),
  password: z.string().refine((password) => (password.length > 7 && password.length < 16 && password.replaceAll(' ', '') !== ''), {
    message: 'Password length must be between 8 and 15 characters'
  }),
  passwordRepeat: z.string().refine((password) => (password.length > 7 && password.length < 16 && password.replaceAll(' ', '') !== ''), {
    message: 'Password length must be between 8 and 15 characters'
  })
})

const signUpPasswordSchema = signUpSchema.refine((data) => data.password === data.passwordRepeat, {
  message: "Passwords don't match"
})

const signInSchema = z.object({
  email: z.string().email({
    message: 'Invalid e-mail'
  }),
  password: z.string().refine((password) => (password.length > 7 && password.length < 16 && password.replaceAll(' ', '') !== ''), {
    message: 'Password length must be between 8 and 15 characters'
  })
})

export { signUpSchema, signUpPasswordSchema, signInSchema }