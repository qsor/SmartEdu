import { useState } from 'react';
import CategoryPill from './CategoryPill';
import codeIcon from '../../assets/programming.svg'; 
import designIcon from '../../assets/design.svg'; 
import analyticsIcon from '../../assets/analitik.svg'; 
import devopsIcon from '../../assets/devops.svg';      
import aiIcon from '../../assets/ai.svg';

const CATEGORIES = [
  { label: 'Программирование', icon: codeIcon },
  { label: 'Дизайн', icon: designIcon },
  { label: 'Аналитика', icon: analyticsIcon },
  { label: 'DevOps', icon: devopsIcon },
  { label: 'ИИ', icon: aiIcon },
];

export default function CategoriesList() {
  const [activeCategory, setActiveCategory] = useState<string>('Программирование');

  return (
    <div className="flex flex-wrap gap-3">
      {CATEGORIES.map((category) => (
        <CategoryPill
          key={category.label}
          label={category.label}
          icon={category.icon}
          isActive={activeCategory === category.label}
          onClick={() => setActiveCategory(category.label)}
        />
      ))}
    </div>
  );
}