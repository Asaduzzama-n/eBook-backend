import { z } from 'zod';

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required!' }),
    bookUrl: z.string().optional(),
    isbn: z.string({ required_error: 'ISBN is Required!' }),
    bookDescription: z.string({
      required_error: 'Book description is required!',
    }),
    author: z.object({
      author1: z.string({ required_error: 'Author required!' }),
      author2: z.string().optional(),
      author3: z.string().optional(),
    }),
    publisher: z.object({
      name: z.string({ required_error: 'Publisher Name is Required!' }),
      address: z.string({ required_error: 'Publisher Address is Required!' }),
    }),
    category: z.string({ required_error: 'Category is Required!' }),
    publicationYear: z.string({
      required_error: 'Publication year is Required!',
    }),
    version: z.string({ required_error: 'Edition is Required!' }),
    price: z.string({ required_error: 'Price is Required!' }),
    coverImg: z.string().optional(),
    quickViewUrl: z.string().optional(),
  }),
});

const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    isbn: z.string().optional(),
    bookDescription: z.string().optional(),
    language: z.string().optional(),
    author: z
      .object({
        author1: z.string().optional(),
        author2: z.string().optional(),
        author3: z.string().optional(),
      })
      .optional(),
    category: z.string().optional(),
    publicationYear: z.string().optional(),
    publisher: z
      .object({
        name: z.string().optional(),
        address: z.string().optional(),
      })
      .optional(),
    version: z.string().optional(),
    price: z.number().optional(),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
};
