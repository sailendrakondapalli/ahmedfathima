interface ParallaxSectionProps {
  imagePath: string;
  height?: string;
}

export function ParallaxSection({ imagePath, height = "40vh" }: ParallaxSectionProps) {
  return (
    <div
      style={{
        height,
        backgroundImage: `url(${imagePath})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
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
