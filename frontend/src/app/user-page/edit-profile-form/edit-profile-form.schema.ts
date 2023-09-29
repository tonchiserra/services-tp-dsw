import { z } from 'zod'

const editProfileSchema = z.object({
    username: z.string().refine((username) => (username.length > 7 && username.length < 16 && username.replaceAll(' ', '') !== ''), {
        message: 'Username length must be between 8 and 15 characters'
    }),
    name: z.string().refine((name) => (name.length > 0 && name.length < 16 && name.replaceAll(' ', '') !== ''), {
        message: 'Name length must be between 1 and 15 characters'
    }),
    description: z.string().refine((description) => (description.length < 200), {
        message: 'Description length must be less than 200 characters'
    }),
    city: z.string().refine((city) => (city.length < 20), {
        message: 'City length must be less than 20 characters'
    }),
    province: z.string().refine((province) => (province.length < 20), {
        message: 'Province length must be less than 20 characters'
    }),
    country: z.string().refine((country) => (country.length < 20), {
        message: 'Country length must be less than 20 characters'
    })
})

export { editProfileSchema }