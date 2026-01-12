"use client";

import { useState } from "react";
import { IconHeart, IconShoppingCart } from "@tabler/icons-react";
import { AxiosError } from "axios";
import { createFavorite } from "../../../api/apicreateFavorites";

interface ImageActionButtonsProps {
  unitCode: string;
  projectId: string;
}

export default function ImageActionButtons({
  unitCode,
  projectId,
}: ImageActionButtonsProps) {
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = async () => {
    if (loading || isFavorite) return;

    setLoading(true);
    try {
      await createFavorite({
        unit_code: unitCode,
        project_id: projectId,
      });

      // ✅ chỉ đổi màu
      setIsFavorite(true);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          // đã tồn tại → vẫn coi là favorite
          setIsFavorite(true);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "12px",
        right: "12px",
        display: "flex",
        gap: "12px",
        zIndex: 10,
      }}
    >
      {/* ❤️ FAVORITE */}
      <button
        onClick={handleFavorite}
        disabled={loading || isFavorite}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: "#fff",
          boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
          cursor: loading || isFavorite ? "not-allowed" : "pointer",
          opacity: loading || isFavorite ? 0.6 : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconHeart
          size={20}
          color={isFavorite ? "red" : "#752E0B"}
          fill={isFavorite ? "red" : "none"}
        />
      </button>

      {/* 🛒 GIỎ HÀNG */}
      <button
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: "#fff",
          boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconShoppingCart size={20} color="#752E0B" />
      </button>
    </div>
  );
}
