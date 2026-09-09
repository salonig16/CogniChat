# CogniChat

CogniChat is an AI-powered chat application built on the MERN stack, allowing users to have conversational interactions with an LLM through a clean React interface, with conversation history persisted in MongoDB.

## ✨ Features

- Real-time conversational chat interface powered by an LLM API
- Persisted chat history stored in MongoDB
- Clean, responsive React UI with message bubbles and input handling
- Loading/typing indicator while awaiting AI responses
- Secure backend proxy so the LLM API key is never exposed to the client

## 🛠️ Tech Stack

**Frontend**
- React.js
- Component-based chat UI (message list, input box)
- Axios/Fetch for API communication

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- Integration with an LLM API (e.g. OpenAI) for generating responses

> Update the exact LLM provider and any additional libraries once confirmed from `Backend/package.json`.

## 📁 Folder Structure

```
CogniChat/
├── Backend/          # Express server, API routes, MongoDB models, LLM integration
├── Frontend/         # React application (chat UI)
└── .gitignore
```

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/salonig16/CogniChat.git
   cd CogniChat
   ```

2. **Set up the backend**
   ```bash
   cd Backend
   npm install
   ```

   Create a `.env` file inside `Backend/`:
   ```
   MONGO_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_llm_api_key
   PORT=5000
   ```

   Start the backend server:
   ```bash
   npm start
   ```

3. **Set up the frontend**
   ```bash
   cd ../Frontend
   npm install
   npm start
   ```

4. Visit `http://localhost:3000` in your browser to start chatting.

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `OPENAI_API_KEY` | API key for the LLM provider (kept server-side only) |
| `PORT` | Port the backend server runs on |

## 🧪 Usage

- Type a message in the chat input and hit send.
- The message is sent to the backend, which forwards it to the LLM API and returns the response.
- Conversation history is saved so you can pick up where you left off.

## 🔒 Security Notes

- The LLM API key is stored only in the backend `.env` file and is never sent to or exposed in the frontend.
- User input is validated before being forwarded to the LLM API.

## 👤 Author

**Saloni G**
GitHub: [@salonig16](https://github.com/salonig16)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
