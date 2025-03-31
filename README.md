# TypeScript Generics Playground

Welcome to the **TypeScript Generics Playground**, an educational and hands-on codebase that helps you understand and master the power of **generics** in TypeScript. This project is ideal for both **beginners** looking to grasp the fundamentals and **intermediate developers** wanting to explore more advanced use cases in **web development**, **API design**, and **game programming**.

---

## 🚀 What's Inside

This repo is structured in **progressive lessons and modules**, walking through real-world scenarios:

### 📘 Lesson 1: Basic Generics

Learn how to create reusable functions with generic type parameters like `identity<T>` or `wrapInArray<T>`.

### 📦 Lesson 2: Generic Interfaces

Build flexible interfaces such as `Box<T>` and `Pair<T>` to store typed data.

### 🧱 Lesson 3: Generic Constraints

Use `extends` to constrain what types can be passed into a generic function (e.g. objects with `.length`).

### 🏗 Lesson 4: Generic Classes

Create classes like `DataStore<T>` and `KeyValueStore<K, V>` that can manage any type of data.

### 🛠 Lesson 5: Utility Types

Explore built-in types like `Partial<T>`, `Readonly<T>`, `Record<K, T>`, and build custom utilities like `Nullable<T>`.

---

## 🌐 Web Development Use Cases

### 🌍 Web 1: API Response Handling

Use generics to handle API responses with type safety and even add transformation capabilities to responses.

```ts
fetchData<User>('https://api.example.com/user/1')
```

### 🧬 Web 2: Dynamic Component Props (React/JSX)

Learn to type component props using `as` patterns and `React.ComponentPropsWithoutRef<T>` to support polymorphic components.

### 🎮 Web 3: Entity Management for Games

Model entities like `Player`, update their state, and reset them using generic game objects.

### 📡 Web 4: Event Bus

A reusable, typed event bus system for dispatching and listening to events using `EventBus<T>`.

---

## ⚔ Game-Oriented System: Inventory Design

Create a generic `Inventory<T extends Item>` system capable of:

- Adding/removing items
- Stacking identical items
- Tracking quantities

Great for RPGs and simulation games where entities are typed and managed at runtime.

---

## 📚 Requirements

- Node.js (optional, for running TS/JS)
- TypeScript (install globally or via devDependencies)

```bash
npm install -g typescript
```
