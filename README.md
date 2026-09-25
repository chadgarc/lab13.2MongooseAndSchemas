# Digital Bookshelf API

REST API for books with Node + Express 5 + Mongoose 9 + dotenv 18 (ESM). Runs on port 3000.

## Structure

```
server.js
db/connection.js
models/Book.js
routes/bookRoutes.js
.env (MONGO_URI + PORT=3000, not committed)
```

## Setup

1. `npm install`
2. Create `.env`:
   ```
   MONGO_URI=your_atlas_uri
   PORT=3000
   ```
3. `node server.js`
4. Expect: `Connected to MongoDB` + `Server is running on port 3000`

## Book Model

| Field         | Type    | Rule          |
| ------------- | ------- | ------------- |
| title         | String  | required      |
| author        | String  | required      |
| isbn          | String  | unique        |
| publishedDate | Date    | optional      |
| inStock       | Boolean | default: true |

Example:

```json
{ "title": "Dune", "author": "Frank Herbert", "isbn": "978-0441172719" }
```

## Endpoints

Base: `http://localhost:3000/api/books`

| Method | Route  | Success           | Errors                        |
| ------ | ------ | ----------------- | ----------------------------- |
| POST   | `/`    | 201 + doc         | 400 validation                |
| GET    | `/`    | 200 + array       | —                             |
| GET    | `/:id` | 200 + doc         | 404 not found, 400 invalid id |
| PUT    | `/:id` | 200 + updated     | 404 / 400                     |
| DELETE | `/:id` | 200 + { message } | 404 / 400                     |

`PUT` uses `findByIdAndUpdate(id, req.body, { new: true, runValidators: true })`:

- `new: true` returns the updated doc, not the old one.
- `runValidators: true` enforces Schema rules on update.

Note: `unique: true` on `isbn` is a Mongo index, not a validator. It needs a clean collection to build; old duplicates prevent `E11000` errors.

## Reflection

1. **Why separate routes, models, and db connection?**
   <br>Separation of concerns: easier to maintain, reuse, and test.

2. **PUT vs PATCH? Which one does `PUT /:id` resemble?**
   <br>`PUT` replaces the whole resource (idempotent); `PATCH` is partial. Ours accepts partial updates, so it behaves closer to `PATCH`.

3. **What should DELETE return?**
   <br>`200 + { message }` (or `204`). Confirms the action without leaking stale data.
