import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

const ImageDialog = ({ item_image }: { item_image: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-sm">
          View Image
        </Button>   
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center justify-center ">
        <DialogHeader>
          <DialogTitle>Lost item</DialogTitle>
        </DialogHeader>
        <Image src={item_image} alt="Item Image" width={500} height={300}  />
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
