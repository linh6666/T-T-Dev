"use client";

import { useState } from "react";
import { IconHeart } from "@tabler/icons-react";
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
      setIsFavorite(true);
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        setIsFavorite(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        // justifyContent: "flex-end",
      }}
    >
      <button
        onClick={handleFavorite}
        disabled={loading || isFavorite}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",

          padding: "6px 10px",
          borderRadius: "999px",

          fontSize: "14px",
          fontWeight: 500,

          border: isFavorite
            ? "1px solid #ff4d4f"
            : "1px solid #e5e7eb",

          backgroundColor: isFavorite ? "#fff5f5" : "#ffffff",
          color: isFavorite ? "#ff4d4f" : "#752E0B",

          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",

          cursor: loading || isFavorite ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,

          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          if (!isFavorite) {
            e.currentTarget.style.boxShadow =
              "0 6px 18px rgba(0,0,0,0.18)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow =
            "0 4px 12px rgba(0,0,0,0.12)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <IconHeart
          size={18}
          color={isFavorite ? "#ff4d4f" : "#752E0B"}
          fill={isFavorite ? "#ff4d4f" : "none"}
        />
        {isFavorite ? "Đã yêu thích" : "Yêu thích"}
      </button>
    </div>
  );
}
