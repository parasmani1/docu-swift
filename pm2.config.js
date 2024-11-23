module.exports = {
    apps: [
      {
        name: "DocuSwift Backend",
        script: "src/app.js",
        watch: true, // Automatically restart on file changes (useful in development)
        max_restarts: 50000000000000000, // Restart up to 5 times on crash
        env: {
          NODE_ENV: "production",
        },
      },
    ],
  };
  