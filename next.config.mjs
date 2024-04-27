/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "hheaertvgslemtrtjmuw.supabase.co",
      },
    ],
  },
};

export default nextConfig;
