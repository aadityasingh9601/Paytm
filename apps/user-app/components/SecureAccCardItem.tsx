import { useState } from "react";
import { Button } from "@repo/ui/Button";

export default function SecureAccCardItem({
  field,
  value,
}: {
  field: string;
  value?: string | number | null;
}) {
  const [showTpin, setshowTpin] = useState(false);
  return (
    <div className="flex gap-40 p-4">
      <div className="text-sm text-gray-500">{field}</div>
      <div className="flex gap-3 ">
        <div className="text-base font-medium ">
          {showTpin ? (value ? value : "--") : "XXXXXX"}
        </div>
        <div>
          <Button
            type="button"
            size="sm"
            onClick={() => {
              setshowTpin(!showTpin);
            }}
          >
            {showTpin ? "Hide" : "Show"} Tpin
          </Button>
        </div>
      </div>
    </div>
  );
}
