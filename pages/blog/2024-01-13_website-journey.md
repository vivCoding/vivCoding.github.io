---
layout: blog/post.liquid
title: The (Unnecessary) Journey in Redoing my Website
date: 2024-01-13
updated: 2024-01-13
templateEngineOverride: md
---

These were issues I had when developing my [website](https://vivcoding.github.io/), and how I went from vanilla technologies to "a little bit more".

Not quite so recently (like way back in November during my school's Thanksgiving break), I decided to revise my personal website, as I thought it looked a little bit boring.

At the time of writing, I archived this website in a separate branch on GitHub. I hope a future me remembers to not delete it. If not, here's what it used to look like:

![old site](/assets/images/blog/2024-01-13/old.gif)

I don't think it looked too bad, as I thought it was minimalistic-ish. Showed my name and status, some links, my project portfolio, and that's it. Nothing too fancy. Then again, I'm no design expert, and maybe this is absolutely atrocious.

I did start to dislike the gradient background that I was using, and how you can see the pixels in my logo. I also wanted to see if I could add some fancy animations while keeping a little bit of the minimalistic-ish approach I had initially.

For awhile, I've also wanted to implement a little blog section too.

I think I was also just bored. Or something. Else I would've worked on my school homework. Whatever.

> Explaining how I did everything on my site would be a pain. I am just describing some issues I had along the way

## Initial Tech Stack

I wanted to use the least amount of technologies possible when developing my personal website, while also having a pleasant development experience. It's a _personal website_, not some fancy business app. Thus, just like my old website, I opted to just use vanilla HTML and JS. I also whipped up a [simple Node server](https://gist.github.com/vivCoding/9dce24aa7426d8af883afef8ca3e3df7) (more like copy pasta) just so I can mimic production (ish).

I also decided to use [TailwindCSS](https://tailwindcss.com/), since it's pretty minimal and really does speed up styling development time. I just think about the styles for the current HTML element I'm writing, immediately put them in using classes, and bam it's styled.

To make my fancy animations, I decided to utilize the [PixiJS engine](https://pixijs.com/). I just download the minified module file into my project, and bam it's available. I used it way back in high school, so I was somewhat familiar (nah I forgot everything about this library after many years).

So I have:

- Vanilla HTML
- TailwindCSS
- Vanilla JS
- PixiJS (minified module file)

It's not so vanilla with TailwindCSS, but eh. Vanilla enough.

## Issue #1: JS Types

I've used [JSDoc types](https://jsdoc.app/tags-type) in the past for really small projects, since this typing feature is already embedded into VSCode and it's pretty easy to add types using comments. However, I realized that as I added more JS to my project, it got really cumbersome and looked messy. For example, in order to annotate a type for a variable/function, you have to write a comment on a separate line above it.

```js
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
function add(x, y) {
  return x + y
}
```

```ts
// equivalent typescript. So much cleaner
function add(x: number, y: number): number {
  return x + y
}
```

Sometimes VSCode is smart enough to infer JS types. For some complex stuff that I did, it wasn't quite enough. Adding JSDocs just didn't look nice (and I like making code look nice 🤓).

I also could not figure out how to get types intellisense for PixiJS, despite it being imported as a module in my JS code. Maybe I'm just a noob. Either way, I couldn't tolerate it.

I might as well use TypeScript at that point. And while doing that, I might as well get PixiJS as a module from npm and easily get the typings available. And that's what I did.

Now I have:

- Vanilla HTML
- TailwindCSS
- TypeScript
- PixiJS (npm module)

At this point, I started considering whether I wanted to use a bundler to easily manage my JS modules. I probably didn't need a bundler for my small (tiny 💀) JS codebase, but I figured if I ever wanted to add more client-side libraries for more fancy stuff, I should probably use a bundler.

<!-- > Size doesn't matter...right? 😳 -->

## Issue #2: Choosing a bundler

Eh, not really a issue, it was mainly just experimenting with different ones: reading docs and learning how to configure them, seeing how much I liked them during development, etc.

I mainly checked out [Vite](https://vitejs.dev/) and [Parcel](https://parceljs.org/). I knew Vite was used in many JS frameworks nowadays, like Vue and SolidJS. I also heard of Parcel because of the Rust community. Both seemed nice and speedy, and both also came with a hot reloading server. I never really bothered using a hot reloading server with a project this small, but as it turns out, I quite liked it.

I wasn't an expert in configuring Vite or Parcel to its full potential, and I just wanted to quickly choose one. However, in the end, Parcel's feature in configuring file transformers allured me into choosing it over Vite. Even though Parcel's file watcher seemed a bit unstable, the reason I wanted to use the file transformers feature was because of another issue I encountered.

## Issue #3: Templating

My projects section shows all my personal projects I've worked on, where each project is represented by some UI card/whatever you wanna call it. I didn't want to repeatedly write this UI card, because it'd be hard to manage if I wanted to change some styling/element layout on the card.

Furthermore, I wanted to see if I can just write my data in some central file (like a `.json` file), and then have it auto displayed. It would be a lot easier to manage.

I initially concluded that I wanted to make some UI component. I could just use JS to read in some file and render all of my projects. (I actually did experiment with this using [Alpine.js](https://alpinejs.dev/), neat lil' library). However, this would mean my projects section is client-side rendered, and I would potentially lose out on SEO stuff (ok not really necessary but I took it as a challenge).

What I really wanted was 1) A template framework for my HTML pages. I've used [EJS](https://ejs.co/) before at work, and despite its funny looking syntax, I quite like how I can flexibly use JS in my templates. However, in the end, I decided on [LiquidJS](https://liquidjs.com/), simply because it had an officially supported VSCode extension and a (subjectively) better prettier plugin.

> Well, I also chose Liquid because it had a cool name and its syntax looked cooler 💧. Regardless, such absurd reasons.

I also needed 2) a way to compile these template pages upon dev/build time and produce static HTML pages, so I get the SEO benefits. The cool thing about Parcel is that I can define how my files (e.g. my HTML or template pages) get transformed during the build process. I can make my own transformer that takes in a `.liquid` file and converts it to `.html`, using the LiquidJS API. And I can further expand this: if I wanted to use Markdown `.md` files (ex. for a blog/notes page), then all I have to do is write/install a transformer for it.

Essentially, it sounded like Parcel provided me a way to create a mini static site generator. Sounded great initially. Until I actually dived deeper into it.

## Issue #4: Static Page Generation

Take this animation:

![animation](/assets/images/blog/2024-01-13/anim.gif)

For each word, I have to wrap around a `span` tag, and also apply a separate animation delay Tailwind class to it. For example:

```html
<p class="my-14 text-4xl">
  <span class="animation-delay-[500ms]">I</span>
  <span class="animation-delay-[550ms]">am</span>
  <span class="animation-delay-[600ms]">currently</span>
  <span class="animation-delay-[650ms]">a</span>
  <span class="animation-delay-[700ms]">Master's </span>
  <span class="animation-delay-[750ms]">student </span>
  <span class="animation-delay-[800ms]">in </span>
  <span class="animation-delay-[850ms]">CS</span>
  <span class="animation-delay-[900ms]">at</span>
  <span class="animation-delay-[950ms]">Purdue</span>
  <span class="animation-delay-[1000ms]">University. </span>
</p>
```

That's kinda annoying, why not utilize templating features to create these CSS classes dynamically during template compile time?

<!-- prettier-ignore -->
```html
{% assign sentence1 = "I am currently a Master's student in CS at Purdue University." | split: " " %}
{% assign delay = 500 %}
<p class="my-14 text-4xl">
  {% for word in sentence1 %}
    <span class="animation-delay-[{{ delay }}ms]">
      {{ word }}
    </span>
    {% assign delay = delay | plus: 50 %}
  {% endfor %}
</p>

```

What I expected Parcel to do (and how I initially thought it worked) is to start transforming/bundling at the entrypoints I specify (in this case `index.liquid`). It would see it's a Liquid file, and transform it to an HTML file (as I specify in my config). Afterwards, it reads the CSS dependencies in it, and then uses the CSS transformer, (in this process, it generates the necessary CSS classes).

For some reason, this was not the case. Instead, it seemed as though it did not finish compiling the Liquid files, and just read the Tailwind classes that were already present in the file, and only generated those classes, hence skipping the dynamically made classes.

It's very likely I misunderstood something about the internal process. I spent a decent time studying it, even asking in Parcel's official Discord server. No luck.

> I realize as I'm writing this that I could've probably just dynamically created `style` attributes rather than using classes. Maybe it would've worked, maybe not. I cope by saying there might've been other problems down the road if I don't switch to something else 🤪

So, I still needed a way to figure out how to generate the static pages. Honestly, maybe I could've rolled my own little script to do this. But, I also heard of another library that could provide huge flexibility in the future.

## Introducing Eleventy

[Eleventy](https://www.11ty.dev/) is a static site generator that lets you use a wide range of templating engines to statically generate pages. Which is exactly what I needed. All I had to do was plug and play, and do a lil' tinkering.

It was pretty easy to integrate it with Parcel. At the moment, I run two node scripts, where I generate the pages using Eleventy to a specific folder (`_site`), and Parcel reads that folder and bundles everything up for me.

```json
// package.json
{
  ...
  "scripts": {
    "dev": "eleventy && pnpm /^dev:/",
    "dev:eleventy": "eleventy --watch --quiet",
    "dev:parcel": "parcel serve -p 3000 $(find ./_site/ -type f)",
    "build": "eleventy && parcel build --no-content-hash $(find ./_site/ -type f)",
  },
  ...
}
```

To ensure my static pages were available in dev, I made sure to run Eleventy first, _then_ all the watch servers.

Also, I use `$(find ./_site/ -type f)` to set every static HTML file in the `_site` folder as the entrypoint. Parcel can't glob everything in the folder for some reason smh.

> Or I'm just dumb

The neat part is that Eleventy supports multiple templating languages, and I don't even have to worry about managing the whole generation process. I can easily use Liquid files for my main webpages, and Markdown for my blog/note posts, without worrying anything. Very convenient for my smooth brain.

## Conclusion

So, in the end, my final tech stack was:

- LiquidJS (HTML template engine)
- TailwindCSS (styling)
- TypeScript (scripting)
- PixiJS (npm module)
- Parcel (bundler)
- Eleventy (SSG)

> "I wanted to use the least amount of technologies possible"
>
> \- an unwise man once said

I didn't need any of this. I didn't need to spend time learning how to configure each new tool into my project (which I spent an embarrassingly decent amount of time doing). The end result would most likely still be the exact same website.

But, at the end of this, my development environment has very much improved. I have consistent type intellisense with TypeScript (begone TS haters), a solid method to generate static pages with Liquid and Eleventy, and to tie it all up, a decent bundler with Parcel (only decent because the file watcher is whacky sometimes).

Not to mention I have learned quite a bit setting this up. It's quite satisfying seeing how it all works. It's like building a new PC, or configuring a new ArchOS system (btw I use Arch 🤪).

> "Sometimes, vanilla is great. But sometimes, extra stuff can help in the long run."
>
> \- some person who needs to start their homework

![*insert happy cat here*](https://media.tenor.com/CC1VPnwBVMMAAAAi/gianbortion-cat.gif)
