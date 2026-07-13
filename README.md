# URL Shortener

A simple URL shortener built with **Node.js**, **Express.js**, **MongoDB**, and **nanoid**. It allows users to shorten long URLs, redirect using the generated short links, and view basic click analytics.

## Features

- Shorten long URLs
- Generate unique short IDs using `nanoid`
- Redirect to the original URL
- Track the number of clicks for each shortened URL
- Simple and responsive frontend

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- nanoid
- HTML
- CSS
- JavaScript


## Installation

1. Clone the repository.

```bash
git clone https://github.com/your-username/url-shortener.git
```

2. Navigate to the project folder.

```bash
cd url-shortener
```

3. Install dependencies.

```bash
npm install
```

4. Create a `.env` file in the project root.

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

5. Start the server.

```bash
npm start
```

or, if using nodemon:

```bash
npm run dev
```

## API Endpoints

### Shorten URL

**POST**

```
/shorten
```

Request Body

```json
{
  "url": "https://example.com"
}
```

Response

```json
{
  "shortUrl": "http://localhost:3000/AbC123"
}
```

---

### Redirect

**GET**

```
/:shortId
```

Redirects the user to the original URL.

---

### Get Analytics

**GET**

```
/analytics/:shortId
```

Response

```json
{
  "clicks": 10
}
```

## Screenshots

<img width="1082" height="1420" alt="image" src="https://github.com/user-attachments/assets/589ed8c4-a256-4899-a285-453ff1a754de" />




