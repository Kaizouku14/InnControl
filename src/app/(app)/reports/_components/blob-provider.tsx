"use client";

import React from "react";
import { BlobProvider } from "@react-pdf/renderer";
import TransactionReport from "./reports-pdf";
import { TransactionReportProps } from "@/interface/reports";

const BlobProviderComponent = ({ transactions }: TransactionReportProps) => (
  <BlobProvider document={<TransactionReport transactions={transactions} />}>
    {({ url, loading }) =>
      loading ? (
        <p>Generating PDF...</p>
      ) : (
        <a
          href={url!}
          download="reports.pdf"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Download PDF
        </a>
      )
    }
  </BlobProvider>
);

export default BlobProviderComponent;
