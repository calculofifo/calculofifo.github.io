"use client";

import { useState } from "react";
import { InputWithUnit } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Money } from "@/components/ui/num";
import { Slider } from "@/components/ui/slider";

export function SliderDemo() {
  const [allowance, setAllowance] = useState(40);
  const [price, setPrice] = useState("89,99");
  const parsedPrice = Number.parseFloat(price.replace(/\./g, "").replace(",", "."));
  const weeks =
    Number.isFinite(parsedPrice) && allowance > 0 ? parsedPrice / (allowance / 4.33) : 0;

  return (
    <div className="grid max-w-2xl gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <Label id="allowance-label">Paga mensual</Label>
          <Money value={allowance} decimals={false} className="text-sm" />
        </div>
        <Slider
          aria-labelledby="allowance-label"
          aria-label="Paga mensual"
          min={0}
          max={200}
          step={5}
          value={[allowance]}
          onValueChange={([v]) => setAllowance(v ?? 0)}
        />
        <Label htmlFor="price">Precio de unas zapatillas</Label>
        <InputWithUnit
          id="price"
          unit="€"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="flex flex-col justify-center gap-1 rounded-md bg-surface-muted p-5">
        <p className="text-sm text-fg-muted">Te cuestan</p>
        <p className="font-mono tabular text-4xl font-medium tracking-tight">
          {weeks.toLocaleString("es-ES", { maximumFractionDigits: 1 })}
        </p>
        <p className="text-sm text-fg-muted">semanas de paga</p>
      </div>
    </div>
  );
}
