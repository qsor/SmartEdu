import styles from '../../src/styles/FeatureCard.module.css'
import arrowIcon from '../assets/arrow.svg'

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: string;
  isHighlighted: boolean;
  onClick?: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> =  
({
  title,
  description,
  icon,
  isHighlighted = false,
  onClick 
}) => {
  return (
    <div
      onClick={onClick}
      className={ `${styles.FeatureCardWrapper} cursor-pointer ${
        isHighlighted ? styles.highlighted : undefined
      }`}
    >
      <div>
        <img src={icon} alt="" />
        <p className={styles.FeatureCardTitle}>
          {title}
        </p>
        <p className={styles.FeatureCardDescription}>
          {description}
        </p>
      </div>
      <img className={styles.FCarrow} src={arrowIcon} alt="arrow" />
    </div>
  );
};