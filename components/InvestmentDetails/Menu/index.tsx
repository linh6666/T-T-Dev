"use client";

import React, { useState } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Stack } from "@mantine/core";
// import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";

interface MenuProps {
  onSelect?: (id: string) => void; // ✅ callback nhận từ cha
}

export default function Menu({ onSelect }: MenuProps) {
  // const router = useRouter();
  const [active, setActive] = useState(false);

  const menuItems = [
    { label: "D-Lk49.1", id: "LWPOLYLINE" },
    { label: "D-Lk49.2", id: "LWPOLYLINE-2" },
    { label: "D-Lk49.3", id: "LWPOLYLINE-3" },
    { label: "D-Lk49.4", id: "LWPOLYLINE-4" },
    { label: "D-Lk49.5", id: "LWPOLYLINE-5" },
    { label: "D-Lk49.6", id: "LWPOLYLINE-6" },
    { label: "D-Lk49.7", id: "LWPOLYLINE-7" },
    { label: "D-Lk49.8", id: "LWPOLYLINE-8" },
    { label: "D-Lk49.9", id: "LWPOLYLINE-9" },
    { label: "D-Lk49.10", id: "LWPOLYLINE-10" },
  ];

  return (
    <div className={styles.box}>
      <div className={styles.logo}>
        <Image src="/Logo/logo-tt-city-millennia.png" alt="Logo" />
      </div>

      <div className={styles.title}>
        <h1>D-LK49</h1>
      </div>

      <div className={styles.Function}>
        <Stack align="center" style={{ gap: "20px", marginTop: "10px" }}>
          {menuItems.map((item) => (
            <Button
              key={item.id}
              className={styles.menuBtn}
              variant="outline"
              onClick={() => {
                if (onSelect) onSelect(item.id); // ✅ gọi callback báo cho cha
              }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </div>

      <div className={styles.footer}>
        <Group gap="xs">
          <Button
            onClick={() => setActive((prev) => !prev)}
            variant="filled"
            style={{
              width: 30,
              height: 30,
              borderRadius: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: active
                ? "linear-gradient(to top, #FFE09A, #FFF1D2)"
                : "#FFFAEE",
              color: "#752E0B",
              border: "1.5px solid #752E0B",
            }}
          >
            <IconArrowLeft size={18} color="#752E0B" />
          </Button>
        </Group>
      </div>
    </div>
  );
}

