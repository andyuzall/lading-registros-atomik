import z from 'zod';

export const formSchema = z.object({
    categoria: z.string(),
    subCategoria: z.string(),
    pais: z.string(),
    costo: z.string().refine(costo => !isNaN(parseFloat(costo)), {
        message: "Cost its not a number",
    }),
    observaciones: z.string()
});