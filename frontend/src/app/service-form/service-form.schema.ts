import { z } from 'zod'

const serviceSchema = z.object({
    type: z.string().refine((type) => type !== '', {
        message: "Type can't be blank"
    }),
    price: z.number().refine((price) => price > 0, {
        message: "Price must be big than 0"
    }),
    description: z.string().refine((description) => (description.length < 200), {
        message: 'Description length must be less than 200 characters'
    })
})

export { serviceSchema }