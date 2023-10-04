import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { MouseEvent } from "react";
import Link from "next/link";
interface CardWithLinkProps {
  text: string;
  title: string;
  onClick?: (event: MouseEvent) => void;
  svg: React.ReactNode;
  footerSvg?: React.ReactNode;
}
 
const CardWithLink: React.FC<CardWithLinkProps> = ({ text, title, onClick, svg, footerSvg }) => {
  const handleClick = (event: MouseEvent) => {
    if (onClick) {
      onClick(event);
    }
  };
  return (
    <Card className="mt-6 w-96 bg-grey p-4 mr-4 rounded-lg">
      <CardBody>
        <div className="justify-center mb-4">
          {svg}
        </div>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography>
          {text}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex justify-end items-end">
        <a className="inline-block">
          <Button size="sm" variant="text" className="flex items-center gap-2" onClick={handleClick}>
            {footerSvg}
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}

export default CardWithLink