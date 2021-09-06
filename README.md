<h1 align="center" font-weight="bold">
  Portfolio V2
</h1>
<p align="center">
  This is the 2nd iteration of my personal <a href="https://niteshseram.in" target="_blank">website</a> built with <a href="https://nextjs.org/" target="_blank">NextJs</a>, <a href="chakra-ui.com">ChakraUI</a> and <a href="https://vercel.com" target="_blank">Vercel</a>.
</p>

# Overview

This is 2nd iteration of my personal website built using NextJs, ChakraUI, and Vercel. This will be my digital corner where I will be sharing my thoughts, learning, and random stuff. This was not built with the intention to be a template but feel free to fork and customize it for your own use. If you find any issues in the website, feel free to open an issue and if you want, you can open a pull request for it too.

## Main folder structure

- `pages/*`- All the static pages
- `pages/api/*`- API which is handling my contact form
- `component/*`- All the components like Navbar, Footer, ContactForm, etc are here
- `layout/*` - These are the containers which handle the layout of the site
- `data/*`- It contains all the static data about projects, tools and socials
- `data/blog` - It contains all the mdx files for blog
- `styles/*` - All the styling related things like colors, typography, etc are here

# Running locally

```bash
# Clone this repository
git clone https://github.com/niteshseram/Portfolio
# Go into the repository folder
cd Portfolio
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

- [Next JS](https://nextjs.org/)
- [Chakra UI](https://chakra-ui.com)
- [Vercel](https://vercel.com)
