module.exports = {
  apps: [
    {
      name: 'backend-siga',
      script: "cmd",
      args: "/c yarn start",
      watch: false,
      env: {
        NODE_ENV: "production", // Variáveis de ambiente para produção
      },
      env_development: {
        NODE_ENV: "development", // Variáveis de ambiente para desenvolvimento
      }
    },
  ],
};
