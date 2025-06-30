"use client";

import { format } from "date-fns";
import { LucideCalendar } from "lucide-react";
import React, { SetStateAction, useImperativeHandle, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type imperativeHandleFromDatePicker = {
  reset: () => void;
};

type Props = {
  id: string;
  name: string;
  imperativeHandleRef?: React.RefObject<imperativeHandleFromDatePicker | null>;
  defaultValue?: string | undefined;
};

function DatePicker({ id, name, defaultValue, imperativeHandleRef }: Props) {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date()
  );

  const [open, setOpen] = useState(false);

  const formattedStringDate = date ? format(date, "yyyy-MM-dd") : "";

  useImperativeHandle(imperativeHandleRef, () => ({
    reset: () => {
      setDate(new Date());
    },
  }));

  const handleSelect = (date: SetStateAction<Date | undefined>) => {
    setDate(date);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full" id={id} asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="justify-start text-left font-normal"
        >
          <LucideCalendar />
          {formattedStringDate}
          <input name={name} type="hidden" value={formattedStringDate} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };
