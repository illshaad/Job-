module.exports = {
  apps: [
    {
      name: "Job-server",
      script: "npm",
      args: "run pm2-build",
      cwd: "./back",
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
    {
      name: "Job-client",
      script: "npm",
      args: "run pm2-build",
      cwd: "./client",
      env_production: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
  ],
  deploy: {
    production: {
      user: "gramos",
      host: "34.77.241.34",
      ref: "origin/master",
      repo: "git@github.com:GramosI7/DIVA-DIAG-IA.git",
      path: "/home/gramos/diag-ia",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "ssh-keyscan github.com >> /home/gramos/.ssh/known_hosts",
    },
  },
};
