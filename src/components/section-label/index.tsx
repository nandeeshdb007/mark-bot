const Section = ({ label, message }: { label: string; message: string }) => {
  return (
    <div>
      <p className="text-sn font-medium">{label}</p>
      <p className="text-sm font-light">{message}</p>
    </div>
  );
};

export default Section;
