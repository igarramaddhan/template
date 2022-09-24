const callerTarget = (api) =>
  api.caller((caller) => (caller ? caller.target : null));

module.exports = (api) => {
  const isNodeTarget = callerTarget(api) === 'node';
  const isTest = api.env('test');
  return {
    presets: [
      [
        '@babel/preset-react',
        {
          development: !api.env('production'),
          runtime: 'automatic',
        },
      ],
      [
        '@babel/preset-env',
        //{
        //useBuiltIns: 'usage',
        //corejs: 3,
        //shippedProposals: true,
        //debug: !isTest,
        //},
      ],
      '@babel/preset-typescript',
    ],
    plugins: ['@babel/plugin-transform-runtime'],
    env: {
      development: {
        plugins: [],
      },
      production: {
        plugins: [],
      },
    },
  };
};
