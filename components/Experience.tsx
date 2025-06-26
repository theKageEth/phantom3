"use client";

import MouseSpotlight from "./MouseSpotlight";
import SparkleEffects from "./SparkleEffects";

// Main Experience component - now just 2D effects for better performance
export default function Experience() {
  return (
    <>
      <MouseSpotlight />
      <SparkleEffects />
    </>
  );
}
