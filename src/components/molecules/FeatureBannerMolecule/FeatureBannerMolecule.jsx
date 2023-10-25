import "./FeatureBannerMolecule.style.scss"
const FeatureBannerMolecule = ({className,icon,title,description,numeric}) => {
  return (
    <div className={className}>
      <div className="p-icon">
        {icon}
      </div>
      <div className="p-title">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="p-numeric">
          <h1>{numeric}</h1>
        </div>
      </div>
    </div>
  );
};

export default FeatureBannerMolecule;
