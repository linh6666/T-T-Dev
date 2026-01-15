   "use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./FavoriteDetails.module.css";
import { IconBath, IconBed, IconHeartFilled } from "@tabler/icons-react";
import { getListFavorites } from "../../api/apiGetListFavorites";
import { deleteFavorites } from "../../api/apiDeteleFavorites";

interface FavoriteItem {
  id: string;
  unit_code: string;
  price: string;
  building_type: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  status: string;
  image?: string | null;
  desc?: string;
  favorite_id: string;
}

export default function FavoriteDetails() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const projectId = searchParams.get("id");

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 👉 hiển thị bên phải
  const [previewItem, setPreviewItem] =
    useState<FavoriteItem | null>(null);

  // 👉 active bên trái (chỉ set khi click)
  const [activeItem, setActiveItem] =
    useState<FavoriteItem | null>(null);

useEffect(() => {
  if (!projectId) return; // tránh gọi API khi chưa có id

  const fetchFavorites = async () => {
    try {
      const res = await getListFavorites(projectId);
      const data = res.data || [];

      setFavorites(data);

      // chỉ preview item đầu tiên
      if (data.length > 0) {
        setPreviewItem(data[0]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu yêu thích:", error);
      setPreviewItem(null);
    } finally {
      setLoading(false);
    }
  };

  fetchFavorites();
}, [projectId]);


  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.title}>Dự án {name}</div>
        <button className={styles.historyBtn}>Lịch sử đơn hàng</button>
      </div>

      {/* Main content */}
      <div className={styles.container}>
        {/* ================= LEFT ================= */}
        <div className={styles.left}>
          <div className={styles.sectionTitle}>
            Yêu thích ({favorites.length})
          </div>

          <div className={styles.cardList}>
            {loading ? (
              <div>Đang tải...</div>
            ) : favorites.length === 0 ? (
              <div>Không có dự án yêu thích</div>
            ) : (
              favorites.map((item) => {
                const isActive = activeItem?.id === item.id;

                return (
                  <div
                    key={item.id}
                    className={`${styles.card} ${
                      isActive ? styles.active : ""
                    }`}
                    onClick={() => {
                      setActiveItem(item);   // 👉 highlight
                      setPreviewItem(item);  // 👉 đổi nội dung phải
                    }}
                  >
                    <div
                      className={styles.thumb}
                      style={{
                        backgroundImage: item.image
                          ? `url(${item.image})`
                          : undefined,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "8px",
                      }}
                    />

                    <div className={styles.cardInfo}>
                      <div className={styles.cardTitle}>
                        {item.unit_code}
                      </div>
                      <div className={styles.price}>
                        {item.price}
                      </div>
                      <div className={styles.sub}>
                        {item.building_type},
                      </div>

                      <div className={styles.meta}>
                        <span className={styles.type1}>
                          <IconBed size={14} /> {item.bedrooms}
                        </span>
                        <span className={styles.type1}>
                          <IconBath size={14} /> {item.bathrooms}
                        </span>
                        <span className={styles.status}>
                          {item.status}
                        </span>
                      </div>
                    </div>

                    <div
  className={styles.heart}
  onClick={async (e) => {
    e.stopPropagation(); // tránh trigger click card

    if (!item.favorite_id) return;

    // ✅ Hiển thị popup confirm
    const confirmDelete = window.confirm("Bạn có muốn loại bỏ yêu thích này không?");
    if (!confirmDelete) return; // người dùng chọn Hủy

    try {
      await deleteFavorites(item.favorite_id);

      // ✅ Cập nhật state, loại bỏ item khỏi danh sách
      setFavorites((prev) =>
        prev.filter((fav) => fav.favorite_id !== item.favorite_id)
      );

      // nếu previewItem đang hiển thị item này, reset preview
      if (previewItem?.favorite_id === item.favorite_id) {
        setPreviewItem(null);
      }
    } catch (error) {
      console.error("Xóa yêu thích thất bại:", error);
    }
  }}
>
  <IconHeartFilled color="red" size={20} />
</div>

                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className={styles.right}>
          {previewItem ? (
            <>
              <div className={styles.gallery}>
                <div
                  className={styles.mainImage}
                  style={{
                    backgroundImage: previewItem.image
                      ? `url(${previewItem.image})`
                      : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                <div className={styles.subImages}>
                  <div />
                  <div />
                </div>
              </div>

              <div className={styles.detail}>
                <div className={styles.topRow}>
                  <div>
                    <h2 className={styles.title}>
                      {previewItem.unit_code}
                    </h2>
                    <div className={styles.location}>
                      {previewItem.building_type}
                      , {previewItem.location}
                    </div>
                  </div>

                  <div className={styles.rightInfo}>
                    <span className={styles.badge}>
                      {previewItem.status}
                    </span>
                    <div className={styles.priceDetail}>
                      Giá niêm yết <b>{previewItem.price}</b>
                    </div>
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.type}>
                    <IconBed size={14} /> {previewItem.bedrooms}
                  </span>
                  <span className={styles.type}>
                    <IconBath size={14} /> {previewItem.bathrooms}
                  </span>
                  <span className={styles.type}>
                    {previewItem.building_type}
                  </span>
                </div>

                <div className={styles.desc}>
                  {previewItem.desc ||
                    "Chưa có mô tả cho dự án này."}
                </div>

                <div className={styles.actions}>
                  <button className={styles.contact}>
                    Liên hệ
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div>Chưa có dữ liệu</div>
          )}
        </div>
      </div>
    </div>
  );
}

