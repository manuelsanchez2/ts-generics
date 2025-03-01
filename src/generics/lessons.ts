// Lesson 1: Basic Generics - Reusable Functions

function identity<T>(value: T): T {
  return value
}

const num = identity(42) // Type inferred as number
const str = identity('Hello') // Type inferred as string

console.log(num, str)

// TODO: Write a function called wrapInArray that takes a value of any type and returns an array containing that value.
function wrapInArray<T>(value: T): T[] {
  return [value]
}

const numArray = wrapInArray(5) // number[]
const strArray = wrapInArray('hello') // string[]
const objArray = wrapInArray({ name: 'John' }) // { name: string }[]
const nestedArray = wrapInArray([1]) // number[][]
const nestedArray2 = wrapInArray([1, 2]) // number[][]

console.log(numArray, strArray, objArray, nestedArray, nestedArray2)

// Lesson 2: Generic Interfaces

interface Box<T> {
  value: T
}

const numberBox: Box<number> = { value: 100 }
const stringBox: Box<string> = { value: 'TypeScript' }

console.log(numberBox, stringBox)

// TODO: Create a generic interface Pair that holds two values of the same type.

interface Pair<T> {
  first: T
  second: T
}

const numberPair: Pair<number> = { first: 1, second: 2 }
const stringPair: Pair<string> = { first: 'A', second: 'B' }

console.log(numberPair, stringPair)

// Lesson 3: Generic Constraints
// You can restrict a generic type using constraints.

function printLength<T extends { length: number }>(item: T): void {
  console.log(`Length: ${item.length}`)
}

printLength('Hello') // Length: 5
printLength([1, 2, 3]) // Length: 3
printLength({ length: 10 }) // Length: 10
// printLength(42) // Error: Argument of type '42' is not assignable to parameter of type '{ length: number; }'

// TODO: Create a function mergeObjects that merges two objects but ensures that both arguments are objects.

function mergeObjects<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b }
}

const obj1 = { name: 'John' }
const obj2 = { age: 30 }
const merged = mergeObjects(obj1, obj2) // { name: string, age: number }
console.log(merged)

// Lesson 4: Generic Classes
// You can create generic classes in TypeScript.

class DataStore<T> {
  private data: T[] = []

  add(item: T): void {
    this.data.push(item)
  }

  getAll(): T[] {
    return this.data
  }
}

const numberStore = new DataStore<number>()
numberStore.add(1)
numberStore.add(2)
numberStore.add(3)
console.log(numberStore.getAll()) // [1, 2, 3]

const stringStore = new DataStore<string>()
stringStore.add('A')
stringStore.add('B')
stringStore.add('C')
console.log(stringStore.getAll()) // ['A', 'B', 'C']

// TODO: Create a KeyValueStore class that stores key-value pairs, where both key and value are of generic types.

class KeyValueStore<K, V> {
  private store: Map<K, V> = new Map()

  set(key: K, value: V): void {
    this.store.set(key, value)
  }

  get(key: K): V | undefined {
    return this.store.get(key)
  }
}

// Expected:
const store = new KeyValueStore<string, number>()
store.set('age', 30)
console.log(store.get('age')) // 30

// Lesson 5: Generic Utility Types
// TypeScript provides built-in utility types that help you work with generics.

// TypeScript provides built-in utility types like Partial<T>, Readonly<T>, and Record<K, T> that work with generics.

interface User {
  id: number
  name: string
}

const partialUser: Partial<User> = { name: 'Alice' } // Some properties are optional
const readonlyUser: Readonly<User> = { id: 1, name: 'Bob' }

// Record<K, T> creates a type with a set of properties K of type T.
const users: Record<number, User> = {
  1: { id: 1, name: 'John' },
  2: { id: 2, name: 'Doe' },
}

console.log(partialUser, readonlyUser, users)

// TODO: Create a utility type that makes all properties of a type optional.

type PartialUser = Partial<User>

const partialUser2: PartialUser = { name: 'Alice' } // Some properties are optional
console.log(partialUser2)

// TODO: Define a generic type Nullable<T> that makes all properties of a given type nullable.

type Nullable<T> = { [P in keyof T]: T[P] | null }

interface User2 {
  id: number
  name: string
}

const nullableUser: Nullable<User2> = { id: null, name: null }
console.log(nullableUser)

// ______________________________________________________
// NOW WE GO TO THE CASES FOR WEB DEVELOPMENT -----------

// Module Web 1 - API Response Handling with Generics
interface ApiResponse<T> {
  success: boolean
  data: T
  error?: string
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url)
    const data: T = await response.json()
    return { success: true, data }
  } catch (error) {
    return { success: false, error: (error as Error).message, data: null as T }
  }
}

// Example usage
interface User {
  id: number
  name: string
}

fetchData<User>('https://api.example.com/user/1').then((res) => {
  if (res.success) {
    console.log(res.data.name)
  } else {
    console.error(res.error)
  }
})

// Challenge - TODO: Modify fetchData<T> so that it accepts a transform function to process the response before returning it.
async function fetchData2<T, R>(
  url: string,
  transform: (data: T) => R
): Promise<ApiResponse<R>> {
  try {
    const response = await fetch(url)
    const rawData: T = await response.json()
    const transformedData = transform(rawData)
    return { success: true, data: transformedData }
  } catch (error) {
    return { success: false, error: (error as Error).message, data: null as R }
  }
}

// Example usage
interface User3 {
  id: number
  name: string
  age: number
}

fetchData2<User3, string>(
  'https://api.example.com/user/1',
  (user) => user.name
).then((res) => {
  if (res.success) {
    console.log(res.data) // Expected output: user name as a string
  }
})

// Types for the result object with discriminated union
type Success<T> = {
  data: T
  error: null
}

type Failure<E> = {
  data: null
  error: E
}

type Result<T, E = Error> = Success<T> | Failure<E>

// Main wrapper function
export async function tryCatch<T, E = Error>(
  promise: Promise<T>
): Promise<Result<T, E>> {
  try {
    const data = await promise
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as E }
  }
}

// Module Web 2: Dynamic Component Props in UI Libraries
// interface ButtonProps<T extends React.ElementType> {
//   as?: T;
//   children: React.ReactNode;
//   props?: React.ComponentProps<T>;
// }

// const Button = <T extends React.ElementType = "button">({
//   as,
//   children,
//   ...props
// }: ButtonProps<T>) => {
//   const Component = as || "button";
//   return <Component {...props}>{children}</Component>;
// };

// // Usage
// <Button as="a" href="https://example.com">Click Me</Button>;
// <Button as="button" onClick={() => alert("Clicked!")}>Click Me</Button>;

// TODO: Modify the Button component so that it inherits all valid props from the specified as component.

// type ButtonProps<T extends React.ElementType> = {
//   as?: T;
// } & React.ComponentPropsWithoutRef<T>;

// const Button = <T extends React.ElementType = "button">({
//   as,
//   children,
//   ...props
// }: ButtonProps<T>) => {
//   const Component = as || "button";
//   return <Component {...props}>{children}</Component>;
// };

// // Usage
// <Button as="a" href="https://example.com">Click Me</Button>;
// <Button as="button" onClick={() => alert("Clicked!")}>Click Me</Button>;

// Module WEB 3: Generic Entity Manager for Game Objects (Game Development)

class Entity<T> {
  constructor(public data: T) {}

  update(changes: Partial<T>): void {
    this.data = { ...this.data, ...changes }
  }
}

// Example usage
interface Player {
  name: string
  health: number
}

const player = new Entity<Player>({ name: 'Hero', health: 100 })
player.update({ health: 80 })

console.log(player.data) // { name: "Hero", health: 80 }

// TODO: Modify Entity<T> to include an id property and add a reset method that restores the original state.
// class Entity<T> {
//   private originalData: T;
//   public id: string;

//   constructor(public data: T, id?: string) {
//     this.originalData = { ...data };
//     this.id = id || crypto.randomUUID();
//   }

//   update(changes: Partial<T>): void {
//     this.data = { ...this.data, ...changes };
//   }

//   reset(): void {
//     this.data = { ...this.originalData };
//   }
// }

// // Example usage
// interface Player {
//   name: string;
//   health: number;
// }

// const player = new Entity<Player>({ name: "Hero", health: 100 });
// player.update({ health: 80 });
// console.log(player.data); // { name: "Hero", health: 80 }

// player.reset();
// console.log(player.data); // { name: "Hero", health: 100 }

// Module WEB 4: Event Bus
type EventCallback<T> = (data: T) => void

class EventBus {
  private events: Map<string, EventCallback<any>[]> = new Map()

  on<T>(event: string, callback: EventCallback<T>): void {
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }
    this.events.get(event)!.push(callback)
  }

  emit<T>(event: string, data: T): void {
    this.events.get(event)?.forEach((callback) => callback(data))
  }
}

// Example usage
const bus = new EventBus()

bus.on<number>('scoreUpdated', (score) => console.log(`Score: ${score}`))
bus.emit('scoreUpdated', 100) // "Score: 100"

// Modify the EventBus so that each event can have multiple listeners, and implement a removeListener method.
// type EventCallback<T> = (data: T) => void;

// class EventBus {
//   private events: Map<string, EventCallback<any>[]> = new Map();

//   on<T>(event: string, callback: EventCallback<T>): void {
//     if (!this.events.has(event)) {
//       this.events.set(event, []);
//     }
//     this.events.get(event)!.push(callback);
//   }

//   emit<T>(event: string, data: T): void {
//     this.events.get(event)?.forEach((callback) => callback(data));
//   }

//   removeListener<T>(event: string, callback: EventCallback<T>): void {
//     if (this.events.has(event)) {
//       this.events.set(
//         event,
//         this.events.get(event)!.filter((cb) => cb !== callback)
//       );
//     }
//   }
// }

// // Example usage
// const bus = new EventBus();

// const onScoreUpdate = (score: number) => console.log(`Score: ${score}`);
// bus.on("scoreUpdated", onScoreUpdate);

// bus.emit("scoreUpdated", 100); // "Score: 100"

// bus.removeListener("scoreUpdated", onScoreUpdate);
// bus.emit("scoreUpdated", 150); // No output since listener is removed

interface Item {
  id: string
  name: string
}

class Inventory<T extends Item> {
  private items: T[] = []

  add(item: T): void {
    this.items.push(item)
  }

  remove(id: string): void {
    this.items = this.items.filter((item) => item.id !== id)
  }

  list(): T[] {
    return this.items
  }
}

// Example usage
interface Weapon extends Item {
  damage: number
}

const sword: Weapon = { id: 'sword_01', name: 'Iron Sword', damage: 15 }
const inventory = new Inventory<Weapon>()

inventory.add(sword)
console.log(inventory.list()) // [{ id: "sword_01", name: "Iron Sword", damage: 15 }]

// TODO: Modify Inventory<T> to support stacking identical items with a quantity property.
// interface Item {
//   id: string;
//   name: string;
// }

// class Inventory<T extends Item> {
//   private items: Map<string, { item: T; quantity: number }> = new Map();

//   add(item: T, quantity: number = 1): void {
//     if (this.items.has(item.id)) {
//       this.items.get(item.id)!.quantity += quantity;
//     } else {
//       this.items.set(item.id, { item, quantity });
//     }
//   }

//   remove(id: string, quantity: number = 1): void {
//     if (this.items.has(id)) {
//       const entry = this.items.get(id)!;
//       entry.quantity -= quantity;
//       if (entry.quantity <= 0) {
//         this.items.delete(id);
//       }
//     }
//   }

//   list(): { item: T; quantity: number }[] {
//     return Array.from(this.items.values());
//   }
// }

// // Example usage
// interface Weapon extends Item {
//   damage: number;
// }

// const sword: Weapon = { id: "sword_01", name: "Iron Sword", damage: 15 };
// const inventory = new Inventory<Weapon>();

// inventory.add(sword, 2);
// console.log(inventory.list()); // [{ item: { id: "sword_01", name: "Iron Sword", damage: 15 }, quantity: 2 }]

// inventory.remove("sword_01", 1);
// console.log(inventory.list()); // [{ item: { id: "sword_01", name: "Iron Sword", damage: 15 }, quantity: 1 }]
