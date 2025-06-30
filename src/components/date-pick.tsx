"use client";

import { format } from "date-fns";
import { LucideCalendar } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  id: string;
  name: string;
  defaultValue?: string | undefined;
};

function DatePicker({ id, name, defaultValue }: Props) {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date()
  );

  const formattedStringDate = date ? format(date, "yyyy-MM-dd") : "";

  return (
    <Popover>
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
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };
