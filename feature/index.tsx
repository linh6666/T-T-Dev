"use client";

export default function DemoPage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh", // full màn hình
        margin: 0,
        padding: 0,
        overflow: "hidden", // không cho cuộn
      }}
    >
      <iframe
        src="https://www.mohinhviet.com/" // 👉 thay bằng trang bạn muốn hiển thị
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        allowFullScreen
      />
    </div>
  );
}
