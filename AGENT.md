# AGENT.md — Digital Bookshelf API (lab13.2 Mongoose and Schemas)

## Project Context

REST API with Node + Express 5 + Mongoose 9 + dotenv 18.
`package.json` has `"type": "module"` → use ESM `import`/`export` ONLY, never `require()`.
Professor requirement: server MUST run on **port 3000** (`PORT=3000` in `.env`, `process.env.PORT || 3000` in `server.js`).

## Required Structure

```
server.js
.env              # MONGO_URI=... + PORT=3000 (never commit)
.gitignore        # node_modules/ + .env
db/connection.js
models/Book.js
routes/bookRoutes.js
```

## Task 1: Project Setup Checklist (Rubric 5 pts)

- [ ] `npm init -y` done
- [ ] Dependencies installed: `express`, `mongoose`, `dotenv`
- [ ] Files/dirs exist: `server.js`, `db/`, `models/`, `routes/`
- [ ] `.env` contains `MONGO_URI` and `PORT=3000`
- [ ] `.gitignore` contains `node_modules/` and `.env`

## Task 2: Database Connection Checklist (Rubric 5 pts)

- [ ] `db/connection.js` uses `mongoose.connect(process.env.MONGO_URI)`
- [ ] Logs success, exits (`process.exit(1)`) on failure
- [ ] `server.js` imports and calls the connect function before `app.listen`
- [ ] `node server.js` shows DB-connected message with no errors

## Task 3: Book Schema Checklist (Rubric 10 pts)

`models/Book.js` must define:

- [ ] `title: { type: String, required: true }`
- [ ] `author: { type: String, required: true }`
- [ ] `isbn: { type: String, unique: true }`
- [ ] `publishedDate: { type: Date }`
- [ ] `inStock: { type: Boolean, default: true }`
- [ ] `export default mongoose.model('Book', bookSchema)`

## Task 4: API Routes Checklist (Rubric 30 pts, 6 pts each)

`routes/bookRoutes.js` with `express.Router()`, all `async/await` + `try/catch`:

- [ ] `POST /` → create from `req.body`, respond `201` + created doc, `400` on validation error
- [ ] `GET /` → return array, `200`
- [ ] `GET /:id` → return one doc `200`; `404` if not found; `400` on invalid ID
- [ ] `PUT /:id` → `findByIdAndUpdate(id, req.body, { new: true, runValidators: true })`, return updated doc `200`; `404`/`400` handling
- [ ] `DELETE /:id` → `findByIdAndDelete`, return `200` + `{ message }`; `404`/`400` handling
- [ ] Router exported and mounted at `/api/books`

## Task 5: Server Config Checklist

- [ ] `express.json()` middleware used
- [ ] Router mounted at `/api/books`
- [ ] `app.listen(process.env.PORT || 3000)` with log `Server running on port 3000`
- [ ] `node server.js` runs without errors
- [ ] All 5 endpoints tested (Postman/Insomnia) against `http://localhost:3000/api/books`
- [ ] GitHub repo excludes `.env` and `node_modules/`

## Reflection Answers (guide)

1. Separate routes/models/db → separation of concerns: maintainability, reusability, testability.
2. PUT replaces whole resource (idempotent); PATCH partial update. Our `PUT /:id` behaves closer to PATCH since it allows partial updates via `findByIdAndUpdate`.
3. DELETE → return `200` + simple success message (or `204` no content). Don't return deleted object unless needed; confirms action, avoids leaking stale data.
