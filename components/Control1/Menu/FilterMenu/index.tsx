import React, { useState, useEffect } from 'react';
import styles from './FilterMenu.module.css';
import { IconSearch, IconX, IconLoader2 } from '@tabler/icons-react';
import { createNodeAttribute } from "../../../../api/apifilter4";
import { NotificationExtension } from "../../../../extension/NotificationExtension";

interface FilterMenuProps {
  onClose: () => void;
  project_id: string | null;
}

interface NodeAttributeItem {
  layer3?: string;
}

interface ApiResponse {
  data?: NodeAttributeItem[];
  message?: string;
}

interface MenuItem {
  label: string;
}

export default function FilterMenu({ onClose, project_id }: FilterMenuProps) {
  // State for filters
  const [activePhanKhu, setActivePhanKhu] = useState<string>('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Shophouse']);
  
  // Explicitly typing numbers for state:
  const [floors, setFloors] = useState<number[]>([]); 
  const [bedrooms, setBedrooms] = useState<number[]>([3]);
  const [bathrooms, setBathrooms] = useState<number[]>([]);
  
  const [direction, setDirection] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // const phanKhuOptions = ['Gia An', 'Gia Khang', 'Gia Lộc', 'Gia Phúc'];
  const typeOptions = ['Shophouse', 'Biệt thự', 'Nhà ở xã hội', 'Thương mại', 'Liền kề', 'Trường học', 'Giao thông', 'Cảnh quan'];

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };
   useEffect(() => {
      const fetchData = async () => {
        if (!project_id) return;
  
        setLoading(true);
        try {
          const body = {
            project_id,
            filters: [
              { label: "layer5", values: ["ct","ti"] },
            ],
          };
  
          const data: ApiResponse = await createNodeAttribute(body);
  
          // ✅ Kiểm tra nếu API có message
          if (data?.message) {
            NotificationExtension.Success(data.message);
          }
  
          if (data?.data && Array.isArray(data.data)) {
            const allPhases: string[] = data.data.flatMap(
              (item: NodeAttributeItem) =>
                String(item.layer3 || "")
                  .split(";")
                  .map((z) => z.trim())
                  .filter(Boolean)
            );
  
            // 🆕 BƯỚC LỌC MỚI: Loại bỏ các phase có giá trị là "skip" (không phân biệt chữ hoa/thường)
            const filteredPhases = allPhases.filter((phase) => phase.toLowerCase() !== "skip");
  
            const uniquePhases = Array.from(new Set(filteredPhases));
  
            const sortedPhases = uniquePhases.sort((a, b) => {
              const numA = a.match(/\d+/)?.[0];
              const numB = b.match(/\d+/)?.[0];
              if (numA && numB) return Number(numA) - Number(numB);
              return a.localeCompare(b, "vi", { sensitivity: "base" });
            });
  
            const items: MenuItem[] = sortedPhases.map((phase) => ({
              label: phase,
            }));
            setMenuItems(items);
            if (items.length > 0) {
              setActivePhanKhu(items[0].label);
            }
          } else {
            console.warn("⚠️ Dữ liệu trả về không đúng định dạng:", data);
            NotificationExtension.Fails("Dữ liệu trả về không hợp lệ từ API!");
          }
        } catch (error: unknown) {
          console.error("❌ Lỗi khi gọi API:", error);
  
          // ✅ Nếu backend trả về lỗi có message hoặc detail
          let apiMessage = "Gọi API thất bại!";
          if (error && typeof error === "object") {
            const errObj = error as {
              response?: { data?: { detail?: string; message?: string } };
              message?: string;
            };
            apiMessage =
              errObj.response?.data?.detail ||
              errObj.response?.data?.message ||
              errObj.message ||
              apiMessage;
          }
  
          NotificationExtension.Fails(apiMessage);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [project_id]);

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
          {loading ? (
            <div className={styles.loadingWrapper}>
              <IconLoader2 size={18} className={styles.spinner} />
              <span>Đang tải...</span>
            </div>
          ) : menuItems.length > 0 ? (
            menuItems.map(item => (
              <div 
                key={item.label} 
                className={`${styles.chip} ${activePhanKhu === item.label ? styles.active : ''}`}
                onClick={() => setActivePhanKhu(item.label)}
              >
                {item.label}
              </div>
            ))
          ) : (
            <div className={styles.emptyText}>Không có dữ liệu phân khu</div>
          )}
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
