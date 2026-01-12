"use client";

import { useSearchParams } from "next/navigation";
import styles from "./FavoriteDetails.module.css";
import { IconBath, IconBed, IconHeart } from "@tabler/icons-react";

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
          <div className={styles.cardList}>
 {[1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15].map((_, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.thumb}></div>

              <div className={styles.cardInfo}>
                <div className={styles.cardTitle}>SH1.{index + 13}</div>
                <div className={styles.price}>10.500.000.000</div>
                <div className={styles.sub}>Shophouse, Đa Lộc</div>

                <div className={styles.meta}>
                  <span className={styles.type1}> <IconBed size={14} />3</span>
                  <span className={styles.type1}><IconBath size={14} /> 2</span>
                  <span className={styles.status}>Đang bán</span>
                </div>
              </div>

              <div className={styles.heart}><IconHeart/></div>
            </div>
          ))}
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
    {/* RIGHT */}
 
  </div>

  {/* INFO */}
  <div className={styles.infoRow}>
    <span className={styles.type}><IconBed size={14} />3</span>
    <span className={styles.type}><IconBath size={14} />2</span>
    <span className={styles.type}>Shophouse</span>
  </div>

  {/* DESC */}
  <div className={styles.desc}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut wisi
              enim ad minim veniam, quis nostrud exerci tation ullamcorper
              suscipit lobortis nisl ut aliquip ex ea commodo consequat.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut wisi
              enim ad minim veniam, quis nostrud exerci tation ullamcorper
          
  </div>

  {/* ACTIONS */}
  <div className={styles.actions}>
    {/* <button className={styles.compare}>So sánh</button> */}
    <button className={styles.contact}>Liên hệ</button>
  </div>
</div>

        </div>
      </div>
    </div>
  );
}
