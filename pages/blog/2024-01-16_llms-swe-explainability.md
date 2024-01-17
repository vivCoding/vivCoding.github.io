---
layout: blog/post.liquid
title: On the topic of wizards
date: 2024-01-16
updated: 2024-01-16
templateEngineOverride: md
---

This is mostly a nonsensical rambling about thoughts I had when reading [this paper](https://arxiv.org/abs/2310.03533). This paper is essentially a survey of how LLMs can be used in the SWE world, and evaluating the current solutions and identifying areas that we still need to research/improve upon.

Of course, code generation is one of the big topics in the paper. It sounds very hyped up - people are using it in their everyday coding lives (apparently 46% of the code on GitHub was written by Copilot), and we have people saying that [programming is already dead](https://cacm.acm.org/magazines/2023/1/267976-the-end-of-programming/fulltext), and that SWEs will be obsolete in the near future.

I'm not sure what's going to happen. I do believe that the world of SWE is changing right now though. The level of abstractions we are adding to our computers is growing. I think it's kinda like how in the past we stopped worrying about 0s and 1s when Assembly came out, and then after that we got C and Fortran and whatnot, and then after that, some super high level languages like Python and JavaScript.

And now, the newest level of abstraction emerging is natural language, e.g. we're using natural language to write our code. It's not perfect _yet_, but when it is, I think it has the potential to replace regular languages (just like compiling C to machine code).

> Is it really "code generation" though? It may just be another compiler, where the input is natural language, and the output is machine code? idk

I digress. Everyone knows this already. What I found interesting however, is that the paper discusses that there may be an important need for code generators to _explain_ code. They mention that one of the criteria we should be following when evaluating code generators is how well they explain the code, regardless of how optimal the code is. From the text:

> "One could imagine many
> scenarios in which an engineer would prefer to accept a
> (possibly) suboptimal software engineering artefact that comes
> with a compelling explanation, over a potentially more per-
> formant solution with a less compelling explanation. After all,
> engineers regularly make the same judgement call for human-
> designed engineering artefacts, so why would we expect it to
> be any different for those produced by machines?"
>
> \- page 15

But, if I know an engineer is extremely smart, do I really need to question it? Do I question my calculator? We question other humans because we know humans make mistakes. But do I question something like 2+2=4?

Say I have a wizard that gave me perfect output every single time. Do I really need an explanation of how it works? Isn't it like the equivalent of asking gcc, "Hey are you sure this Assembly code you gave me is right?"

Granted, I _am_ talking about a perfect world, where a generator, or wizard, is correct all the time. After all, if we didn't have to worry about what a wizard did, we wouldn't have a need for documentation.

It's interesting how we emphasize that the AI explain itself (or even have an AI write code documentation), when our end goal is to make a super correct wizard. I guess for now, it is super useful to have since we're nowhere close at having that perfect world...yet.

Hmm, and I suppose having dumb wizards explaining their code helps with training other dumb wizards improve themselves. AKA the documentation can be used as training data for later?

> "If the end goal is to create a wizard who can do stuff right 100% of the time, why create wizards that document and explain what they do?"
>
> \- a guy who needs to go to sleep

I guess this also gives an opportunity to discuss the untrusting nature of human. Or maybe it's human's nature of curiosity. idk. I ramble.

<img src="https://media1.tenor.com/m/-URYSckgL9sAAAAd/get-out-of-my-head-meme.gif" alt="cat like me fr" width=200>
