import React, { useState } from "react";
import { fetchApi } from "../../service/fetchApi";
import { QrResponse } from "../../type";

const QrCodeGenerator: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [qrCode, setQrCode] = useState<string>("");

  const generateQRCode = async () => {
    if (!text.trim()) {
      alert("Please enter text for QR Code");
      return;
    }

    try {
      const response = await fetchApi<QrResponse>(
        `https://node-server-d14o.onrender.com/qr/generate?text=${encodeURIComponent(
          text
        )}`
      );

        setQrCode(response.qrCode); // ✅ No more TypeScript error
        console.log(response.qrCode);
    } catch (error) {
      console.error("Error generating QR Code:", error);
      alert("Failed to generate QR Code");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>QR Code Generator</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
        style={{ padding: "8px", width: "250px", marginRight: "10px" }}
      />
      <button
        onClick={generateQRCode}
        style={{ padding: "8px 15px", cursor: "pointer" }}
      >
        Generate
      </button>
      <br />
      {qrCode && (
        <img
          src={qrCode}
          alt="QR Code"
          style={{ marginTop: "20px", width: "200px" }}
        />
      )}
    </div>
  );
};

export default QrCodeGenerator;
