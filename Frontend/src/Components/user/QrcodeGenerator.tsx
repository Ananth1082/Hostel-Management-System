import QRCode from "react-qr-code";

export default function QrcodeGenerator({ qrData }: { qrData: string }) {
  return (
    <div className="grid place-content-center mt-[2rem]">
      <div className="border-2 border-black p-2">
        <div
          style={{
            height: "auto",
            margin: "0 auto",
            maxWidth: "18rem",
            width: "100%",
          }}
        >
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={qrData}
            viewBox={`0 0 256 256`}
          />
        </div>
      </div>
    </div>
  );
}
