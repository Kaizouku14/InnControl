"use client";

import React from "react";
import { BlobProvider } from "@react-pdf/renderer";
import TransactionReport from "./reports-pdf";
import { TransactionReportProps } from "@/interface/reports";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface BlobProviderComponentProps extends TransactionReportProps {
  disabled: boolean;
}

const BlobProviderComponent = ({ transactions , disabled }: BlobProviderComponentProps) => (
  <BlobProvider document={<TransactionReport transactions={transactions} />}>
    {({ url, loading }) =>
      loading ? (
        <p>Generating PDF...</p>
      ) : (
        <Button className="flex items-center gap-1" disabled={disabled}>
          <FileText />
          <a href={url!} download="reports.pdf">
            Download PDF
          </a>
        </Button>
      )
    }
  </BlobProvider>
);

export default BlobProviderComponent;
