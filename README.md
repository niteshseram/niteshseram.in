# Portfolio V2

This is my personal <a href="https://niteshseram.in" target="_blank">website</a> built with <a href="https://nextjs.org/" target="_blank">NextJs 13</a>, <a href="https://tailwindcss.com/">Tailwind CSS</a>, <a href="https://mdxjs.com/">MDX</a> and <a href="https://vercel.com" target="_blank">Vercel</a>.

![Banner](https://github.com/niteshseram/niteshseram.in/blob/main/public/og.png)

# Overview

This is 2nd iteration of my personal website built using NextJs, Tailwind CSS, and Vercel. This will be my digital corner where I will be sharing my thoughts, learning, and random stuff. This was not built with the intention to be a template but feel free to fork and customize it for your own use. If you find any issues in the website, feel free to open an issue and if you want, you can open a pull request for it too.

## Main folder structure

- `app/*`- All the static pages
- `pages/api/views/*`- API for handling blog views
- `components/*`- All the components like Navbar, Footer, etc are here
- `content/*`- It contains all the mdx files for blog

# Running locally

```bash
# Clone this repository
git clone https://github.com/niteshseram/niteshseram.in.git

# Go into the repository folder
cd niteshseram.in

# Install dependencies
yarn

# Run
yarn dev
```

Create a `.env.local` file similar to `.env.example` with the values in it. But is not absolutely necessary thing to do to run the website locally.

- `DATABASE_URL` - DB URL for tracking the blog's view

# Built using

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MDX](https://mdxjs.com/)
- [Vercel](https://vercel.com)
