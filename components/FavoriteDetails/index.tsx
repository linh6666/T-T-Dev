"use client";

import { useSearchParams } from "next/navigation";
import styles from "./FavoriteDetails.module.css";

export default function FavoriteDetails() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.title}>
          Dự án {name}
        </div>

        <button className={styles.historyBtn}>
          Lịch sử đơn hàng
        </button>
      </div>

      {/* Main content */}
      <div className={styles.container}>
        {/* Left list */}
        <div className={styles.left}>
          <div className={styles.sectionTitle}>
            Yêu thích (15)
          </div>

          {[1, 2, 3].map((_, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.thumb}></div>

              <div className={styles.cardInfo}>
                <div className={styles.cardTitle}>SH1.{index + 13}</div>
                <div className={styles.price}>10.500.000.000</div>
                <div className={styles.sub}>Shophouse, Đa Lộc</div>

                <div className={styles.meta}>
                  <span>🚗 3</span>
                  <span>🛏 2</span>
                  <span className={styles.status}>Đang bán</span>
                </div>
              </div>

              <div className={styles.heart}>❤️</div>
            </div>
          ))}
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
            <div className={styles.detailHeader}>
              <h2>SH1.13</h2>
              <span className={styles.badge}>Đang bán</span>
            </div>

            <div className={styles.location}>Shophouse, Đa Lộc</div>

            <div className={styles.infoRow}>
              <span>🚗 3</span>
              <span>🛏 2</span>
              <span className={styles.type}>Shophouse</span>
            </div>

            <div className={styles.priceDetail}>
              Giá niêm yết <b>10.500.000.000</b>
            </div>

            <div className={styles.desc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut wisi
              enim ad minim veniam, quis nostrud exerci tation ullamcorper
              suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </div>

            <div className={styles.actions}>
              <button className={styles.compare}>So sánh</button>
              <button className={styles.contact}>Liên hệ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
