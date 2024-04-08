import z from 'zod';

export const formSchema = z.object({
    categoria: z.string(),
    subCategoria: z.string(),
    pais: z.string(),
    costo: z.number().min(0).positive(),
    fechaRegistro: z.date(),
    observaciones: z.string()
});