import { useEffect, useRef, useState } from "react";

// Styles
import "./QrStyles.css";

// Qr Scanner
import QrScanner from "qr-scanner";
import QrFrame from "./qr-frame.svg";
import { Toaster, toast } from "sonner";

interface RequestData {
  couponCode?: String;
  date: String;
  meal: String;
}

const QrReader = () => {
  // QR States
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);
  const [msg, setMsg] = useState<String>("");

  // Result
  const [scannedResult, setScannedResult] = useState<string | undefined>("");

  // Success
  const onScanSuccess = (result: QrScanner.ScanResult) => {
    // 🖨 Print the "result" to browser console.
    console.log(result);
    // ✅ Handle success.
    // 😎 You can do whatever you want with the scanned result.
    setScannedResult(result?.data);
  };

  // Fail
  const onScanFail = (err: string | Error) => {
    // 🖨 Print the "err" to browser console.
    console.log(err);
  };

  const sendData = () => {
    const reqData: RequestData = {
      couponCode: scannedResult,
      date: "2024-04-24",
      meal: "Breakfast",
    };
    fetch("http://localhost:8080/mess/coupon/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    })
      .then((res) => {
        if (res.status == 201) {
          setMsg("Coupon is valid");
          toast.success("Coupon is valid", {
            action: {
              label: "Close",
              onClick: () => console.log("Done"),
            },
          });
        } else if (res.status == 301) {
          setMsg("Ticket is used");
          toast.warning("Used Ticket Error", {
            description: "Ticket used already",
            action: {
              label: "Close",
              onClick: () => console.log("Retry"),
            },
          });
        } else if (res.status == 401) {
          setMsg("Coupon not found");
          toast.warning("Coupon not found Error", {
            description: "Try rescanning the code",
            action: {
              label: "Close",
              onClick: () => console.log("Retry"),
            },
          });
        } else if (res.status == 501) {
          setMsg("Failed to check coupon");
          toast.warning("Server Error", {
            description: "Please try again later",
            action: {
              label: "Close",
              onClick: () => console.log("Retry"),
            },
          });
        }
      })
      .then((data) => {
        console.log("Success:", data);
      });
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
        preferredCamera: "environment",
        // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
        highlightScanRegion: true,
        // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
        // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
        overlay: qrBoxEl?.current || undefined,
      });

      // 🚀 Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // 🧹 Clean up on unmount.
    // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  // ❌ If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  useEffect(() => {
    if (scannedResult) {
      sendData();
    }
  }, [scannedResult]);

  return (
    <div className="qr-reader">
      {/* QR */}
      <video ref={videoEl}></video>
      <div ref={qrBoxEl} className="qr-box">
        <img
          src={QrFrame}
          alt="Qr Frame"
          width={256}
          height={256}
          className="qr-frame"
        />
      </div>

      {/* Show Data Result if scan is success */}
      {scannedResult && (
        <p
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 99999,
            color: "white",
          }}
        >
          Scanned Result: {scannedResult}
        </p>
      )}
      <h1>{msg}</h1>
      <Toaster position="top-left"/>
    </div>
  );
};

export default QrReader;
