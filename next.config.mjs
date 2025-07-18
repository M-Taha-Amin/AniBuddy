/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return [
      {
        source: '/',
        destination: '/explore',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
