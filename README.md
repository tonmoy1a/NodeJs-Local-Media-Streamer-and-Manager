# Local Media Streamer & Manager (Node.js)

> A self-hosted Node.js media server for streaming and managing local video, audio, and files from your own computer or NAS — a lightweight, open-source alternative to Plex/Jellyfin for browsing, streaming, uploading, and organizing your personal media library over the network.

[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D14-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](#license)
[![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-brightgreen)](#contributing)

**Keywords:** local media server, Node.js media streamer, self-hosted video streaming, file manager web app, home media server, video streaming server, LAN media player, ffmpeg thumbnail generator, express file browser, personal cloud storage alternative.

## What is this?

**Local Media Streamer and Manager** is a self-hosted web application, built with **Node.js**, **Express**, and **ffmpeg**, that turns any folder on your computer into a browsable, streamable media library accessible from a web browser on your local network. Think of it as a minimal, open-source, self-hosted alternative to Plex, Jellyfin, or Emby — with built-in file management features like upload, delete (with trash/recycle bin), folder creation, and zip extraction.

Whether you want to stream movies from a home server, browse a photo/video archive from your phone, or manage files on a NAS without installing bloated software, this project gives you a fast, no-frills way to do it.

## Features

- 📁 **Browse local folders** — navigate directories and files through a simple web UI
- ▶️ **Stream video & media files** directly in the browser (powered by [video.js](https://videojs.com/))
- 🖼️ **Automatic video thumbnails** generated on-the-fly with `ffmpeg`
- ⬆️ **Upload files** to any folder from the browser
- 📂 **Create new folders** remotely
- 🗑️ **Delete files safely** — deleted files are moved to a local trash/recycle bin instead of being permanently removed
- 📦 **Extract `.zip` archives** directly on the server
- 🌐 **REST API** for all operations (list files, stream, upload, delete, unzip, thumbnails)
- ⚡ **Lightweight** — built on Express with a minimal React (CDN, no build step) frontend

## Tech Stack

- **Backend:** [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)
- **Media processing:** [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg) (thumbnail generation)
- **File uploads:** [Multer](https://github.com/expressjs/multer)
- **Archive handling:** [adm-zip](https://github.com/cthackers/adm-zip)
- **File type detection:** [file-type](https://github.com/sindresorhus/file-type)
- **Frontend:** React (via CDN, no bundler) + [video.js](https://videojs.com/) for playback

## Requirements

- [Node.js](https://nodejs.org/) v14 or later
- [ffmpeg](https://ffmpeg.org/download.html) installed and available on your system `PATH` (required for video thumbnail generation)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/tonmoy1a/NodeJs-Local-Media-Streamer-and-Manager.git
cd NodeJs-Local-Media-Streamer-and-Manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file and set `BASE_PATH` to the folder you want to serve (e.g. your Movies, Videos, or Media directory):

```bash
cp .env_example .env
```

Edit `.env`:

```env
BASE_PATH=/path/to/your/media/folder
```

### 4. Run the server

```bash
npm start
```

For development with auto-restart on file changes:

```bash
npm run dev
```

The app will be available at:

```
http://localhost:3000
```

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api` | List files and folders in the base directory |
| `GET` | `/api/get-file/:folderName` | List files and folders inside a specific folder |
| `GET` | `/api/file-stream/:fileName` | Stream/download a specific file |
| `GET` | `/api/file-thumbnail/:folderPath/:fileName` | Get (or generate) a video thumbnail |
| `POST` | `/api/file-upload/:path` | Upload a file to a given path |
| `POST` | `/api/create-folder/:path` | Create a new folder |
| `DELETE` | `/api/file-delete` | Move a file to trash |
| `POST` | `/api/file-unzip` | Extract a `.zip` archive on the server |

## Use Cases

- Stream your personal video/movie collection to any device on your home network
- Manage and organize files on a home server or NAS from a browser
- Quickly preview video thumbnails without opening a media player
- Share and manage files on a Raspberry Pi or self-hosted home lab setup

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/tonmoy1a/NodeJs-Local-Media-Streamer-and-Manager/issues) or open a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes
4. Push to the branch and open a Pull Request

## License

This project is licensed under the **ISC License**.

## Disclaimer

This project is intended for use on trusted local/private networks. It does not include authentication or access control out of the box — do not expose it directly to the public internet without adding your own security layer (authentication, reverse proxy, HTTPS, etc.).
