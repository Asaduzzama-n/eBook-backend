import { z } from 'zod';

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required!' }),
    ebookId: z.string({ required_error: 'EbookId is Required!' }),
    isbn: z.string({ required_error: 'ISBN is Required!' }),
    author: z.array(
      z.object({
        name: z.string({ required_error: 'Author name is Required!' }),
      }),
    ),
    genre: z.string({ required_error: 'Genre is Required!' }),
    publicationYear: z.string({
      required_error: 'Publication year is Required!',
    }),
    edition: z.string({ required_error: 'Edition is Required!' }),
    price: z.number({ required_error: 'Price is Required!' }),
  }),
});

const updateBookZodSchema = z.object({
  title: z.string().optional(),
  ebookId: z.string().optional(),
  isbn: z.string().optional(),
  author: z
    .array(
      z.object({
        name: z.string(),
      }),
    )
    .min(1)
    .optional(),
  genre: z.string().optional(),
  publisher: z
    .object({
      name: z.string().optional(),
      address: z.string().optional(),
    })
    .optional(),
  edition: z.string().optional(),
  price: z.number().optional(),
});

export const BookValidation = { createBookZodSchema, updateBookZodSchema };
