interface ParallaxSectionProps {
  imagePath: string;
  height?: string;
  backgroundSize?: string;
}

export function ParallaxSection({ imagePath, height = "40vh", backgroundSize = "cover" }: ParallaxSectionProps) {
  return (
    <div
      style={{
        height,
        backgroundImage: `url(${imagePath})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize,
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
      />
    </div>
  );
}
