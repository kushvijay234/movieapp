# 🎬 Movie Explorer App

A responsive React application that allows users to search for movies using the [Watchmode API](https://api.watchmode.com/). Built with debounced input, dynamic API integration, and clean UI components — without routing to individual movie pages.

![App Screenshot](https://github.com/kushvijay234/movieapp/blob/master/public/screenshot.jpeg?raw=true)



---

## 🚀 Features

- 🔍 **Live Search**: Search movies by title using Watchmode's `/search` endpoint.
- ⏱️ **Debounced Input**: Optimized search with 500ms debounce to reduce unnecessary API calls.
- 🎥 **Movie List**: Displays basic movie info like title, year, and type.
- ⚡ **Error Handling**: Graceful fallback for failed API requests or empty results.
- 🧼 **Clean UI**: Modular components for maintainability and scalability.

---

## 🛠️ Tech Stack

- **React** (with Hooks)
- **use-debounce** (for input optimization)
- **Watchmode API** (for movie data)

---

## 📦 Installation

```bash
git clone https://github.com/kushvijay234/movieapp.git
cd movieapp
npm install
