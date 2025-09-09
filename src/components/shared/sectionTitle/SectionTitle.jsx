const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="md:w-4/12 mx-auto mb-8 text-center">
      <p className="text-yellow-600 mb-3">---{subHeading}---</p>
      <h3 className="text-3xl uppercase border-y-4 py-3 ">{heading}</h3>
    </div>
  );
};

export default SectionTitle;
