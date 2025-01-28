import Image from "next/image";

const PortalBanner = () => {
  return (
    <div className="w-full bg-muted flex justify-center py-5">
      <Image
        src="/image/logo.png"
        alt="Logo"
        sizes="100vw"
        style={{
          width: "100px",
          height: "auto",
        }}
        width={0}
        height={0}
      />
    </div>
  );
};

export default PortalBanner;
