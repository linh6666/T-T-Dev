"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./FavoriteDetails.module.css";
import { IconBath, IconBed, IconHeart } from "@tabler/icons-react";
import { getListFavorites } from "../../api/apiGetListFavorites";

interface FavoriteItem {
  id: string;
  unit_code: string;
  price: string;
  type: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  status: string;
  image?: string | null;
}

export default function FavoriteDetails() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await getListFavorites(); // API đã xử lý lang=vi
        setFavorites(res.data || []);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu yêu thích:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.title}>Dự án {name}</div>
        <button className={styles.historyBtn}>Lịch sử đơn hàng</button>
      </div>

      {/* Main content */}
      <div className={styles.container}>
        {/* Left list */}
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
              favorites.map((item) => (
                <div key={item.id} className={styles.card}>
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
                  ></div>

                  <div className={styles.cardInfo}>
                    <div className={styles.cardTitle}>{item.unit_code}</div>
                    <div className={styles.price}>{item.price}</div>
                    <div className={styles.sub}>
                      {item.type}, {item.location}
                    </div>

                    <div className={styles.meta}>
                      <span className={styles.type1}>
                        <IconBed size={14} /> {item.bedrooms}
                      </span>
                      <span className={styles.type1}>
                        <IconBath size={14} /> {item.bathrooms}
                      </span>
                      <span className={styles.status}>{item.status}</span>
                    </div>
                  </div>

                  <div className={styles.heart}>
                    <IconHeart />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right detail */}
        <div className={styles.right}>
          <div className={styles.gallery}>
            <div className={styles.mainImage}></div>
            <div className={styles.subImages}>
              <div></div>
              <div></div>
            </div>
          </div>

          <div className={styles.detail}>
            {/* HEADER */}
            <div className={styles.topRow}>
              {/* LEFT */}
              <div>
                <h2 className={styles.title}>SH1.13</h2>
                <div className={styles.location}>Shophouse, Đa Lộc</div>
              </div>
              <div className={styles.rightInfo}>
                <span className={styles.badge}>Đang bán</span>
                <div className={styles.priceDetail}>
                  Giá niêm yết <b>10.500.000.000</b>
                </div>
              </div>
            </div>

            {/* INFO */}
            <div className={styles.infoRow}>
              <span className={styles.type}>
                <IconBed size={14} />3
              </span>
              <span className={styles.type}>
                <IconBath size={14} />2
              </span>
              <span className={styles.type}>Shophouse</span>
            </div>

            {/* DESC */}
            <div className={styles.desc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut wisi
              enim ad minim veniam, quis nostrud exerci tation ullamcorper
              suscipit lobortis nisl ut aliquip ex ea commodo consequat. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Ut wisi enim
              ad minim veniam, quis nostrud exerci tation ullamcorper
            </div>

            {/* ACTIONS */}
            <div className={styles.actions}>
              <button className={styles.contact}>Liên hệ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
