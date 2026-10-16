export default function HolographicPlatform({ title }: { title: string }) {
  return (
    <>
      <div className="studio-platform" aria-hidden="true">
        <div className="studio-platform-reflection" />
        <div className="studio-platform-foot" />
        <div className="studio-platform-wall"><span>{title}</span></div>
        <div className="studio-platform-deck"><i /><i /><i /><b className="studio-ring-spark" /></div>
        <div className="studio-platform-front-light" />
        <div className="studio-platform-pylon pylon-left" /><div className="studio-platform-pylon pylon-right" />
        <span className="studio-platform-light light-left" /><span className="studio-platform-light light-right" />
      </div>
    </>
  );
}

