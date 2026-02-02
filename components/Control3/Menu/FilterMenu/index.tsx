import React, { useState } from 'react';
import styles from './FilterMenu.module.css';
import { IconSearch, IconX } from '@tabler/icons-react';

interface FilterMenuProps {
  onClose: () => void;
}

export default function FilterMenu({ onClose }: FilterMenuProps) {
  // State for filters
  const [activePhanKhu, setActivePhanKhu] = useState<string>('Gia An');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Shophouse']);
  
  // Explicitly typing numbers for state:
  const [floors, setFloors] = useState<number[]>([]); 
  const [bedrooms, setBedrooms] = useState<number[]>([3]);
  const [bathrooms, setBathrooms] = useState<number[]>([]);
  
  const [direction, setDirection] = useState<string>('');

  const phanKhuOptions = ['Gia An', 'Gia Khang', 'Gia Lộc', 'Gia Phúc'];
  const typeOptions = ['Shophouse', 'Biệt thự', 'Nhà ở xã hội', 'Thương mại', 'Liền kề', 'Trường học', 'Giao thông', 'Cảnh quan'];

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // const toggleNumber = (num: number, current: number[], setFunc: (val: number[]) => void) => {
  //    setFunc(current.includes(num) ? current.filter(n => n !== num) : [...current, num]);
  // };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.searchInputWrapper}>
          <IconSearch size={16} className={styles.searchIcon} />
          <input type="text" placeholder="Tìm kiếm..." className={styles.searchInput} />
        </div>
        <button className={styles.closeBtn} onClick={onClose}>
            <IconX size={18} />
        </button>
      </div>

      {/* Phân khu */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Phân khu</div>
        <div className={styles.chipGroup}>
          {phanKhuOptions.map(pk => (
            <div 
              key={pk} 
              className={`${styles.chip} ${activePhanKhu === pk ? styles.active : ''}`}
              onClick={() => setActivePhanKhu(pk)}
            >
              {pk}
            </div>
          ))}
        </div>
      </div>

      {/* Loại công trình */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Loại công trình</div>
        <div className={styles.checkboxGroup}>
          {typeOptions.map(type => (
            <label key={type} className={styles.checkboxItem}>
              <input 
                type="checkbox" 
                checked={selectedTypes.includes(type)}
                onChange={() => toggleType(type)}
                className={styles.checkbox}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.gridSection}>
          {/* Numbers Sections */}
          <div className={styles.quantityGroup}>
             <QuantityRow label="Số lượng tầng" values={[1, 2, 3, 4]} activeValues={floors} onChange={(nums) => setFloors(nums)} />
             <QuantityRow label="Số lượng phòng ngủ" values={[1, 2, 3, 4]} activeValues={bedrooms} onChange={(nums) => setBedrooms(nums)} />
             <QuantityRow label="Số lượng nhà tắm" values={[1, 2, 3, 4]} activeValues={bathrooms} onChange={(nums) => setBathrooms(nums)} />
          </div>

          {/* Compass */}
           <div className={styles.compassSection}>
                <div className={styles.sectionTitle}>Hướng</div>
                <div className={styles.diamondGrid}>
                    {['B', 'ĐB', 'Đ', 'TB', '', 'ĐN', 'T', 'TN', 'N'].map((dir, idx) => (
                         // Middle cell is empty or decorative
                         dir === '' ? <div key={idx} className={styles.diamondCell} style={{border: 'none', background: 'transparent'}}/> :
                        <div 
                            key={dir} 
                            className={`${styles.diamondCell} ${direction === dir ? styles.active : ''}`}
                            onClick={() => setDirection(dir)}
                        >
                            <span>{dir}</span>
                        </div>
                    ))}
                </div>
            </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <button className={`${styles.actionBtn} ${styles.btnReset}`}>Làm mới</button>
        <button className={`${styles.actionBtn} ${styles.btnSearch}`}>Tìm kiếm</button>
      </div>
    </div>
  );
}

const QuantityRow = ({ label, values, activeValues, onChange }: { label: string, values: number[], activeValues: number[], onChange: (val: number[]) => void }) => {
    return (
        <div className={styles.section}>
            <div className={styles.sectionTitle}>{label}</div>
            <div className={styles.circleBtnGroup}>
                {values.map(val => (
                    <div 
                        key={val} 
                        className={`${styles.circleBtn} ${activeValues.includes(val) ? styles.active : ''}`}
                        onClick={() => onChange(activeValues.includes(val) ? activeValues.filter(v => v !== val) : [...activeValues, val])}
                    >
                        {val}
                    </div>
                ))}
            </div>
        </div>
    )
}
