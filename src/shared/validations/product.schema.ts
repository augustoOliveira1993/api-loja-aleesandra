// validations/product.schema.ts
import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),

  type: z.string().min(1, 'Tipo é obrigatório'),   // Ex: 'urso'
  color: z.string().min(1, 'Cor é obrigatória'),   // Ex: 'azul'
  size: z.enum(['P', 'M', 'G'], { required_error: 'Tamanho é obrigatório' }),

  categoryId: z.string().length(24, 'ID de categoria inválido'),
  basePrice: z.number().positive('Preço deve ser positivo'),

  priceTableIds: z.array(z.string().length(24)).optional(), // IDs válidos do MongoDB
  stock: z.number().int().min(0).default(0),
  images: z.array(z.string().url({ message: 'URL da imagem inválida' })).optional(),

  active: z.boolean().optional().default(true),
});
