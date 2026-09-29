/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false;

let repo = '';
if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '');
}

const nextConfig = {
  output: 'export',
  basePath: repo ? `/${repo}` : '',
  assetPrefix: repo ? `/${repo}/` : undefined,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
