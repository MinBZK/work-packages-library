import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import * as api from '../api';
import { QRCode } from 'react-qrcode-logo';
import { jsPDF } from 'jspdf';

import logo from '../assets/img/logo.png'
import { Card } from "react-bootstrap";

export default function NewQr() {
  const [loading, setLoading] = useState<boolean>(false);
  const [qrDetail, setQrDetail] = useState<string>("");
  const { currentUser } = useAuth();
  const orgId = currentUser.detail.orgId;
  const qrImg = useRef(null);

  const createQr = async () => {
    setLoading(true);

    try {
      const qrCreated = await api.createQrReq(orgId);

      if (qrCreated) {
        setQrDetail(JSON.stringify(qrCreated));
      }
    } catch (e) {
      alert(e.toString());
    }

    setLoading(false);
  };

  const download = () => {
    const orgName = JSON.parse(qrDetail).orgName;
    const dateString = (new Date()).toLocaleString('nl-NL');
    const canvas = qrImg.current.canvas.current;
    const data = (canvas as HTMLCanvasElement).toDataURL();

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight =
      (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.text(`QR code voor ${orgName}, ${dateString}`, 10, 10);
    pdf.addImage(data, 'PNG', pdfWidth / 4, pdfHeight / 4, pdfWidth / 2, pdfHeight / 2);
    pdf.save(`QR ${orgName}.pdf`);
  }

  return (
    <>
      <header className="logo-header">
        <img src={logo} alt="" width='300' />
      </header>
      <Link className="toplink" to="/">Home</Link>
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary" onClick={createQr} disabled={loading}>{loading ? "Genereren..." : "Genereer nieuwe"}</button>
            {qrImg.current && <button className="btn btn-secondary ml-1" onClick={download} disabled={loading}>Download als pdf</button>}
          </div>
          {qrDetail && <div className="qrparent d-flex justify-content-center">
            <QRCode value={qrDetail} size={220} ref={qrImg} />
          </div>}
        </Card.Body>
      </Card>
    </>
  );
}
