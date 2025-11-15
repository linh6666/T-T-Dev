"use client";
import { Button, Group } from "@mantine/core";
import { IconMoonStars, IconSunHigh, IconSunset2 } from "@tabler/icons-react";
import React, { useState } from "react";
import { createON } from "../../../../api/apiON";
import { createOFF } from "../../../../api/apiOFF";
import { createNodeAttribute } from "../../../../api/apiLighting";

interface SunProps {
  project_id: string | null;
}

export default function Sun({ project_id }: SunProps) {
  const [active, setActive] = useState<string | null>(null);

  // ✅ Xử lý nút Sáng
  const handleClickMorning = async () => {
    if (active === "morning") {
      setActive(null); // chỉ reset, không gọi API
    } else {
      setActive("morning");
      if (project_id) {
        try {
          await createON({ project_id });
          console.log("🌞 ON called");
        } catch (err) {
          console.error("❌ Lỗi khi gọi ON:", err);
        }
      }
    }
  };

  // ✅ Xử lý nút Chiều
  const handleClickAfternoon = async () => {
    if (active === "afternoon") {
      setActive(null); // chỉ reset, không gọi API
    } else {
      setActive("afternoon");
      if (!project_id) {
        console.warn("⚠️ Không có project_id để gọi API.");
        return;
      }

      try {
        const body = { project_id };
        const response = await createNodeAttribute(body, {
          type_control: "eff",
          value: 1,
          rs: 0,
          id: 6,
        });

        console.log("✅ Đã gửi hiệu ứng Chiều (ID: 6)", response);
      } catch (error) {
        console.error("❌ Lỗi khi gọi hiệu ứng Chiều:", error);
      }
    }
  };

  // ✅ Xử lý nút Tối
  const handleClickNight = async () => {
    if (active === "night") {
      setActive(null); // chỉ reset, không gọi API
    } else {
      setActive("night");
      if (project_id) {
        try {
          await createOFF({ project_id });
          console.log("🌙 OFF called");
        } catch (err) {
          console.error("❌ Lỗi khi gọi OFF:", err);
        }
      }
    }
  };

  return (
    <>
      {/* Nút Sáng */}
      <Button
      onClick={handleClickNight}
        // onClick={handleClickMorning}
        variant="filled"
        style={{
          width: active === "night" ? 65 : 30,
          height: 30,
          padding: 0,
          borderRadius: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: active === "night" ? "space-around" : "center",
          overflow: "hidden",
          transition: "width 0.3s, background-color 0.3s",
          background:
            active === "night"
              ? "linear-gradient(to top, #FFE09A, #FFF1D2)"
              : "#FFFAEE",
          border: "1.5px solid #752E0B",
        }}
      >
        <Group gap={active === "night" ? 4 : 0} align="center">
          <IconSunHigh size={18} color="#752E0B" />
          {active === "night" && <span style={{ color: "#752E0B" }}>Sáng</span>}
        </Group>
      </Button>

      {/* Nút Chiều */}
      <Button
        onClick={handleClickAfternoon}
        variant="filled"
        style={{
          width: active === "afternoon" ? 65 : 30,
          height: 30,
          padding: 0,
          borderRadius: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: active === "afternoon" ? "space-around" : "center",
          overflow: "hidden",
          transition: "width 0.3s, background-color 0.3s",
          background:
            active === "afternoon"
              ? "linear-gradient(to top, #FFE09A, #FFF1D2)"
              : "#FFFAEE",
          border: "1.5px solid #752E0B",
        }}
      >
        <Group gap={active === "afternoon" ? 4 : 0} align="center">
          <IconSunset2 size={18} color="#752E0B" />
          {active === "afternoon" && <span style={{ color: "#752E0B" }}>Chiều</span>}
        </Group>
      </Button>

      {/* Nút Tối */}
      <Button
        // onClick={handleClickNight}
        onClick={handleClickMorning}
        variant="filled"
        style={{
          width: active === "morning" ? 60 : 30,
          height: 30,
          padding: 0,
          borderRadius: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: active === "morning" ? "space-around" : "center",
          overflow: "hidden",
          transition: "width 0.3s, background-color 0.3s",
          background:
            active === "morning"
              ? "linear-gradient(to top, #FFE09A, #FFF1D2)"
              : "#FFFAEE",
          border: "1.5px solid #752E0B",
        }}
      >
        <Group gap={active === "morning" ? 4 : 0} align="center">
          <IconMoonStars size={18} color="#752E0B" />
          {active === "morning" && <span style={{ color: "#752E0B" }}>Tối</span>}
        </Group>
      </Button>
    </>
  );
}


