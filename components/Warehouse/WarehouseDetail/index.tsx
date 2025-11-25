interface WarehouseDetailProps {
  unit_code: string;
  zone?: string;
  building_type?: string;
  bedroom?: number;
  bathroom?: number;
  direction?: string;
  price?: number;
  onBack: () => void;
}

export default function WarehouseDetail({
  unit_code,
  zone,
  building_type,
  bedroom,
  bathroom,
  direction,
  price,
  onBack
}: WarehouseDetailProps) {
  return (
    <div style={{ padding: "20px" }}>
      <button onClick={onBack} style={{ marginBottom: "20px" }}>⏎ Quay lại</button>
      <h2>Chi tiết kho {unit_code}</h2>
      {zone && <p>Phân khu: {zone}</p>}
      {building_type && <p>Loại công trình: {building_type}</p>}
      {bedroom !== undefined && <p>Phòng ngủ: {bedroom}</p>}
      {bathroom !== undefined && <p>Phòng tắm: {bathroom}</p>}
      {direction && <p>Hướng: {direction}</p>}
      {price !== undefined && <p>Giá: {price}</p>}
    </div>
  );
}