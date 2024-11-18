import React from "react";

type Props = {
  roomPrice: number;
  totalNights: number;
  additionalService: string;
  originalAmount: number;
  totalAmount: number;
  bookingType: string;
};

const PriceSummary: React.FC<Props> = ({
  roomPrice,
  totalNights,
  additionalService,
  originalAmount,
  totalAmount,
  bookingType,
}) => {
  return (
    <div className="flex flex-col mt-2">
      <div className="flex justify-between text-sm border-b py-1">
        <span className="font-semibold">Room Price :</span>
        <span className="font-light">{roomPrice}</span>
      </div>

      <div className="flex justify-between text-sm border-b py-1">
        <span className="font-semibold">Total of Nights :</span>
        <span className="font-light">{totalNights}</span>
      </div>

      {additionalService === "Breakfast" && (
        <div className="flex justify-between text-sm border-b py-1">
          <span className="font-semibold">Services fee :</span>
          <span className="font-light">500</span>
        </div>
      )}

      {bookingType === "Online" && (
        <div className="flex justify-between text-sm border-b py-1">
          <span className="font-semibold">Total Amount :</span>
          <span className="font-bold">
            {additionalService ? originalAmount + 500 : originalAmount}
          </span>
        </div>
      )}

      {bookingType === "Online" && (
        <div className="flex justify-between text-sm border-b py-1">
          <span className="font-semibold">Online Book Discount :</span>
          <span className="text-red-500">-5%</span>
        </div>
      )}

      <div className="flex justify-between text-sm border-b py-1">
        <span className="font-semibold">
          {bookingType === "Online"
            ? "Discounted Total Amount To Pay :"
            : "Total Amount To Pay :"}
        </span>
        <span className="font-bold">{totalAmount}</span>
      </div>
    </div>
  );
};

export default PriceSummary;
