import FeatureBannerMolecule from '../../molecules/FeatureBannerMolecule/FeatureBannerMolecule'
import './FeaturesBanner.style.scss'
import { SlDirections,SlBasket,SlRocket,SlPresent } from 'react-icons/sl'

const FeaturesBanner = () => {
  return (
    <div className="container-feature">
        <FeatureBannerMolecule className="p1" icon={<SlDirections/>} title="Filter & Explore" description="Choose your desired book from our collection" numeric="01"/>
        <FeatureBannerMolecule className="p2" icon={<SlBasket/>} title="Add To Cart" description="Cart can carry all your desired books." numeric="02"/>
        <FeatureBannerMolecule className="p1" icon={<SlRocket/>} title="Fast Shipping" description="We care your eagerness and ensure Fast Shipping" numeric="03"/>
        <FeatureBannerMolecule className="p2" icon={<SlPresent/>} title="Enjoy The Product" description="Don't forget to leave a comment about your experience" numeric="04"/>
    </div>
  )
}

export default FeaturesBanner