"use client";

import { Container, Title, Text } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import styles from "./FavoritePage.module.css";

export default function FavoritePage() {
  return (
    <Container size="lg" className={styles.wrapper}>
      {/* 🔖 Tiêu đề */}
      <div className={styles.header}>
        <IconHeart size={28} color="#752E0B" stroke={1.5} />
        <Title order={2} className={styles.title}>
          Danh sách yêu thích
        </Title>
      </div>

      {/* 📦 Nội dung */}
      <div className={styles.content}>
        {/* Khi chưa có sản phẩm */}
        <Text size="md" c="dimmed">
          Bạn chưa có sản phẩm nào trong danh sách yêu thích.
        </Text>

        {/* Sau này bạn có thể map list ở đây */}
        {/*
        <div className={styles.grid}>
          {favorites.map(item => (
            <FavoriteCard key={item.id} data={item} />
          ))}
        </div>
        */}
      </div>
    </Container>
  );
}
