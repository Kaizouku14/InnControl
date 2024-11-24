"use client";

import React from "react";
import { BlobProvider } from "@react-pdf/renderer";
import Invoice from "./reports-pdf";

const BlobProviderComponent = ({ invoice }) => (
  <BlobProvider document={<Invoice invoice={invoice} />}>
    {({ url, loading }) =>
      loading ? (
        <p>Generating PDF...</p>
      ) : (
        <a
          href={url!}
          download="invoice.pdf"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Download PDF
        </a>
      )
    }
  </BlobProvider>
);

export default BlobProviderComponent;
