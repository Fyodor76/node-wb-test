module.exports = {
    apps: [
      {
        name: 'my-app',
        script: 'npm',
        args: 'run start:prod',
        watch: false,
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
