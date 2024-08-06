## Instructions to Install and Configure the Project

### 1. Clone the Repository

Clone the project repository and navigate to the project directory.

```bash
git clone https://github.com/jeresc/mempal.git
cd mempal
```

### 2. Install Dependencies

We use Bun to manage the project's dependencies.

```bash
bun install
```

### 3. Set Environment Variables

Copy the `.env.example` file and rename it to `.env`. Then, make sure to configure the necessary variables in the `.env` file.

```bash
cp .env.example .env
```

### 4. Install Firebase CLI

Install Firebase CLI globally using npm to manage Firebase functionalities.

```bash
npm install -g firebase-tools
```

### 5. Start Firebase Emulators

Start the Firebase emulators for local development.

```bash
firebase emulators:start
```

### 6. Start the Next.js Development Server

Run the Next.js development server with Bun.

```bash
bun run dev
```

---

### Access to the Application

The application will be available at [http://localhost:3000/](http://localhost:3000/).

### Additional Notes

- For more information on Firebase configuration, see the [Firebase documentation](https://firebase.google.com/docs/hosting/quickstart).
- To deploy the application to Firebase Hosting, follow the instructions in the [Firebase documentation](https://firebase.google.com/docs/hosting/quickstart).
- You can customize the appearance and behavior of the game by modifying the code in the `src` directory.
- For detailed Next.js development instructions, visit the [Next.js documentation](https://nextjs.org/docs).

If you have any questions or need additional help, feel free to check the [documentation](https://github.com/jeresc/mempal) or open an issue in the repository.
