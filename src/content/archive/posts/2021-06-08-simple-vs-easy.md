---
title: 'Simple vs. Easy in Software Development'
description: 'In software development, professionals often tackle complex problems that require intricate solutions. However, the key to building reliable software systems lies in simplicity. A clear and uncomplicated approach to d...'
date: 2023-03-30
tags: ['development-practices']
draft: false
originalUrl: 'https://tomauger.gitlab.io/posts/2021-06-08-simple-vs-easy/'
---

In software development, professionals often tackle complex problems that require intricate solutions. However, the key to building reliable software systems lies in simplicity. A clear and uncomplicated approach to design and implementation results in systems that are dependable, maintainable, and adaptable to evolving requirements.

<p align="right">
  <img src="/img/2023-03-30/illustration.jpeg" alt="Simplicity in Software Development" width="250px" style="float: right; margin: 10px">
</p>

## Understanding Simple vs. Easy

It's important to distinguish between "simplicity" and "ease" as they are often confused. "Easy" refers to something approachable and accessible, while "simple" is the opposite of "complex," meaning not intertwined or tied together. Achieving simplicity in software development might be challenging, but it's crucial for the longevity and reliability of a system.

_Example:_ Using a well-known library to complete a task might be "easy," but gaining a deep understanding of the library's inner workings and potential issues can be far from simple.

## Evaluating Software Systems

When evaluating software, the main focus should be on functionality, quality, reliability, adaptability to changing requirements, and the ability to fix problems as they arise. These factors are more important than the coding experience or any cultural implications related to the development process.

_Example:_ Consider a system with a well-designed user interface that appears polished. If the software fails to perform its intended function or is filled with bugs, its value diminishes for the end-user.

## Advantages of Simplicity

Simplicity offers a range of benefits, including ease of understanding, ease of change, ease of debugging, and flexibility. Simple systems promote better communication and collaboration among development teams, speed up troubleshooting, and allow for easy modification and adaptation as needs change.

_Example:_ Functional programming paradigms that eliminate mutable state and side effects lead to more straightforward and maintainable code, demonstrating simplicity in action.

## Selecting Suitable Constructs

Creating simple software involves making deliberate choices about the constructs used. Complex constructs include state, object, methods, syntax, inheritance, switch/matching, variables, imperative loops, actors, object-relational mapping (ORM), and conditionals. In contrast, simple constructs consist of values, functions, namespaces, data, polymorphism, managed references, set functions, queues, declarative data manipulation, rules, and consistency. By opting for simple constructs, developers establish the foundation for simpler, more reliable systems.

## Building Simple Systems: Strategies

Developers can build simple systems by employing several strategies:

1. **Abstracting:** Design by answering questions related to what, who, when, where, why, and how. This approach helps identify essential components and their interactions, resulting in a clearer understanding of the system's architecture.

   _Example:_ When developing a content management system, asking questions like "What is the process for publishing a new article?" or "How does the user authentication system work?" can help simplify the overall design.

2. **Choosing constructs that generate simple artifacts:** Focus on simplicity by using simple constructs and avoiding complexity whenever possible.

3. **Simplifying by encapsulation:** Encapsulate complexity within well-defined boundaries to limit its impact on the overall system. Encapsulation ensures that complex interactions are isolated, making the system easier to understand and maintain.
