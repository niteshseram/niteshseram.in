# Portfolio V2

This is the 2nd iteration of my personal <a href="https://niteshseram.in" target="_blank">website</a> built with <a href="https://nextjs.org/" target="_blank">NextJs</a>, <a href="https://tailwindcss.com/">Tailwind CSS</a>, <a href="https://mdxjs.com/">MDX</a> and <a href="https://vercel.com" target="_blank">Vercel</a>.

# Overview

This is 2nd iteration of my personal website built using NextJs, Tailwind CSS, and Vercel. This will be my digital corner where I will be sharing my thoughts, learning, and random stuff. This was not built with the intention to be a template but feel free to fork and customize it for your own use. If you find any issues in the website, feel free to open an issue and if you want, you can open a pull request for it too.

## Main folder structure

- `pages/*`- All the static pages
- `pages/api/*`- API which is handling my contact form
- `components/*`- All the components like Navbar, Footer, ContactForm, etc are here
- `layouts/*` - This contains some of the common layouts of the website
- `data/*`- It contains all the static data about projects and tools
- `data/blog` - It contains all the mdx files for blog

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

- `NEXT_PUBLIC_GA_ID` - It is the Google analytics ID
- `SMTP_USER` - It is the SMTP user name
- `SMTP_PASSWORD` - It is the SMTP password

`SMTP_USER` and `SMTP_PASSWORD` is required for the [contact form](https://niteshseram.in/#contact) to work.

# Built using

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MDX](https://mdxjs.com/)
- [Vercel](https://vercel.com)
