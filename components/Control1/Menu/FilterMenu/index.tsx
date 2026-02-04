import React, { useState, useEffect } from 'react';
import styles from './FilterMenu.module.css';
import { IconSearch, IconX, IconLoader2 } from '@tabler/icons-react';
import {  Text as MantineText,  } from '@mantine/core';
import { createNodeAttribute } from "../../../../api/apifilter4";
import { NotificationExtension } from "../../../../extension/NotificationExtension";
import SearchResultModal from './SearchResultModal';

interface FilterMenuProps {
  onClose: () => void;
  project_id: string | null;
}

interface NodeAttributeItem {
  building_type?: string;
  layer4?: string;
  status_unit?: string;
  id?: number | string;
  unit_code?: string;
  direction?: string;
  main_door_direction?: string;
  bedroom?: string | number;
  bathroom?: string | number;
}

interface ApiResponse {
  data?: NodeAttributeItem[];
  message?: string;
}

export default function FilterMenu({ onClose, project_id }: FilterMenuProps) {
  // State for filters
  const [activePhanKhu, setActivePhanKhu] = useState<string>('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  
  const [direction, setDirection] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [phanKhuOptions, setPhanKhuOptions] = useState<string[]>([]);
  const [typeOptions, setTypeOptions] = useState<string[]>([]);
  const [statusOptions, setStatusOptions] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  
  // Results states
  const [searchResults, setSearchResults] = useState<NodeAttributeItem[]>([]);
  const [resultOpened, setResultOpened] = useState(false);

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
            // 📍 Lấy danh sách Phân khu từ layer4
            const allPhases: string[] = data.data.flatMap(
              (item: NodeAttributeItem) =>
                String(item.layer4 || "")
                  .split(";")
                  .map((z) => z.trim())
                  .filter(Boolean)
            );
  
            // 📍 Lấy danh sách Loại công trình từ building_type
            const allTypes: string[] = data.data.flatMap(
              (item: NodeAttributeItem) =>
                String(item.building_type || "")
                  .split(";")
                  .map((z) => z.trim())
                  .filter(Boolean)
            );
  
            // 📍 Lấy danh sách Trạng thái từ status_unit
            const allStatus: string[] = data.data.flatMap(
              (item: NodeAttributeItem) =>
                String(item.status_unit || "")
                  .split(";")
                  .map((z) => z.trim())
                  .filter(Boolean)
            );

            const filteredPhases = allPhases.filter((phase) => phase.toLowerCase() !== "skip");
            const filteredTypes = allTypes.filter((type) => type.toLowerCase() !== "skip");
            const filteredStatus = allStatus.filter((status) => status.toLowerCase() !== "skip");

            const uniquePhases = Array.from(new Set(filteredPhases)).sort((a, b) => a.localeCompare(b, "vi"));
            const uniqueTypes = Array.from(new Set(filteredTypes)).sort((a, b) => a.localeCompare(b, "vi"));
            const uniqueStatus = Array.from(new Set(filteredStatus)).sort((a, b) => a.localeCompare(b, "vi"));
  
            setPhanKhuOptions(uniquePhases);
            setTypeOptions(uniqueTypes);
            setStatusOptions(uniqueStatus);
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

  // 🔄 Tự động cập nhật ô tìm kiếm khi các bộ lọc thay đổi
  useEffect(() => {
    const activeFilters: string[] = [];
    
    if (activePhanKhu) activeFilters.push(activePhanKhu);
    if (selectedTypes.length > 0) activeFilters.push(...selectedTypes);
    if (selectedStatus.length > 0) activeFilters.push(...selectedStatus);
    if (direction) activeFilters.push(direction);

    // Chuyển mảng thành chuỗi cách nhau bằng dấu phẩy
    setSearchValue(activeFilters.join(', '));
  }, [activePhanKhu, selectedTypes, selectedStatus, direction]);

  const handleSearch = async () => {
    if (!project_id) return;

    setResultOpened(true); // Open modal to show loading or results
    
    try {
      const filters = [
        { label: "layer5", values: ["ct", "ti"] },
      ];

      if (activePhanKhu) filters.push({ label: "zone", values: [activePhanKhu] });
      if (selectedTypes.length > 0) filters.push({ label: "building_type", values: selectedTypes });
      if (selectedStatus.length > 0) filters.push({ label: "status_unit", values: selectedStatus });
      if (direction) filters.push({ label: "main_door_direction", values: [direction] });

      const body = {
        project_id,
        filters: filters
      };

      const data = await createNodeAttribute(body);
      
      if (data?.data && Array.isArray(data.data)) {
        setSearchResults(data.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("❌ Search error:", error);
      NotificationExtension.Fails("Tìm kiếm thất bại!");
      setSearchResults([]);
    }
  };

  const handleReset = () => {
    setActivePhanKhu('');
    setSelectedTypes([]);
    setSelectedStatus([]);
    setDirection('');
    setSearchValue('');
    setSearchResults([]);
    setResultOpened(false);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.searchInputWrapper}>
          <IconSearch size={16} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Tìm kiếm..." 
            className={styles.searchInput} 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
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
          ) : phanKhuOptions.length > 0 ? (
            phanKhuOptions.map(pk => (
              <div 
                key={pk} 
                className={`${styles.chip} ${activePhanKhu === pk ? styles.active : ''}`}
                onClick={() => setActivePhanKhu(activePhanKhu === pk ? '' : pk)}
              >
                {pk}
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
          {loading ? (
             <MantineText size="xs" c="dimmed">Đang tải loại công trình...</MantineText>
          ) : typeOptions.length > 0 ? (
            typeOptions.map(type => (
              <label key={type} className={styles.checkboxItem}>
                <input 
                  type="checkbox" 
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleType(type)}
                  className={styles.checkbox}
                />
                {type}
              </label>
            ))
          ) : (
            <MantineText size="xs" c="dimmed">Không có dữ liệu loại công trình</MantineText>
          )}
        </div>
      </div>

      <div className={styles.gridSection}>
          {/* Numbers Sections */}
          <div className={styles.quantityGroup}>
             <div className={styles.section}>
                <div className={styles.sectionTitle}>Trạng Thái</div>
                <div className={styles.chipGroup}>
                  {loading ? (
                    <MantineText size="xs" c="dimmed">Đang tải trạng thái...</MantineText>
                  ) : statusOptions.length > 0 ? (
                    statusOptions.map(status => (
                      <div 
                        key={status} 
                        className={`${styles.chip} ${selectedStatus.includes(status) ? styles.active : ''}`}
                        onClick={() => setSelectedStatus(prev => prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status])}
                      >
                        {status}
                      </div>
                    ))
                  ) : (
                    <MantineText size="xs" c="dimmed">Không có dữ liệu trạng thái</MantineText>
                  )}
                </div>
             </div>
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
                            onClick={() => setDirection(direction === dir ? '' : dir)}
                        >
                            <span>{dir}</span>
                        </div>
                    ))}
                </div>
            </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <button className={`${styles.actionBtn} ${styles.btnReset}`} onClick={handleReset}>Làm mới</button>
        <button className={`${styles.actionBtn} ${styles.btnSearch}`} onClick={handleSearch}>Tìm kiếm</button>
      </div>

      <SearchResultModal 
        opened={resultOpened}
        onClose={() => setResultOpened(false)}
        results={searchResults}
      />
    </div>
  );
}
