import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */


  images:{

    remotePatterns:[

      {
        protocol:"https",
        hostname:"image.tmdb.org",
        pathname:"/t/p/**"
      }

    ]
  },
  
  // typescript: {
  //   ignoreBuildErrors: true,
  // },

};

export default nextConfig;
