'use client'
import { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
 
export default function MultiLevelSidebar() {
  const [open, setOpen] = useState(0);
 
  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between relative">
      <Card className="h-screen w-64 max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5" style={{ backgroundColor: "#12111F", color: "white" }}>
      <div className="mb-2 p-4 flex items-center justify-between relative">
        <a href="/"><Image src={"/Logo1.png"} width={600} height={600} alt="Picture of the author"/></a>
      </div>
      <List className="flex-1 m-[-14px]">
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`ml-2 h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
          
        >
          <ListItem className="p-0 hover:bg-gray-700" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3 flex items-center">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Pedidos
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem className="hover:bg-gray-700">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link href='/pedidos/reclamina'>Ductos Rectangular en Lámina</Link>
              </ListItem>
              <ListItem className="hover:bg-gray-700">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link href='/pedidos/reclamina'>Ductos Circular en Lámina</Link>
              </ListItem>
              <ListItem className="hover:bg-gray-700">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link href='/pedidos/reclamina'>Ductos Lamina con Soldadura</Link>
              </ListItem>
              <ListItem className="hover:bg-gray-700">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link href='/pedidos/reclamina'>Ductos Fibra de Vidrio</Link>
              </ListItem>
              <ListItem className="hover:bg-gray-700">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link href='/pedidos/reclamina'>Ductos Polisocianorato</Link>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem className="hover:bg-gray-700">
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Insumos
        </ListItem>
        <ListItem className="hover:bg-gray-700">
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link href='/obras'>Obras</Link>
        </ListItem>
        {/* <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem> */}
        <div className="mt-auto p-4">
        <ListItem className="p-0 hover:bg-gray-700">
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
        </div>
      </List>
    </Card>
      </div>
    </div>
  );
}