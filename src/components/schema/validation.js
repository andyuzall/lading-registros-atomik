import z from 'zod';

export const formSchema = z.object({
    categoria: z.string(),
    subCategoria: z.string(),
    pais: z.string(),
    costo: z.string().refine(costo => !isNaN(parseFloat(costo)), {
        message: "Cost its not a number",
    }),
    fechaRegistro: z.string().refine(fechaRegistro => new Date(fechaRegistro).toString() !== "Invalid date", {
        message: "Date its not a date",
    }),
    observaciones: z.string()
});