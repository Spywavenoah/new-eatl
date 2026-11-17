import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }],
  },
  async redirects() {
    const oem = [
      "wrapmaster",
      "emerson",
      "cygnus",
      "lenels2",
      "lauris-technologies",
      "technofink",
      "blackpearl",
      "megger",
      "drake-specialties",
    ];
    return [
      // Legacy eatlng.com paths
      { source: "/home", destination: "/", permanent: true },
      { source: "/engineering", destination: "/services/engineering", permanent: true },
      { source: "/construction-and-maintenance", destination: "/services/construction-and-maintenance", permanent: true },
      { source: "/construction-and-maintainance", destination: "/services/construction-and-maintenance", permanent: true },
      { source: "/instrumentation-and-control", destination: "/services/instrumentation-and-control", permanent: true },
      { source: "/testing-and-calibration", destination: "/services/testing-and-calibration", permanent: true },
      { source: "/others-testing-and-calibration", destination: "/services/testing-and-calibration", permanent: true },
      { source: "/asset-integrity-management", destination: "/services/asset-integrity-management", permanent: true },
      { source: "/flow-metering-lab", destination: "/labs/flow-metering-lab", permanent: true },
      { source: "/electrical-and-instrumentation-lab", destination: "/labs/electrical-and-instrumentation-lab", permanent: true },
      { source: "/career", destination: "/careers", permanent: true },
      { source: "/frequently-asked-questions", destination: "/faq", permanent: true },
      { source: "/calibration-terms-and-conditions", destination: "/calibration-terms", permanent: true },
      { source: "/site/oem-catalog", destination: "/oem-products", permanent: true },
      ...oem.map((p) => ({ source: `/${p}-products`, destination: `/oem-products#${p.split("-")[0]}`, permanent: true })),
    ];
  },
};

export default nextConfig;
